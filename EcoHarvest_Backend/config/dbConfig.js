require('dotenv').config(); // at the top

const sql = require('mssql/msnodesqlv8');

const config = {
  server: process.env.DB_HOST, // Correct instance name
    database: process.env.DB_NAME,     // Your DB name (make sure it's created inside LocalDB)
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,       // Windows authentication
        trustServerCertificate: true   // Avoid cert issues for local
    }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ Connected to SQL Server");
    return pool;
  })
  .catch(err => console.log("❌ DB Connection Failed:", err));

module.exports = { sql, poolPromise };
