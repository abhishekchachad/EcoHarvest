const { sql, poolPromise } = require('../config/dbConfig');

// ✅ Get All Products
const getProducts = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM dbo.Products');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Add New Product
const addProduct = async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('price', sql.Decimal, price)
            .input('description', sql.NVarChar, description)
            .query('INSERT INTO dbo.Products (name, price, description) VALUES (@name, @price, @description)');

        res.json({ message: '✅ Product added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getProducts, addProduct }; // ✅ Ensure both functions are exported
