// api/signup.js
import { poolPromise } from '../config/dbConfig';
import bcrypt from 'bcryptjs';
//import { setCorsHeaders } from '../config/setCorsHeaders';

export default async function handler(req, res) {
  
  // const origin = req.headers.origin || "*";

  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Allow-Origin", origin);
  // res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  // // Handle preflight request
  // if (req.method === "OPTIONS") {
  //   return res.status(200).end();
  // }

  setCorsHeaders (res); // Set CORS headers

  if (req.method === 'POST') {
    const { email, password, username, role = 'customer' } = req.body;

    try {
      const pool = await poolPromise;

      // Check if email already exists
      const result = await pool.request()
        .input('email', email)
        .query('SELECT * FROM Users WHERE email = @email');
      
      if (result.recordset.length > 0) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      await pool.request()
        .input('email', email)
        .input('password', hashedPassword)
        .input('username', username)
        .input('role', role)
        .query('INSERT INTO Users (email, password, username, role) VALUES (@email, @password, @username, @role)');

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
