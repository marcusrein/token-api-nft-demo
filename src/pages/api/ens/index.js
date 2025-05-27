import axios from "axios";

export default async function handler(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_THE_GRAPH_NETWORK_API_KEY;
  const headers = {
    "Content-Type": "application/json",
  };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  try {
    const graphRes = await axios.post(
      "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
      req.body,
      { headers },
    );
    res.status(200).json(graphRes.data);
  } catch (e) {
    res
      .status(e.response?.status || 500)
      .json({ error: e.message, data: e.response?.data ?? null });
  }
}
