const { sql, poolPromise } = require("../config/dbConfig");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 📂 Configure Multer for Local Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

const testConnection = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT 1');
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

testConnection();


// ✅ Fetch All Products (Exclude Soft Deleted)
const getProducts = async (req, res) => {
  try {
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT * FROM dbo.Products WHERE DeleteFlag = 'N'`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Add Product
const addProduct = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

  const { name, price, description, stock_quantity, category } = req.body;
  const imageUrl = req.file ? `uploads/${req.file.filename}` : null;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("name", sql.NVarChar, name)
      .input("price", sql.Decimal(10, 2), price)
      .input("description", sql.NVarChar, description)
      .input("stock_quantity", sql.Int, stock_quantity)
      .input("category", sql.NVarChar, category)
      .input("image_url", sql.NVarChar, imageUrl)
      .input("DeleteFlag", sql.NVarChar, "N")
      .query(`
        INSERT INTO dbo.Products (name, price, description, stock_quantity, category, image_url, DeleteFlag)
        VALUES (@name, @price, @description, @stock_quantity, @category, @image_url, @DeleteFlag)
      `);

    res.json({ message: "✅ Product added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Product
const updateProduct = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

  const { name, price, description, stock_quantity, category } = req.body;
  const product_id = req.params.id;
  const newImageUrl = req.file ? `uploads/${req.file.filename}` : null;

  try {
    const pool = await poolPromise;

    const existingProduct = await pool.request()
      .input("id", sql.Int, product_id)
      .query("SELECT image_url FROM dbo.Products WHERE product_id = @id");

    let finalImageUrl = existingProduct.recordset[0]?.image_url;
    if (newImageUrl) finalImageUrl = newImageUrl;

    await pool.request()
      .input("name", sql.NVarChar, name)
      .input("price", sql.Decimal(10, 2), price)
      .input("description", sql.NVarChar, description)
      .input("stock_quantity", sql.Int, stock_quantity)
      .input("category", sql.NVarChar, category)
      .input("image_url", sql.NVarChar, finalImageUrl)
      .input("id", sql.Int, product_id)
      .query(`
        UPDATE dbo.Products
        SET name = @name, price = @price, description = @description,
            stock_quantity = @stock_quantity, category = @category, image_url = @image_url
        WHERE product_id = @id
      `);

    res.json({ message: "✅ Product updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Soft Delete
const softDeleteProduct = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("id", sql.Int, req.params.id)
      .query("UPDATE dbo.Products SET DeleteFlag = 'Y' WHERE product_id = @id");

    res.json({ message: "✅ Product marked as deleted (soft delete)" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get product by ID
const getProductById = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

  const { product_id } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("product_id", product_id)
      .query("SELECT * FROM Products WHERE product_id = @product_id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  softDeleteProduct,
  upload,
  getProductById 
};
