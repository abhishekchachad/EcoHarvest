const { sql, poolPromise } = require("../config/dbConfig");

// Add or update cart
exports.addToCart = async (req, res) => {

  const origin = req.headers.origin || "*";

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  
 // Handle preflight
 if (req.method === "OPTIONS") {
  return res.status(200).end();
}



  const { userId, product_id, quantity } = req.body;

  try {
    const pool = await poolPromise;

    const check = await pool.request()
      .input("user_id", sql.Int, userId)
      .input("product_id", sql.Int, product_id)
      .query("SELECT * FROM Cart WHERE user_id = @user_id AND product_id = @product_id");

    if (check.recordset.length > 0) {
      await pool.request()
        .input("user_id", sql.Int, userId)
        .input("product_id", sql.Int, product_id)
        .input("quantity", sql.Int, quantity)
        .query("UPDATE Cart SET quantity = quantity + @quantity WHERE user_id = @user_id AND product_id = @product_id");
    } else {
      await pool.request()
        .input("user_id", sql.Int, userId)
        .input("product_id", sql.Int, product_id)
        .input("quantity", sql.Int, quantity || 1)
        .input("added_at", sql.DateTime, new Date())
        .query("INSERT INTO Cart (user_id, product_id, quantity, added_at) VALUES (@user_id, @product_id, @quantity, @added_at)");
    }

    res.json({ message: "🛒 Product added or updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get cart
exports.getCartItems = async (req, res) => {
  const { userId } = req.query;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("user_id", sql.Int, userId)
      .query(`
        SELECT c.cart_id, c.quantity, p.product_id, p.name, p.price, p.image_url
        FROM Cart c
        JOIN Products p ON c.product_id = p.product_id
        WHERE c.user_id = @user_id
      `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update cart quantity
exports.updateCartQuantity = async (req, res) => {
  const productId = parseInt(req.params.productId);
  const { userId, quantity } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("user_id", sql.Int, userId)
      .input("product_id", sql.Int, productId)
      .input("quantity", sql.Int, quantity)
      .query("UPDATE Cart SET quantity = @quantity WHERE user_id = @user_id AND product_id = @product_id");

    res.json({ message: "✅ Quantity updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete cart item
exports.removeCartItem = async (req, res) => {
  const productId = parseInt(req.params.productId);
  const { userId } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("user_id", sql.Int, userId)
      .input("product_id", sql.Int, productId)
      .query("DELETE FROM Cart WHERE user_id = @user_id AND product_id = @product_id");

    res.json({ message: "🗑️ Item removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
