// EcoHarvest_Backend/controllers/cartController.js

const { sql, poolPromise } = require("../config/dbConfig");

// Get all cart items
exports.getCartItems = async (req, res) => {
  const { email } = req.query; // ✅ Get user email from frontend

  try {
    const pool = await poolPromise;

    // ✅ Get User ID from Email
    const userResult = await pool.request()
      .input("email", sql.NVarChar, email)
      .query("SELECT user_id FROM dbo.Users WHERE email = @email");

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user_id = userResult.recordset[0].user_id;

    // ✅ Fetch Cart Items for this User
    const result = await pool.request()
      .input("user_id", sql.Int, user_id)
      .query("SELECT * FROM dbo.Cart WHERE user_id = @user_id");

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Add an item to the cart
exports.addToCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;  // ✅ Remove name and price
    try {
      console.log("Received request:", req.body); // ✅ Debugging log
  
      const pool = await poolPromise;
      await pool.request()
        .input("user_id", sql.Int, user_id)
        .input("product_id", sql.Int, product_id)
        .input("quantity", sql.Int, quantity)
        .input("added_at", sql.DateTime, new Date())  // ✅ Set current timestamp
        .query("INSERT INTO dbo.Cart (user_id, product_id, quantity, added_at) VALUES (@user_id, @product_id, @quantity, @added_at)");
  
      res.json({ message: "Item added to cart" });
    } catch (error) {
      console.error("Database error:", error); // ✅ Log errors for debugging
      res.status(500).json({ error: error.message });
    }
  };
  

// Update cart item quantity
exports.updateCartQuantity = async (req, res) => {
  const { quantity } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("id", sql.Int, req.params.id)
      .input("quantity", sql.Int, quantity)
      .query("UPDATE dbo.Cart SET quantity = @quantity WHERE product_id = @id");
    res.json({ message: "Cart updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove an item from the cart
exports.removeCartItem = async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM dbo.Cart WHERE product_id = @id");
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
