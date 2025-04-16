export function setCorsHeaders(req, res) {

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", req.headers["access-control-request-headers"] || "*");
  
  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  }