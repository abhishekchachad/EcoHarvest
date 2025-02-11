const { sql, poolPromise } = require('../config/dbConfig');

// Get All Users
const getUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM dbo.Users');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add New User
const addUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query('INSERT INTO dbo.Users (username, email, password) VALUES (@username, @email, @password)');

        res.json({ message: '✅ User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getUsers, addUser };
