// api/products.js
import { poolPromise } from '../config/dbConfig';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .query('SELECT * FROM dbo.Products WHERE DeleteFlag = "N"');
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
