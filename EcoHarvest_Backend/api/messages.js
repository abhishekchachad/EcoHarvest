// api/messages.js
export default async function handler(req, res) {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

    if (req.method === 'POST') {
      // Logic for handling messages
      res.status(200).json({ message: 'Message sent' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  