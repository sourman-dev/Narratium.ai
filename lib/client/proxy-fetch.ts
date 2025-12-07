
/**
 * A wrapper around fetch that automatically uses the local proxy in development environment
 * to avoid CORS issues when calling external APIs.
 */
export async function proxyFetch(url: string, options: RequestInit = {}): Promise<Response> {
  let finalUrl = url;
  const finalOptions = { ...options };
  const headers = new Headers(finalOptions.headers || {});

  // Only apply proxy in development environment on the client side
  // and for non-local URLs (http/https not localhost)
  if (
    process.env.NODE_ENV === "development" &&
    typeof window !== "undefined" &&
    (url.startsWith("http://") || url.startsWith("https://")) &&
    !url.includes("localhost") &&
    !url.includes("127.0.0.1")
  ) {
    try {
      const urlObj = new URL(url);
      // We use the origin as the target base URL (e.g., https://api.github.com)
      const targetBaseUrl = urlObj.origin;
      // The path (e.g., /repos/Narratium/...)
      const path = urlObj.pathname + urlObj.search;

      headers.set("X-Target-Url", targetBaseUrl);

      // Remove leading slash from path if present to avoid double slashes validation issues if any
      // But Next.js [...path] captures the segments.
      // If we call /api/proxy/foo/bar, path is ['foo', 'bar'].
      // So we should construct /api/proxy/ + params.

      // Remove leading slash from path
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;

      finalUrl = `/api/proxy/${cleanPath}`;

      console.log(`[ProxyFetch] Proxying ${url} -> ${finalUrl} (Target: ${targetBaseUrl})`);
    } catch (e) {
      console.warn("[ProxyFetch] Failed to parse URL, falling back to direct fetch", e);
    }
  }

  finalOptions.headers = headers;
  return fetch(finalUrl, finalOptions);
}
