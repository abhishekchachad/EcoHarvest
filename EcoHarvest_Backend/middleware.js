// middleware.js

export function middleware(req) {
    const res = new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Or specify your frontend domain
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  
    // Handle preflight
    if (req.method === 'OPTIONS') {
      return res;
    }
  
    return NextResponse.next(); // Allow the request to proceed
  }
  