
import { poolPromise } from '../config/dbConfig';
//import { setCorsHeaders } from '../config/setCorsHeaders';

export default async function handler(req, res) {

  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Allow-Origin", origin || "*");
  // res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  // res.setHeader("Access-Control-Allow-Headers", req.headers["access-control-request-headers"] || "*");

  //setCorsHeaders (res); // Set CORS headers
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
    .query(`SELECT * FROM dbo.Products WHERE DeleteFlag = 'N'`);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error on executing the query: ', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
