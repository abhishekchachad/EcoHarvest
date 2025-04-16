// api/cart.js
import { setCorsHeaders } from '../config/setCorsHeaders';

export default async function handler(req, res) {
  
  setCorsHeaders (res); // Set CORS headers
    if (req.method === 'GET') {
      // Logic for adding items to the cart
      res.status(200).json({ message: 'Product added to cart' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  