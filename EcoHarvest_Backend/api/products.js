
import { poolPromise } from '../config/dbConfig';
import { setCorsHeaders } from '../config/setCorsHeaders';

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .query(`SELECT * FROM dbo.Products WHERE DeleteFlag = 'N'`);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error on executing the query: ', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
