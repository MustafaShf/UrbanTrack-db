require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();
const port = process.env.PORT || 3000;

const dbConfig = require('./db')

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
    const result = await dbPool.request().query('SELECT DB_NAME() AS dbName, @@SERVERNAME AS serverName');
    console.log(`Connected successfully to:`, result.recordset[0]);
    
    return dbPool;
  } catch (err) {
    console.error('Database connection failed:', err.message);
    console.log('\nTROUBLESHOOTING:');
    console.log('1. Ensure SQL Server is running');
    console.log('2. Verify server name in .env matches SSMS');
    console.log('3. Run your Node app as administrator');
    console.log('4. Check SQL Server logs for login failures');
    process.exit(1);
  }
}

// API Endpoints
app.get('/api/lost-items', async (req, res) => {
  try {
    const result = await dbPool.request().query(`
      SELECT 
        li.lostitemid,
        li.itemname,
        c.categoryname AS category,
        li.description,
        i.imageurl,
        FORMAT(li.dateLost, 'yyyy-MM-dd') AS dateLost,
        l.AreaName
      FROM lost_item_req li
      LEFT JOIN Categories c ON li.categoryid = c.categoryid
	  Left join locations l ON li.locationid = l.LocationId
	  Left join images i ON li.imageid = i.imageid
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('SQL error:', err);
    res.status(500).json({ 
      error: 'Database error',
      details: err.message  // Include error details for debugging
    });
  }
});

// Add these endpoints after your existing /api/lost-items endpoint

// For Found Unclaimed Items
app.get('/api/found-unclaimed-items', async (req, res) => {
  try {
    const result = await dbPool.request().query(`
      SELECT 
        fi.founditemid,
        fi.itemname,
        c.categoryname AS category,
        fi.description,
        i.imageurl,
        FORMAT(fi.dateFound, 'yyyy-MM-dd') AS dateFound,
        l.AreaName AS locationFound
      FROM found_items fi
      LEFT JOIN Categories c ON fi.categoryid = c.categoryid
      LEFT JOIN locations l ON fi.locationid = l.LocationId
      LEFT JOIN images i ON fi.imageid = i.imageid
      WHERE fi.ClaimedStatus = 0
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('SQL error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// For Found Claimed Items
app.get('/api/found-claimed-items', async (req, res) => {
  try {
    const result = await dbPool.request().query(`
	        SELECT 
        fi.founditemid,
        fi.itemname,
        c.categoryname AS category,
        fi.description,
        i.imageurl,
        FORMAT(fi.dateFound, 'yyyy-MM-dd') AS dateFound,
        l.AreaName AS locationFound
      FROM found_items fi
      LEFT JOIN Categories c ON fi.categoryid = c.categoryid
      LEFT JOIN locations l ON fi.locationid = l.LocationId
      LEFT JOIN images i ON fi.imageid = i.imageid
      WHERE fi.ClaimedStatus = 1
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('SQL error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// For claiming items
app.post('/api/claim-item', express.json(), async (req, res) => {
  try {
    const { itemId, claimantInfo } = req.body;
    
    // Start transaction
    const transaction = new sql.Transaction(dbPool);
    await transaction.begin();
    
    try {
      // Mark item as claimed
      await transaction.request()
        .input('itemId', sql.Int, itemId)
        .query('UPDATE found_items SET isClaimed = 1 WHERE founditemid = @itemId');
      
      // Record claim
      await transaction.request()
        .input('itemId', sql.Int, itemId)
        .input('claimantInfo', sql.NVarChar, claimantInfo)
        .query(`
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
    console.error('Claim error:', err);
    res.status(500).json({ error: 'Failed to process claim' });
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
process.on('SIGINT', async () => {
  if (dbPool) {
    await dbPool.close();
    console.log('Database connection closed');
  }
  process.exit(0);
});