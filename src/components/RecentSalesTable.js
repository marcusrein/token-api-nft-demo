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
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import tokenFetch from "../lib/tokenFetch";

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
        { token: contract, limit: 10, network_id: networkId },
      );
      return json.data;
    },
    { enabled: !!contract },
  );
}

export default function RecentSalesTable({ contract, networkId = "mainnet" }) {
  const { data, isLoading, error } = useRecentSales(contract, networkId);

  if (!contract) return <Text>Enter a contract to see sales.</Text>;
  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading sales</Text>;
  if (!data || data.length === 0) return <Text>No recent sales.</Text>;

  return (
    <TableContainer>
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
                <ChakraLink
                  href={`${TOKEN_API}/nft/items/evm/contract/${contract}/token_id/${sale.token_id}`}
                  isExternal
                  color="blue.500"
                >
                  #{sale.token_id}
                </ChakraLink>
              </Td>
              <Td isNumeric>
                {sale.sale_amount} {sale.sale_currency}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
