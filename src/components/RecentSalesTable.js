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
  Link as ChakraLink,
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
 * @typedef {Object} RecentSalesTableInput
 * @property {string} contract - The contract address of the NFT collection
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

function minutesAgo(date) {
  const diffMs = Date.now() - new Date(date).getTime();
  return Math.round(diffMs / 60000);
}

function formatAgo(date) {
  const minutes = minutesAgo(date);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (Math.abs(minutes) < 60) return rtf.format(-minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
  const days = Math.round(hours / 24);
  return rtf.format(-days, "day");
}

function useRecentSales(contract, networkId) {
  return useQuery(
    ["sales", contract, networkId],
    async () => {
      const json = await tokenFetch(
        `/nft/sales/evm`,
        { contract, limit: 10, network_id: networkId },
      );
      return json.data;
    },
    { enabled: !!contract },
  );
}

export default function RecentSalesTable() {
  const [input, setInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");
  const [networkId, setNetworkId] = useState("mainnet");
  const { data, isLoading, error } = useRecentSales(submittedInput, networkId);

  return (
    <Box>
      <Text fontSize="sm" color="gray.600">
        Latest sales for this contract.
      </Text>
      <Text fontSize="xs" color="gray.500" mb={2}>
        Uses: <ChakraLink href="https://token-api.service.stage.pinax.network/#tag/evm/GET/nft/sales/evm" isExternal color="blue.500">/nft/sales</ChakraLink>
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
      {error && <Text color="red.500">Error loading sales</Text>}
      {!isLoading && !error && submittedInput && (!data || data.length === 0) && (
        <Text>No recent sales.</Text>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <TableContainer maxH="300px" overflowY="auto">
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Time</Th>
                <Th>Buyer → Seller</Th>
                <Th>Token</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((sale, idx) => (
                <Tr key={`${sale.tx_hash}-${idx}`}>
                  <Td>{formatAgo(sale.timestamp)}</Td>
                  <Td fontSize="xs">
                    {sale.offerer?.slice(0, 6)}… → {sale.recipient?.slice(0, 6)}…
                  </Td>
                  <Td fontSize="xs">
                    <Text color="blue.500" isTruncated>
                      #{sale.token_id}
                    </Text>
                  </Td>
                  <Td isNumeric>
                    {sale.sale_amount} {sale.sale_currency}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
