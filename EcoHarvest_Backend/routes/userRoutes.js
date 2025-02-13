const express = require('express');
const bcrypt = require('bcrypt'); // Ensure bcrypt is imported
const { sql, poolPromise } = require('../config/dbConfig');

const router = express.Router();

// ✅ User Signup Route (Hashes Password Before Storing)
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const pool = await poolPromise;

        // ✅ Check if the user already exists
        const existingUser = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM dbo.Users WHERE email = @email');

        if (existingUser.recordset.length > 0) {
            return res.status(400).json({ error: "❌ User already exists with this email!" });
        }

        // ✅ Hash Password Before Storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Insert New User Into Database
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, hashedPassword)
            .query('INSERT INTO dbo.Users (username, email, password) VALUES (@username, @email, @password)');

        res.json({ message: "✅ Signup successful! Please log in." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ User Login Route (Compares Hashed Password)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM dbo.Users WHERE email = @email');

        if (result.recordset.length === 0) {
            return res.status(401).json({ error: "❌ User not found" });
        }

        const user = result.recordset[0];

        // ✅ Compare Hashed Password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "❌ Invalid password" });
        }

        res.json({ message: "✅ Login successful", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
//Hello