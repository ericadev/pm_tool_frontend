export async function handler(event) {
  try {
    // Target your Railway backend
    const targetUrl = "https://pmtoolfastapi-production.up.railway.app" + event.path;

    // Forward the request directly, preserving method & body
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body,
    });

    const data = await response.text(); // or response.json() if JSON

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
