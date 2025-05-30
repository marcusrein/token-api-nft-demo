import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Text,
  Link,
  Input,
  Box,
  Select,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useState } from "react";

// =============================================
// Input Interface
// =============================================
/**
 * @typedef {Object} NFTTopHoldersInput
 * @property {string} contract - The contract address of the NFT collection
 * // networkId is now managed internally via state
 * @property {function} [onAddressClick] - Optional callback when an address is clicked
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

function useTopHolders(contract, networkId) {
  return useQuery(
    ["topHolders", contract, networkId],
    async () => {
      const json = await tokenFetch(
        `/nft/holders/evm/${contract}`,
        { limit: 10, network_id: networkId },
      );
      return json.data;
    },
    { enabled: !!contract },
  );
}

export default function NFTTopHolders() {
  const [input, setInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");
  const [networkId, setNetworkId] = useState("mainnet");
  const { data, isLoading, error } = useTopHolders(submittedInput, networkId);

  return (
    <Box>
      <Text fontSize="sm" color="gray.600">
        Top NFT holders for this contract.
      </Text>
      <Text fontSize="xs" color="gray.500" mb={2}>
        Uses: /nft/holders
      </Text>
      <Box mb={2} display="flex" gap={2}>
        <Input
          placeholder="Enter contract address"
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
          <option value="goerli">Goerli</option>
        </Select>
        <Button size="sm" onClick={() => setSubmittedInput(input.trim())}>
          Fetch
        </Button>
      </Box>
      {isLoading && <Spinner />}
      {error && <Text color="red.500">Error: {error.message}</Text>}
      {!isLoading && !error && submittedInput && (!data || data.length === 0) && (
        <Text>No holders found.</Text>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <TableContainer maxH="300px" overflowY="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Address</Th>
                <Th isNumeric>Qty</Th>
                <Th isNumeric>%</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((h) => (
                <Tr key={h.address}>
                  <Td>
                    <Text fontSize="xs" isTruncated>
                      {h.address}
                    </Text>
                  </Td>
                  <Td isNumeric>{h.unique_tokens}</Td>
                  <Td isNumeric>{(h.percentage * 100).toFixed(2)}%</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
