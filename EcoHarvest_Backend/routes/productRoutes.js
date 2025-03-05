const express = require('express');
const { poolPromise, sql } = require('../config/dbConfig');

const router = express.Router();

// ✅ Fetch All Products
router.get('/products', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM dbo.Products');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Add Product
router.post('/', async (req, res) => {
    const { name, price, description, stock_quantity } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('price', sql.Decimal, price)
            .input('description', sql.NVarChar, description)
            .input('stock_quantity', sql.Int, stock_quantity)
            .query('INSERT INTO dbo.Products (name, price, description, stock_quantity) VALUES (@name, @price, @description, @stock_quantity)');
        res.json({ message: "✅ Product added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Update Product
router.put('/:id', async (req, res) => {
    const { name, price, description, stock_quantity } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('price', sql.Decimal, price)
            .input('description', sql.NVarChar, description)
            .input('stock_quantity', sql.Int, stock_quantity)
            .input('id', sql.Int, req.params.id)
            .query('UPDATE dbo.Products SET name = @name, price = @price, description = @description, stock_quantity = @stock_quantity WHERE product_id = @id');
        res.json({ message: "✅ Product updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Delete Product
router.delete('/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM dbo.Products WHERE product_id = @id');
        res.json({ message: "✅ Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
