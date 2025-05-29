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

async function fetchCollection(contract, networkId) {
  const json = await tokenFetch(
    `/nft/collections/evm/${contract}`,
    { network_id: networkId },
  );
  return json.data?.[0];
}

export default function CollectionStatsBadge({
  contract,
  networkId = "mainnet",
}) {
  const { data, isLoading, error } = useQuery(
    ["collection", contract, networkId],
    () => fetchCollection(contract, networkId),
    {
      enabled: !!contract,
    },
  );

  if (!contract) return <Text>Enter contract address</Text>;
  if (isLoading) return <Spinner />;
  if (error || !data)
    return <Text color="red.500">Error loading collection</Text>;

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} w="full">
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold" fontSize="lg">
          {data.name} ({data.symbol})
        </Text>
        <HStack spacing={6} w="full">
          <Stat>
            <StatLabel>Total Supply</StatLabel>
            <StatNumber>{data.total_supply?.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Owners</StatLabel>
            <StatNumber>{data.owners?.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total Transfers</StatLabel>
            <StatNumber>{data.total_transfers?.toLocaleString()}</StatNumber>
          </Stat>
        </HStack>
      </VStack>
    </Box>
  );
}
