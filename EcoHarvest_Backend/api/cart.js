import { getCartItems, addToCart } from "../controllers/cartController";
import { setCorsHeaders } from '../config/setCorsHeaders';

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;
  
  console.log("Request method:", req.method); 
  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Handle GET or POST
  if (req.method === "POST") {
    return addToCart(req, res);
  }
  // Handle GET or POST
  if (req.method === "GET") {
    return getCartItems(req, res);
  }

   res.status(405).json({ message: "Method Not Allowed" });
   
}
