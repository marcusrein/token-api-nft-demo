export default async function tokenFetch(path, params = {}, options = {}) {
  // Build full URL (handles both server & browser)
  const base = typeof window === "undefined"
    ? "https://token-api.service.stage.pinax.network/"
    : `${window.location.origin}/api/token/`;

  const cleanedPath = path.startsWith("/") ? path.slice(1) : path;
  const url = new URL(cleanedPath, base);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });

  const headers = { Accept: "application/json" };
  const jwt = process.env.NEXT_PUBLIC_TOKEN_API_JWT_KEY;
  if (jwt) headers.Authorization = `Bearer ${jwt}`;

  // simple console log (used by ApiLogDrawer)
  if (typeof window !== "undefined") {
    console.info(`[TokenAPI][REQUEST] GET ${url.pathname}`);
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers,
    ...options,
  });

  if (typeof window !== "undefined") {
    console.info(`[TokenAPI][RESPONSE] ${res.status} ${url.pathname}`);
  }
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Token API ${res.status}: ${txt}`);
  }
  return res.json();
} 