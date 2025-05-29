export default async function tokenFetch(path, params = {}, options = {}) {
  // Build full URL (handles both server & browser)
  const base = typeof window === "undefined"
    ? "https://token-api.service.stage.pinax.network"
    : "/api/token";

  const url = new URL(path, base);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });

  const headers = { Accept: "application/json" };
  const jwt = process.env.NEXT_PUBLIC_TOKEN_API_JWT_KEY;
  if (jwt) headers.Authorization = `Bearer ${jwt}`;

  const res = await fetch(url.toString(), {
    method: "GET",
    headers,
    ...options,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Token API ${res.status}: ${txt}`);
  }
  return res.json();
} 