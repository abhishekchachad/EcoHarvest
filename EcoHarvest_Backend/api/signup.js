// api/signup.js
import { poolPromise } from '../config/dbConfig';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

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
