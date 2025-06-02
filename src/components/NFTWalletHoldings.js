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
  Input,
  Box,
  Select,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// =============================================
// Input Interface
// =============================================
/**
 * @typedef {Object} NFTWalletHoldingsInput
 * @property {string} address - The wallet address to view NFT holdings for
 * @property {string} [networkId=mainnet] - Network ID to query (default: mainnet)
 */

// =============================================
// Component Logic
// =============================================

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

export default function NFTWalletHoldings() {
  const [input, setInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");
  const [networkId, setNetworkId] = useState("mainnet");
  const { data, isLoading, error } = useNFTOwnerships(submittedInput, networkId);

  return (
    <Box>
      <Text fontSize="sm" color="gray.600">
        Enter a wallet address below to see their NFTs.
      </Text>
      <Text fontSize="xs" color="gray.500" mb={2}>
        Uses: <Link href="https://token-api.service.stage.pinax.network/#tag/evm/GET/nft/ownerships/evm/%7Baddress%7D" isExternal color="blue.500">/nft/ownerships</Link> and <Link href="https://token-api.service.stage.pinax.network/#tag/evm/GET/nft/items/evm/contract/%7Bcontract%7D/token_id/%7Btoken_id%7D" isExternal color="blue.500">/nft/items</Link>
      </Text>
      <Box mb={2} display="flex" gap={2}>
        <Input
          placeholder="Wallet address or ENS"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="sm"
        />
        <Select
          value={networkId}
          onChange={(e) => setNetworkId(e.target.value)}
          size="sm"
          w="fit-content"
        >
          <option value="mainnet">Ethereum Mainnet</option>
          <option value="arbitrum-one" disabled>Arbitrum One (Coming Soon)</option>
          <option value="base" disabled>Base (Coming Soon)</option>
          <option value="bsc" disabled>BSC (Coming Soon)</option>
          <option value="matic" disabled>Polygon (Coming Soon)</option>
          <option value="optimism" disabled>Optimism (Coming Soon)</option>
          <option value="unichain" disabled>UniChain (Coming Soon)</option>
        </Select>
        <Button size="sm" onClick={() => setSubmittedInput(input.trim())}>
          Fetch
        </Button>
      </Box>
      {isLoading && <Spinner size="sm" />}
      {error && <Text color="red.500">Error: {error.message}</Text>}
      {!isLoading && !error && submittedInput && (!data || data.length === 0) && (
        <Text>No NFTs found.</Text>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <TableContainer maxH="300px" overflowY="auto">
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
                  (nft.uri && nft.uri.startsWith("ipfs://")
                    ? nft.uri.replace("ipfs://", "https://ipfs.io/ipfs/")
                    : nft.image) ||
                  `/api/token/nft/items/evm/contract/${nft.contract}/token_id/${encodeURIComponent(
                    String(nft.token_id)
                  )}`;
                return (
                  <Tr key={`${nft.contract}-${nft.token_id}-${index}`}>
                    <Td>
                      <Text fontSize="xs" fontWeight="bold" isTruncated>
                        {nft.name || nft.symbol}
                      </Text>
                      <Text fontSize="xs" color="gray.500" isTruncated>
                        {nft.contract}
                      </Text>
                    </Td>
                    <Td isNumeric>
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
      )}
    </Box>
  );
}
