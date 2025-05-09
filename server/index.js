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
    if (!reportId) return res.status(400).json({ error: "ReportID is required" });

    
    await dbPool.request().input("ReportID", sql.Int, reportId).execute("sp_ApproveClaim");

    res.json({ message: "Claim accepted, item status updated to FoundClaimed." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/claims/reject", async (req, res) => {
  try {
    const { reportId } = req.body;
    if (!reportId) return res.status(400).json({ error: "ReportID is required" });

    
    await dbPool.request().input("ReportID", sql.Int, reportId).execute("sp_DisapproveClaim");

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
