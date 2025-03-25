const { sql, poolPromise } = require("../config/dbConfig");
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

// User Registration
const { sql, poolPromise } = require("../config/dbConfig");
const bcrypt = require('bcrypt');

// Define allowed roles matching your constraint
const ALLOWED_ROLES = ['vendor', 'admin', 'customer'];

const signup = async (req, res) => {
    // Set default role to 'customer' and ensure lowercase
    const { username, email, password, role = 'customer' } = req.body;
    const normalizedRole = role.toLowerCase();
    const createdAt = new Date();

    // Validate role against constraint
    if (!ALLOWED_ROLES.includes(normalizedRole)) {
        return res.status(400).json({
            error: "Invalid role specified",
            message: `Role must be one of: ${ALLOWED_ROLES.join(', ')}`,
            receivedRole: role
        });
    }

    try {
        const pool = await poolPromise;

        // Check for existing user
        const userExists = await pool.request()
            .input('email', sql.NVarChar, email)
            .query("SELECT email FROM [EcoHarvest].[dbo].[Users] WHERE email = @email");

        if (userExists.recordset.length > 0) {
            return res.status(400).json({ 
                error: "User already exists with this email!",
                solution: "Please use a different email address"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert with explicit role validation
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, hashedPassword)
            .input('role', sql.NVarChar, normalizedRole) // Use validated role
            .input('created_at', sql.DateTime, createdAt)
            .query(`
                INSERT INTO [EcoHarvest].[dbo].[Users] 
                (username, email, password, role, created_at)
                OUTPUT INSERTED.user_id, INSERTED.username, INSERTED.email
                VALUES (@username, @email, @password, @role, @created_at)
            `);

        const newUser = result.recordset[0];
        
        return res.status(201).json({ 
            success: true,
            message: "User registered successfully!",
            user: {
                id: newUser.user_id,
                username: newUser.username,
                email: newUser.email,
                role: normalizedRole
            },
            nextSteps: "You can now login with your credentials"
        });

    } catch (err) {
        // Special handling for constraint violation
        if (err.number === 547 && err.message.includes('CHECK constraint')) {
            return res.status(400).json({
                error: "Database validation failed",
                message: "The provided data violates database constraints",
                details: {
                    constraint: "CK__Users__role__38996AB5",
                    allowedValues: ALLOWED_ROLES,
                    receivedValue: role
                }
            });
        }

        // General error handling
        return res.status(500).json({ 
            error: "Registration failed",
            details: err.message,
            technicalDetails: process.env.NODE_ENV === 'development' ? {
                code: err.code,
                number: err.number,
                state: err.state
            } : undefined
        });
    }
};
// User Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await poolPromise;

        // Find user (using same pattern as product queries)
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query("SELECT * FROM [EcoHarvest].[dbo].[Users] WHERE email = @email");

        if (result.recordset.length === 0) {
            return res.status(401).json({ error: "❌ Invalid email or password" });
        }

        const user = result.recordset[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "❌ Invalid email or password" });
        }

        // Return user data (without password)
        const userData = {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            role: user.role,
            created_at: user.created_at
        };

        res.json({ 
            message: "✅ Login successful!",
            user: userData
        });

    } catch (err) {
        console.error('❌ Login error:', err);
        res.status(500).json({ 
            error: "❌ Login failed",
            details: err.message 
        });
    }
};

module.exports = { signup, login };