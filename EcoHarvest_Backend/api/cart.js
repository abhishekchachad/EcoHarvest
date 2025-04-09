// api/cart.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Logic for adding items to the cart
      res.status(200).json({ message: 'Product added to cart' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  