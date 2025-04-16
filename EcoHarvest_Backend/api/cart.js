// api/cart.js
// import { setCorsHeaders } from '../config/setCorsHeaders';

export default async function handler(req, res) {

  const origin = req.headers.get("origin") || "*";
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", req.headers["access-control-request-headers"] || "*");

  //setCorsHeaders (res); // Set CORS headers
  if (req.method === "OPTIONS") {
    res.status(200).end(); // Stop preflight here
    return;
  }

  // setCorsHeaders (res); // Set CORS headers
    if (req.method === 'GET') {
      // Logic for adding items to the cart
      res.status(200).json({ message: 'Product added to cart' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  