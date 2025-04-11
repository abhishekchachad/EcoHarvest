// api/messages.js
//import { setCorsHeaders } from '../config/setCorsHeaders';

export default async function handler(req, res) {
  
    //setCorsHeaders (res); // Set CORS headers
    if (req.method === 'POST') {
      // Logic for handling messages
      res.status(200).json({ message: 'Message sent' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  