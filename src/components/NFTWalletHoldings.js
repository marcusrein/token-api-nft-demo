import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";

// Inline API helper
async function tokenFetch(path, params = {}) {
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

  const res = await fetch(url.toString(), { method: "GET", headers });
  if (!res.ok) {
    throw new Error(`Token API ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

// Inline URL conversion utility
function convertToHttpUrl(url) {
  if (!url) return null;
  if (url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
}

function useNFTOwnerships(address, networkId) {
  return useQuery(
    ["ownerships", address, networkId],
    async () => {
      const json = await tokenFetch(
        `/nft/ownerships/evm/${address}`,
        { limit: 20, network_id: networkId }
      );
      return json.data;
    },
    { enabled: !!address }
  );
}

export default function NFTWalletHoldings({ address, networkId = "mainnet" }) {
  const { data, isLoading, error } = useNFTOwnerships(address, networkId);

  if (!address) return <Text>Enter a wallet/ENS to view NFTs</Text>;
  if (isLoading) return <Spinner size="sm" />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;
  if (!data?.length) return <Text>No NFTs found.</Text>;

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Collection</Th>
            <Th>Token ID</Th>
            <Th>Metadata</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((nft, index) => {
            const meta =
              convertToHttpUrl(nft.uri) ||
              convertToHttpUrl(nft.image) ||
              `/api/token/nft/items/evm/contract/${nft.contract}/token_id/${encodeURIComponent(String(nft.token_id))}`;
            return (
              <Tr key={`${nft.contract}-${nft.token_id}-${index}`}>
                <Td>
                  <Text fontSize="xs" fontWeight="bold">
                    {nft.name || nft.symbol}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {nft.contract}
                  </Text>
                </Td>
                <Td>
                  <Text fontSize="xs">{nft.token_id}</Text>
                </Td>
                <Td>
                  <Link href={meta} isExternal fontSize="xs" color="blue.500">
                    view
                  </Link>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
