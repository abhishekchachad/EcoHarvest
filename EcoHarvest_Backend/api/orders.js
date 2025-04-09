// api/orders.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Logic for creating an order
      res.status(200).json({ message: 'Order placed successfully' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  