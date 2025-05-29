export default async function handler(req, res) {
  const { path = [] } = req.query;
  const targetPath = path.join("/");

  // Preserve query string
  const query = req.url.includes("?")
    ? req.url.split("?").slice(1).join("?")
    : "";
  const url = `https://token-api.service.stage.pinax.network/${targetPath}${query ? `?${query}` : ""}`;

  try {
    const headers = {
      Accept: "application/json",
      Authorization:
        req.headers.authorization ||
        `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API_JWT_KEY || process.env.NEXT_PUBLIC_TOKEN_API_KEY}`,
    };
    const resp = await fetch(url, { headers });
    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
