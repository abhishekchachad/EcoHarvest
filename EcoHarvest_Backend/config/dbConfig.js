require('dotenv').config();

const sql = require('mssql'); // Ensure you are using the right package for your environment

const config = {
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT), // Make sure port is correctly formatted as a number
  options: {
    encrypt: true,
    enableArithAbort: true,
    //trustServerCertificate: true // Only use in development environment
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Connected to SQL Server successfully!");
    return pool;
  })
  .catch(err => {
    console.error("Database connection failed: ", err);
    process.exit(1); // Optionally stop the process if unable to connect to DB
  });

module.exports = { sql, poolPromise };
