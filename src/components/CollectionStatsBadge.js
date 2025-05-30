import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
  Text,
  HStack,
  VStack,
  Input,
  Select,
  Button,
  Link,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useState } from "react";

// =============================================
// Input Interface
// =============================================
/**
 * @typedef {Object} CollectionStatsBadgeInput
 * @property {string} [contract] - The contract address of the NFT collection
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

async function fetchCollection(contract, networkId) {
  const json = await tokenFetch(
    `/nft/collections/evm/${contract}`,
    { network_id: networkId },
  );
  return json.data?.[0];
}

export default function CollectionStatsBadge() {
  const [input, setInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");
  const [networkId, setNetworkId] = useState("mainnet");
  const { data, isLoading, error } = useQuery(
    ["collection", submittedInput, networkId],
    () => fetchCollection(submittedInput, networkId),
    { enabled: !!submittedInput }
  );

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} w="full">
      <Text fontSize="sm" color="gray.600">
        Enter an NFT contract address to view its metadata.
      </Text>
      <Text fontSize="xs" color="gray.500" mb={2}>
        Uses: <Link href="https://token-api.service.stage.pinax.network/#tag/evm/GET/nft/collections/evm/%7Bcontract%7D" isExternal color="blue.500">/nft/collections</Link>
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
          <option value="goerli">Goerli</option>
        </Select>
        <Button size="sm" onClick={() => setSubmittedInput(input.trim())}>
          Fetch
        </Button>
      </HStack>
      {isLoading && <Spinner />}
      {error && <Text color="red.500">Error loading collection</Text>}
      {!isLoading && !error && submittedInput && !data && (
        <Text>No collection found.</Text>
      )}
      {data && (
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold" fontSize="lg">
            {data.name} ({data.symbol})
          </Text>
          <HStack spacing={6} w="full">
            <Box>
              <Text fontSize="xs" color="gray.500">Total Supply</Text>
              <Text fontSize="lg">{data.total_supply?.toLocaleString()}</Text>
            </Box>
            <Box>
              <Text fontSize="xs" color="gray.500">Owners</Text>
              <Text fontSize="lg">{data.owners?.toLocaleString()}</Text>
            </Box>
            <Box>
              <Text fontSize="xs" color="gray.500">Total Transfers</Text>
              <Text fontSize="lg">{data.total_transfers?.toLocaleString()}</Text>
            </Box>
          </HStack>
        </VStack>
      )}
    </Box>
  );
}
