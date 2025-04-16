export default async function handler(req, res) {
  const origin = req.headers.origin || "*";

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Handle GET or POST
  if (req.method === "GET") {
    const { userId } = req.query;

    // Replace this with your actual DB logic
    res.status(200).json({
      message: `Fetched cart for user ${userId}`,
      data: [] // e.g., cart items here
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
