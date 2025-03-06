const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes"); // Ensure correct path

const app = express();

app.use(express.json());
app.use(cors());

// Serve static images from the public folder
app.use("/uploads", express.static("public/uploads"));

// ✅ Make sure the API route is set up correctly
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
