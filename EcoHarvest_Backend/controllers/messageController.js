// EcoHarvest_Backend/controllers/messageController.js
const { sql, poolPromise } = require("../config/dbConfig");

exports.sendMessage = async (req, res) => {
  const { email, message } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("email", sql.NVarChar, email)
      .input("message", sql.NVarChar, message)
      .query("INSERT INTO dbo.Messages (email, message) VALUES (@email, @message)");

    res.json({ message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
