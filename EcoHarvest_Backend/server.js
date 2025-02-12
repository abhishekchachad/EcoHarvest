const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes'); // ✅ Ensure this is imported

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Ensure the /api/users route is available
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
