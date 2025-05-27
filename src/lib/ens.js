import axios from "axios";

const ENS_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/ensdomains/ens";

export async function resolveEns(name) {
  const query = `{
    domains(where: {name: "${name.toLowerCase()}"}) {
      resolvedAddress {
        id
      }
    }
  }`;

  const isBrowser = typeof window !== "undefined";

  const apiKey = process.env.NEXT_PUBLIC_THE_GRAPH_NETWORK_API_KEY;
  const headers = { "Content-Type": "application/json" };
  // When on server, include API key to The Graph; in browser we hit our own proxy which already adds key
  if (!isBrowser && apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const url = isBrowser ? "/api/ens" : ENS_SUBGRAPH;

  const { data } = await axios.post(url, { query }, { headers });
  const address = data?.data?.domains?.[0]?.resolvedAddress?.id;
  return address ?? null;
}
