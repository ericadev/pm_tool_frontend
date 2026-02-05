export async function handler(event) {
  // ✅ Handle CORS preflight HERE
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
      body: "",
    };
  }

  const BACKEND_BASE_URL =
  "https://pmtoolfastapi-production.up.railway.app";

  const path = event.path.replace(
      "/.netlify/functions/proxy",
      ""
    );

  const targetUrl = `${BACKEND_BASE_URL}${path}`;

  try {
    const fetchOptions = {
      method: event.httpMethod,
      headers: {
        ...event.headers,
        host: undefined,
      },
    };

    // Only include body for requests that can have one
    if (event.httpMethod !== "GET" && event.httpMethod !== "HEAD") {
      fetchOptions.body = event.body;
    }

    const response = await fetch(targetUrl, fetchOptions);

    const text = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      body: text,
    };
  } catch (err) {
    console.error("Proxy error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Proxy failed",
        message: err.message,
      }),
    };
  }
}
