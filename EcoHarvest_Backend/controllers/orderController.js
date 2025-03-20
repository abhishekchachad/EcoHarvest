// EcoHarvest_Backend/controllers/orderController.js

const { sql, poolPromise } = require("../config/dbConfig");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM dbo.Orders");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM dbo.Orders WHERE order_id = @id");
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Place an order
exports.placeOrder = async (req, res) => {
  const { user_id, name, address, payment_method } = req.body;
  try {
    const pool = await poolPromise;
    
    // Insert new order
    await pool.request()
      .input("user_id", sql.Int, user_id)
      .input("name", sql.NVarChar, name)
      .input("address", sql.NVarChar, address)
      .input("payment_method", sql.NVarChar, payment_method)
      .query("INSERT INTO dbo.Orders (user_id, name, address, payment_method) VALUES (@user_id, @name, @address, @payment_method)");

    res.json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
