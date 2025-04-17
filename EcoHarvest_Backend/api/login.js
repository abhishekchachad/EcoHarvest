// api/login.js
import { poolPromise } from '../config/dbConfig';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//import { setCorsHeaders } from '../config/setCorsHeaders';
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS with specific settings
app.use(cors({
  origin: 'https://ecoharvest-nine.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

export default async function handler(req, res) {
  
  res.setHeader('Access-Control-Allow-Origin', 'https://ecoharvest-nine.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const pool = await poolPromise;

      // Check if the user exists using email
      const result = await pool.request()
        .input('email', email)
        .query('SELECT * FROM Users WHERE email = @email');
      
      if (result.recordset.length === 0) {
        return res.status(400).json({ message: 'User not found' });
      }

      const user = result.recordset[0];

      // Compare the entered password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.user_id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    console.error('Invalid request method:', req.method);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
