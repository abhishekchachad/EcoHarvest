require('dotenv').config(); // at the top

// Use this for LocalDB
// const sql = require('mssql/msnodesqlv8'); // Use this for LocalDB
// const config = {
//   server: process.env.DB_HOST, // Correct instance name
//     database: process.env.DB_NAME,     // Your DB name (make sure it's created inside LocalDB)
//     driver: 'msnodesqlv8',
//     options: {
//         trustedConnection: true,       // Windows authentication
//         trustServerCertificate: true   // Avoid cert issues for local
//     }
// };



const sql = require('mssql'); // Use this for Azure SQL Database
const config = {
  server: process.env.DB_HOST,        // Azure SQL Database server URL (without "http://")
  database: process.env.DB_NAME,      // Your database name
  user: process.env.DB_USER,          // Azure SQL username
  password: process.env.DB_PASSWORD,  // Azure SQL password
  port: 1433,                         // Default port for Azure SQL
  driver: 'mssql',                    // Use mssql driver for Azure SQL
  options: {
    encrypt: true,                     // Ensure encryption is enabled for Azure SQL
    trustServerCertificate: true       // Avoid certificate issues for local testing
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
