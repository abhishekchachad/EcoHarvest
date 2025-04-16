const { sql, poolPromise } = require("../config/dbConfig");

// Add or update cart
exports.addToCart = async (req, res) => {
  const { userId, product_id, quantity } = req.body;

  // Validate input
  if (!userId || !product_id) {
    return res.status(400).json({ error: "Missing userId or product_id" });
  }

  console.log("🛠️ addToCart called with:", { userId, product_id, quantity });

  try {
    const pool = await poolPromise;

    // Check if the product already exists in the cart
    const check = await pool.request()
      .input("user_id", sql.Int, userId)
      .input("product_id", sql.Int, product_id)
      .query("SELECT * FROM Cart WHERE user_id = @user_id AND product_id = @product_id");

    console.log("🔍 Cart check result:", check.recordset);

    if (check.recordset.length > 0) {
      // Update quantity
      await pool.request()
        .input("user_id", sql.Int, userId)
        .input("product_id", sql.Int, product_id)
        .input("quantity", sql.Int, quantity)
        .query("UPDATE Cart SET quantity = quantity + @quantity WHERE user_id = @user_id AND product_id = @product_id");
    } else {
      // Insert new item
      await pool.request()
        .input("user_id", sql.Int, userId)
        .input("product_id", sql.Int, product_id)
        .input("quantity", sql.Int, quantity || 1)
        .input("added_at", sql.DateTime, new Date())
        .query("INSERT INTO Cart (user_id, product_id, quantity, added_at) VALUES (@user_id, @product_id, @quantity, @added_at)");
    }

    res.status(200).json({ message: "🛒 Product added or updated in cart" });
  } catch (err) {
    console.error("❌ Error in addToCart:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get cart
exports.getCartItems = async (req, res) => {
  const { userId } = req.query;

  console.log("📦 getCartItems called with userId:", userId);

  if (!userId) {
    return res.status(400).json({ error: "Missing userId in query" });
  }

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
    console.error("❌ Error in getCartItems:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update cart quantity
exports.updateCartQuantity = async (req, res) => {
  const productId = parseInt(req.params.productId);
  const { userId, quantity } = req.body;

  console.log("🔁 updateCartQuantity:", { productId, userId, quantity });

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: "Missing userId, productId, or quantity" });
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("user_id", sql.Int, userId)
      .input("product_id", sql.Int, productId)
      .input("quantity", sql.Int, quantity)
      .query("UPDATE Cart SET quantity = @quantity WHERE user_id = @user_id AND product_id = @product_id");

    res.json({ message: "✅ Quantity updated" });
  } catch (err) {
    console.error("❌ Error in updateCartQuantity:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete cart item
exports.removeCartItem = async (req, res) => {
  const productId = parseInt(req.params.productId);
  const { userId } = req.body;

  console.log("🗑️ removeCartItem:", { productId, userId });

  if (!userId || !productId) {
    return res.status(400).json({ error: "Missing userId or productId" });
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("user_id", sql.Int, userId)
      .input("product_id", sql.Int, productId)
      .query("DELETE FROM Cart WHERE user_id = @user_id AND product_id = @product_id");

    res.json({ message: "🗑️ Item removed from cart" });
  } catch (err) {
    console.error("❌ Error in removeCartItem:", err);
    res.status(500).json({ error: err.message });
  }
};
