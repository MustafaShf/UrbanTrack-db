require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const app = express();
const port = process.env.PORT || 3000;

const dbConfig = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
let dbPool;

// Test connection on startup
async function connectToDatabase() {
  try {
    console.log(`Connecting to SQL Server: ${dbConfig.server}...`);
    dbPool = await sql.connect(dbConfig);

    // Verify connection
    const result = await dbPool
      .request()
      .query("SELECT DB_NAME() AS dbName, @@SERVERNAME AS serverName");
    console.log(`Connected successfully to:`, result.recordset[0]);

    return dbPool;
  } catch (err) {
    console.error("Database connection failed:", err.message);
    console.log("\nTROUBLESHOOTING:");
    console.log("1. Ensure SQL Server is running");
    console.log("2. Verify server name in .env matches SSMS");
    console.log("3. Run your Node app as administrator");
    console.log("4. Check SQL Server logs for login failures");
    process.exit(1);
  }
}

// API Endpoints
// For Found Unclaimed Items
app.get("/api/found-unclaimed-items", async (req, res) => {
  try {
    const result = await dbPool.request().query(`
      exec ViewAllFoundUnclaimed
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//for submitting claimant request
app.post("/api/submit-claim", async (req, res) => {
  try {
    const { reportID, reason } = req.body;

    // Validate reportID is a positive integer
    if (
      !reportID ||
      isNaN(reportID) ||
      !Number.isInteger(Number(reportID)) ||
      reportID <= 0
    ) {
      return res.status(400).json({
        error: "Invalid report ID",
        details: "Report ID must be a positive integer",
      });
    }

    if (!reason || typeof reason !== "string" || reason.trim().length === 0) {
      return res.status(400).json({
        error: "Invalid reason",
        details: "Reason must be a non-empty string",
      });
    }

    const result = await dbPool
      .request()
      .input("reportID", sql.Int, parseInt(reportID, 10)) // Ensure it's parsed as integer
      .input("reason", sql.NVarChar, reason.trim())
      .query("EXEC submitClaimRequest @reportID, @reason");

    res.json({
      success: true,
      message: "Claim submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting claim:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

//for remove lost
app.post("/api/remove-lost", async (req, res) => {
  try {
    const { reportID, reason } = req.body;

    // Validate reportID is a positive integer
    if (
      !reportID ||
      isNaN(reportID) ||
      !Number.isInteger(Number(reportID)) ||
      reportID <= 0
    ) {
      return res.status(400).json({
        error: "Invalid report ID",
        details: "Report ID must be a positive integer",
      });
    }

    const result = await dbPool
      .request()
      .input("reportID", sql.Int, parseInt(reportID, 10)) // Ensure it's parsed as integer
      .query("EXEC removeLost @reportID");

    res.json({ success: true });
  } catch (error) {
    console.error("Error removing lost:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

// For signup
app.post("/api/signup", async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password } = req.body;

    // Basic validation (removed username check)
    if (!fullName || !phoneNumber || !email || !password) {
      return res.status(400).json({
        error: "Missing required fields",
        details: "All fields are required",
      });
    }

    // Execute the stored procedure
    const request = dbPool.request();
    request.input("Name", sql.NVarChar, fullName);
    request.input("Email", sql.NVarChar, email);
    request.input("PhoneNum", sql.NVarChar, phoneNumber);
    request.input("Password", sql.NVarChar, password);

    // Since the procedure uses PRINT, we need to capture output
    let output = "";
    request.on("info", (message) => {
      output += message.message + "\n";
    });

    const result = await request.query(
      "EXEC UserSignUp @Name, @Email, @PhoneNum, @Password"
    );

    // Check the output messages
    if (output.includes("ERROR:")) {
      return res.status(400).json({
        error: "Signup rejected",
        details: output.trim(),
      });
    }

    res.json({
      success: true,
      message: output.trim() || "Account created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      error: "Signup failed",
      details: error.message,
    });
  }
});

//For Sign in
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Missing required fields",
        details: "Both email and password are required",
      });
    }

    const request = dbPool.request();
    request.input("Email", sql.VarChar(100), email);
    request.input("Password", sql.VarChar(100), password);
    request.output("UserID", sql.Int);

    // Capture PRINT messages
    let outputMessage = "";
    request.on("info", (info) => {
      outputMessage += info.message + "\n";
    });

    // Execute the stored procedure
    await request.execute("ActiveUserSignIn");

    const userId = request.parameters.UserID;

    if (!userId) {
      return res.status(403).json({
        error: "Login rejected",
        details: outputMessage.trim() || "Invalid credentials or user status",
      });
    }

    res.json({
      success: true,
      message: outputMessage.trim() || "Login successful",
      userId: userId,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Login failed",
      details: error.message,
    });
  }
});

//For admin Login
// Add this endpoint with your other API endpoints in index.js
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, adminkey } = req.body;

    // Basic validation
    if (!email || !adminkey) {
      return res.status(400).json({
        error: "Missing required fields",
        details: "Both email and admin key are required",
      });
    }

    // Validate adminkey is a number
    if (isNaN(adminkey)) {
      return res.status(400).json({
        error: "Invalid admin key",
        details: "Admin key must be a number",
      });
    }

    // Create request
    const request = dbPool.request();
    request.input("AdminEmail", sql.VarChar(100), email);
    request.input("AdminKey", sql.Int, parseInt(adminkey, 10));

    // Capture output messages
    let output = "";
    request.on("info", (message) => {
      output += message.message + "\n";
    });

    // Execute the stored procedure
    await request.query("EXEC AdminSignIn @AdminEmail, @AdminKey");

    // Check the output messages
    if (output.includes("ERROR!")) {
      return res.status(403).json({
        success: false,
        error: "Login rejected",
        details: output.trim(),
      });
    }

    // If we get here, login was successful
    res.json({
      success: true,
      message: output.trim() || "Admin login successful",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      error: "Admin login failed",
      details: error.message,
    });
  }
});

// For Found Claimed Items
app.get("/api/found-claimed-items", async (req, res) => {
  try {
    const result = await dbPool.request().query(`
      exec ViewAllFoundClaimed
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// For feedback
app.post("/api/submit-feedback", async (req, res) => {
  try {
    const { userId, email, name, category, rating, comments } = req.body;

    // Basic validation
    if (!rating || !comments) {
      return res.status(400).json({
        error: "Missing required fields",
        details: "Rating and comments are required",
      });
    }

    // Validate rating is between 1-5
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: "Invalid rating",
        details: "Rating must be between 1 and 5",
      });
    }

    let userToUse = userId;

    // If no userId provided but email is provided, try to find user
    if (!userId && email) {
      try {
        const userResult = await dbPool
          .request()
          .input("email", sql.VarChar(100), email)
          .query("SELECT UserID FROM users WHERE Email = @email");

        if (userResult.recordset.length > 0) {
          userToUse = userResult.recordset[0].UserID;
        }
      } catch (err) {
        console.error("Error looking up user:", err);
        // Continue with userToUse as null
      }
    }

    // Create request
    const request = dbPool.request();

    // Input parameters - userId can be null
    request.input("UserId", sql.Int, userToUse || null);
    request.input("Comments", sql.VarChar(500), comments);
    request.input("Rating", sql.Int, rating);

    // Capture output messages
    let output = "";
    request.on("info", (message) => {
      output += message.message + "\n";
    });

    // Execute the stored procedure
    await request.query("EXEC SubmitFeedback @UserId, @Comments, @Rating");

    // Check the output messages
    if (output.includes("ERROR!")) {
      return res.status(400).json({
        success: false,
        error: "Feedback submission rejected",
        details: output.trim(),
      });
    }

    // If we get here, submission was successful
    res.json({
      success: true,
      message: output.trim() || "Feedback submitted successfully",
    });
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({
      error: "Feedback submission failed",
      details: error.message,
    });
  }
});

// For Lost Items
app.get("/api/lost-items", async (req, res) => {
  try {
    const result = await dbPool.request().query(`
      exec ViewAllLost
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// For claiming items
app.post("/api/claim-item", express.json(), async (req, res) => {
  try {
    const { itemId, claimantInfo } = req.body;

    // Start transaction
    const transaction = new sql.Transaction(dbPool);
    await transaction.begin();

    try {
      // Mark item as claimed
      await transaction
        .request()
        .input("itemId", sql.Int, itemId)
        .query(
          "UPDATE found_items SET isClaimed = 1 WHERE founditemid = @itemId"
        );

      // Record claim
      await transaction
        .request()
        .input("itemId", sql.Int, itemId)
        .input("claimantInfo", sql.NVarChar, claimantInfo).query(`
          INSERT INTO found_reports (itemId, reporterInfo, reportDate, isClaim)
          VALUES (@itemId, @claimantInfo, GETDATE(), 1)
        `);

      await transaction.commit();
      res.json({ success: true });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  } catch (err) {
    console.error("Claim error:", err);
    res.status(500).json({ error: "Failed to process claim" });
  }
});

// Add these endpoints after your existing endpoints

// In your index.js file, update the categories endpoint:
app.get("/api/categories", async (req, res) => {
  try {
    const result = await dbPool.request().query("exec viewCategories");
    // Ensure consistent field names and numeric IDs
    const formattedCategories = result.recordset.map((cat) => ({
      id: Number(cat.categoryid || cat.id || cat.CategoryID),
      name: cat.categoryname || cat.name || cat.CategoryName,
    }));
    res.json(formattedCategories);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Report lost item
app.post("/api/report-lost-item", async (req, res) => {
  try {
    const { itemName, categoryId, description, imageUrl, location, dateLost } =
      req.body;
    console.log(itemName);

    if (!itemName || !categoryId || !description || !location || !dateLost) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await dbPool
      .request()
      .input("itemName", sql.NVarChar, itemName)
      .input("categoryId", sql.Int, categoryId)
      .input("description", sql.NVarChar, description)
      .input("imageUrl", sql.NVarChar, imageUrl || null)
      .input("location", sql.NVarChar, location)
      .input("dateLost", sql.Date, new Date(dateLost))
      .query(
        "EXEC submitLostReport @itemName, @categoryId, @description, @imageUrl, @location, @dateLost"
      );

    const reportId = result.recordset[0]?.ReportId || result.rowsAffected[0];

    res.json({
      success: true,
      reportId: reportId,
      message: "Item reported successfully",
    });
  } catch (err) {
    console.error("Report error:", err);
    res.status(500).json({
      error: "Failed to report item",
      details: err.message,
    });
  }
});

//feedback
app.get("/api/reviews/summary", async (req, res) => {
  try {
    const result = await dbPool.request().execute("sp_review_summary");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//users on admin
app.get("/api/users/summary", async (req, res) => {
  try {
    const result = await dbPool
      .request()
      .query("SELECT * FROM user_summary_view");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//lost items
//lost items
app.get("/api/lost-items", async (req, res) => {
  try {
    const result = await dbPool.request().execute("ViewAllLost");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//founditems list
app.get("/api/found-items", async (req, res) => {
  try {
    const result = await dbPool.request().execute("sp_view_all_found_item");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//claims list
app.get("/api/claims", async (req, res) => {
  try {
    const result = await dbPool.request().execute("sp_GetClaimDetail");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//accept and reject claims

app.post("/api/claims/accept", async (req, res) => {
  try {
    const { reportId } = req.body;
    if (!reportId)
      return res.status(400).json({ error: "ReportID is required" });

    await dbPool
      .request()
      .input("ReportID", sql.Int, reportId)
      .execute("sp_ApproveClaim");

    res.json({
      message: "Claim accepted, item status updated to FoundClaimed.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/claims/reject", async (req, res) => {
  try {
    const { reportId } = req.body;
    if (!reportId)
      return res.status(400).json({ error: "ReportID is required" });

    await dbPool
      .request()
      .input("ReportID", sql.Int, reportId)
      .execute("sp_DisapproveClaim");

    res.json({ message: "Claim rejected, status updated to disapproved." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Report Found Item
app.post("/api/report-found-item", async (req, res) => {
  try {
    const { itemName, categoryId, description, imageUrl, location, dateLost } =
      req.body;

    if (!itemName || !categoryId || !description || !location || !dateLost) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await dbPool
      .request()
      .input("itemName", sql.NVarChar, itemName)
      .input("categoryId", sql.Int, categoryId)
      .input("description", sql.NVarChar, description)
      .input("imageUrl", sql.NVarChar, imageUrl || null)
      .input("location", sql.NVarChar, location)
      .input("dateLost", sql.Date, new Date(dateLost))
      .query(
        "EXEC submitFoundReport @itemName, @categoryId, @description, @imageUrl, @location, @dateLost"
      );

    const reportId = result.recordset[0]?.ReportId || result.rowsAffected[0];

    res.json({
      success: true,
      reportId: reportId,
      message: "Item reported successfully",
    });
  } catch (err) {
    console.error("Report error:", err);
    res.status(500).json({
      error: "Failed to report item",
      details: err.message,
    });
  }
});

// Start server
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Available endpoints:`);
    console.log(`- GET /api/lost-items`);
    console.log(`- POST /api/found-report`);
  });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  if (dbPool) {
    await dbPool.close();
    console.log("Database connection closed");
  }
  process.exit(0);
});
