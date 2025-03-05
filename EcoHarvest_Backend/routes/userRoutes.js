const express = require('express');
const { sql, poolPromise } = require('../config/dbConfig');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        const pool = await poolPromise;

        // ✅ Check if the user already exists
        const existingUser = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM dbo.Users WHERE email = @email');

        if (existingUser.recordset.length > 0) {
            return res.status(200).json({ message: "User already exists in local DB" });
        }

        // ✅ Insert user into database
        await pool.request()
            .input('email', sql.NVarChar, email)
            .query('INSERT INTO dbo.Users (email) VALUES (@email)');

        res.json({ message: "✅ User stored successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
