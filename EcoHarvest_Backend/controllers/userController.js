const bcrypt = require('bcrypt'); // Ensure bcrypt is imported
const { sql, poolPromise } = require('../config/dbConfig');

// ✅ Fixed User Signup: Hash Password Before Storing
const addUser = async (req, res) => {
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

        // ✅ Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Store Hashed Password in Database
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, hashedPassword) // ✅ Save hashed password
            .query('INSERT INTO dbo.Users (username, email, password) VALUES (@username, @email, @password)');

        res.json({ message: "✅ Signup successful! Please log in." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addUser };
