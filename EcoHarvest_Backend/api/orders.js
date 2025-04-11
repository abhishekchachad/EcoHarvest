// api/orders.js
export default async function handler(req, res) {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

    if (req.method === 'POST') {
      // Logic for creating an order
      res.status(200).json({ message: 'Order placed successfully' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  