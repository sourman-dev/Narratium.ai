import type { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow proxy in development mode for security
  if (process.env.NODE_ENV !== "development") {
    res.status(403).json({ error: "Proxy is only available in development mode" });
    return;
  }

  // Handle CORS for the proxy itself
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Target-Url, x-target-url");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const targetBaseUrl = req.headers["x-target-url"] || req.headers["X-Target-Url"];

  if (!targetBaseUrl || typeof targetBaseUrl !== "string") {
    res.status(400).json({ error: "Missing X-Target-Url header" });
    return;
  }

  const { path } = req.query;
  // path is an array of path segments
  const pathStr = Array.isArray(path) ? path.join("/") : path || "";

  // Construct target URL
  // Ensure targetBaseUrl doesn't have trailing slash and pathStr doesn't have leading slash collision
  const cleanBaseUrl = targetBaseUrl.replace(/\/$/, "");
  const targetUrl = `${cleanBaseUrl}/${pathStr}`;

  console.log(`[Proxy] ${req.method} ${targetUrl}`);

  try {
    // Filter headers to forward
    const headers: Record<string, string> = {};
    Object.entries(req.headers).forEach(([key, value]) => {
      // Skip proxy-specific headers and problematic headers
      if (["host", "connection", "content-length", "x-target-url", "cookie"].includes(key.toLowerCase())) return;
      if (Array.isArray(value)) {
        headers[key] = value.join(", ");
      } else if (value) {
        headers[key] = value;
      }
    });

    const fetchOptions: any = {
      method: req.method,
      headers: headers,
    };

    // Only attach body if it's not a GET/HEAD request
    if (req.method !== "GET" && req.method !== "HEAD") {
      fetchOptions.body = req;
      fetchOptions.duplex = "half";
    }

    const response = await fetch(targetUrl, fetchOptions);

    // Forward response status
    res.status(response.status);

    // Forward response headers
    response.headers.forEach((value, key) => {
      // Skip problematic headers
      if (["content-encoding", "content-length"].includes(key.toLowerCase())) return;
      res.setHeader(key, value);
    });

    // Pipe response body
    if (response.body) {
      // @ts-ignore - Readable.fromWeb handles web streams in Node
      const reader = Readable.fromWeb(response.body);
      reader.pipe(res);
    } else {
      res.end();
    }

  } catch (error: any) {
    console.error("[Proxy] Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Proxy request failed", details: error.message });
    }
  }
}
