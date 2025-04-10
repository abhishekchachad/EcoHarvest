
import { poolPromise } from '../config/dbConfig';

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://ecoharvest-nine.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");


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
