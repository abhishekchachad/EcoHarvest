const express = require("express");
const { sql, poolPromise } = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res) => {
    const { username, email, password, role = "user" } = req.body;
    const createdAt = new Date();

    try {
        const pool = await poolPromise;

        // ✅ Check if the user already exists
        const existingUser = await pool.request()
            .input("email", sql.NVarChar, email)
            .query("SELECT * FROM dbo.Users WHERE email = @email");

        if (existingUser.recordset.length > 0) {
            console.log(`⚠️ User already exists: ${email}`);
            return res.status(400).json({ error: "User already exists in the database." });
        }

        // ✅ Hash Password (if provided)
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        // ✅ Insert user into database
        const insertUser = await pool.request()
            .input("username", sql.NVarChar, username)
            .input("email", sql.NVarChar, email)
            .input("password", sql.NVarChar, hashedPassword)
            .input("role", sql.NVarChar, role)
            .input("created_at", sql.DateTime, createdAt)
            .query(`
                INSERT INTO dbo.Users (username, email, password, role, created_at) 
                VALUES (@username, @email, @password, @role, @created_at)
            `);

        console.log(`✅ User stored successfully: ${username} (${email}) with role: ${role}`);
        res.status(201).json({ message: "User stored successfully", email, role });

    } catch (err) {
        console.error("❌ Error storing user:", err);
        res.status(500).json({ error: "Internal Server Error. Please try again." });
    }
});

module.exports = router;
