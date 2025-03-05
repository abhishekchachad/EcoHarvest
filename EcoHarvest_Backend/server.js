const express = require('express');
const cors = require('cors');
const { poolPromise } = require('./config/dbConfig');

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Import and use product routes
const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes); // ✅ Ensure /api prefix is used

// Simple test route
app.get('/', async (req, res) => {
    res.json({ message: "🚀 API is working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
