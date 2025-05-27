import axios from "axios";

export default async function handler(req, res) {
  const { path = [] } = req.query;
  const targetPath = path.join("/");

  // Preserve query string
  const query = req.url.includes("?")
    ? req.url.split("?").slice(1).join("?")
    : "";
  const url = `https://token-api.service.stage.pinax.network/${targetPath}${query ? `?${query}` : ""}`;

  try {
    const response = await axios({
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
        Authorization:
          req.headers.authorization ||
          `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API_JWT_KEY || process.env.NEXT_PUBLIC_TOKEN_API_KEY}`,
      },
    });

    res.status(response.status).json(response.data);
  } catch (e) {
    const status = e.response?.status || 500;
    res
      .status(status)
      .json({ error: e.message, data: e.response?.data ?? null });
  }
}
