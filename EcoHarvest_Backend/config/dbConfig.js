require('dotenv').config(); // Ensure .env is loaded

const sql = require('mssql');

const config = {
    user: process.env.DB_USER,  
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: false, // Set to false for local servers
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('✅ Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('❌ Database Connection Failed:', err);
        process.exit(1);
    });

module.exports = { sql, poolPromise };
