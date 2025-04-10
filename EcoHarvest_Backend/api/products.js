
import { poolPromise } from '../config/dbConfig';

export default async function handler(req, res) {

  if (req.method === "OPTIONS") {
    res.status(200).end(); // Stop preflight here
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT * FROM dbo.Products WHERE DeleteFlag = "N"');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error on executing the query: ', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
