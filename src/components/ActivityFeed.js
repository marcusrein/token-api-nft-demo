import { VStack, HStack, Text, Spinner, Input, Box, Select, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Link } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// =============================================
// Input Interface
// =============================================
/**
 * @typedef {Object} ActivityFeedInput
 * @property {string} [wallet] - Wallet address to filter activities
 * @property {string} [contract] - Contract address to filter activities
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

function useActivities(params) {
  return useQuery(
    ["activities", params],
    async () => {
      const { wallet, contract, networkId } = params || {};
      const query = { limit: 10, orderDirection: "desc" };
      if (wallet) query.any = wallet;
      if (contract) query.contract = contract;
      if (networkId) query.network_id = networkId;
      const json = await tokenFetch(`/nft/activities/evm`, query);
      return json.data;
    },
    { enabled: !!(params.wallet || params.contract) },
  );
}

function formatAgo(date) {
  const diffMs = Date.now() - new Date(date).getTime();
  const minutes = Math.round(diffMs / 60000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (Math.abs(minutes) < 60) return rtf.format(-minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
  const days = Math.round(hours / 24);
  return rtf.format(-days, "day");
}

function badge(type) {
  switch (type) {
    case "mint":
      return "🌱";
    case "transfer":
      return "↔️";
    case "burn":
      return "🔥";
    default:
      return "❓";
  }
}

/**
 * Activity Feed Component
 * @param {ActivityFeedInput} props
 */
export default function ActivityFeed() {
  const [input, setInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");
  const [networkId, setNetworkId] = useState("mainnet");
  const { data, isLoading, error } = useActivities({
    contract: submittedInput,
    networkId,
  });

  // Always render input controls
  return (
    <Box maxW="100%">
      <Text fontSize="sm" color="gray.600">
        Recent NFT mints, transfers and burns for this contract.
      </Text>
      <Text fontSize="xs" color="gray.500" mb={2}>
        Uses: <Link href="https://token-api.service.stage.pinax.network/#tag/evm/GET/nft/activities/evm" isExternal color="blue.500">/nft/activities</Link>
      </Text>
      <HStack mb={2} spacing={2}>
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
      </HStack>
      {isLoading && <Spinner />}
      {error && <Text color="red.500">Error loading activity</Text>}
      {!isLoading && !error && submittedInput && (!data || data.length === 0) && (
        <Text>No recent activity.</Text>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <TableContainer maxH="300px" overflowY="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>Time</Th>
                <Th>Token ID</Th>
                <Th>From</Th>
                <Th>To</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((act, idx) => (
                <Tr key={`${act.tx_hash}-${idx}`}>  
                  <Td>{badge(act["@type"])}</Td>
                  <Td>{formatAgo(act.timestamp)}</Td>
                  <Td>#{act.token_id}</Td>
                  <Td>{act.from?.slice(0, 6)}…</Td>
                  <Td>{act.to?.slice(0, 6)}…</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
