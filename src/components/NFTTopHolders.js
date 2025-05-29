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

export default function NFTTopHolders({
  contract,
  networkId = "mainnet",
  onAddressClick,
}) {
  const { data, isLoading, error } = useTopHolders(contract, networkId);

  if (!contract) return null;
  if (isLoading) return <Spinner size="sm" />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <TableContainer>
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
            <Tr
              key={h.address}
              _hover={{
                bg: "gray.50",
                cursor: onAddressClick ? "pointer" : "default",
              }}
              onClick={() => onAddressClick?.(h.address)}
            >
              <Td>
                <Link
                  isExternal
                  href={`https://etherscan.io/address/${h.address}`}
                >
                  {h.address.slice(0, 6)}…{h.address.slice(-4)}
                </Link>
              </Td>
              <Td isNumeric>{h.unique_tokens}</Td>
              <Td isNumeric>{(h.percentage * 100).toFixed(2)}%</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
