import { getCartItems, addToCart } from "../../../controllers/cartController";

export default async function handler(req, res) {
  const origin = req.headers.origin || "*";

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

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
