// api/messages.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Logic for handling messages
      res.status(200).json({ message: 'Message sent' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  