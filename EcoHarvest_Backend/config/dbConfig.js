require('dotenv').config();

const sql = require('mssql/msnodesqlv8');

// Database configuration for LocalDB
const config = {
    server: process.env.DB_HOST, // Correct instance name
    database: process.env.DB_NAME,     // Your DB name (make sure it's created inside LocalDB)
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,       // Windows authentication
        trustServerCertificate: true   // Avoid cert issues for local
    }
};

// Pool connection for reuse
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

module.exports = { sql, poolPromise };
