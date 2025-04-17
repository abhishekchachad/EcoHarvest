const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { poolPromise } = require("./config/dbConfig"); // Import the poolPromise from your dbconfig
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const path = require("path"); 
const productRoutes = require("./routes/productRoutes"); // Ensure correct path
const messageRoutes = require("./routes/messageRoutes");
const loginapi = require("./api/login"); // Ensure correct path
const signupapi = require("./api/signup"); // Ensure correct path

const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));


// app.use(cors({
//   origin: 'https://ecoharvest-nine.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// Handle OPTIONS requests (preflight) explicitly
// app.options('*', cors());

// Your routes...
app.get('/api/data', (req, res) => {
  res.json({ message: "CORS is open to the world! 🌍" });
});

// ✅ Set up the API route for products, cart, and orders
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// // Enable CORS with specific settings
// app.use(cors({
//   origin: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// // Explicitly handle OPTIONS requests
// app.options('*', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', true);
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.status(200).send();
// });

// app.use((req, res, next) => {
//   console.log(`Incoming ${req.method} request to ${req.path}`);
//   console.log('Headers:', req.headers);
//   next();
// });

// Signup Route
app.post("/api/signup", async (req, res) => {
  const { email, password, username, role = 'customer' } = req.body; // Default role is 'customer'

  try {
    const pool = await poolPromise;

    // Check if email already exists
    const result = await pool.request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE email = @email');
    
    if (result.recordset.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
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

    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await poolPromise;

    // Check if the user exists using email (which is unique)
    const result = await pool.request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE email = @email');
    
    if (result.recordset.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.recordset[0];

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token containing user_id and role
    const token = jwt.sign(
      {
        userId: user.user_id,
        username: user.username,  // Include username in the token payload
        role: user.role,
      },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.use("/api/messages", messageRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

