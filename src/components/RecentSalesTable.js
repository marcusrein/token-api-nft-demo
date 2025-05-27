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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "react-query";
import axios from "axios";

dayjs.extend(relativeTime);

const TOKEN_API = "/api/token";

function useRecentSales(contract, networkId) {
  return useQuery(
    ["sales", contract, networkId],
    async () => {
      const { data } = await axios.get(`${TOKEN_API}/nft/sales/evm`, {
        params: { token: contract, limit: 10, network_id: networkId },
      });
      return data.data;
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
              <Td>{dayjs(sale.timestamp).fromNow()}</Td>
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
