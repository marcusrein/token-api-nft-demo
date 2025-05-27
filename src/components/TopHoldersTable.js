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
  HStack,
} from "@chakra-ui/react";
import useTopHolders from "../hooks/useTopHolders";

export default function TopHoldersTable({ contract, onAddressClick }) {
  const { data, isLoading, error } = useTopHolders(contract);

  if (!contract) return <Text>Enter a contract to see holders.</Text>;
  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading holders</Text>;
  if (!data || data.length === 0) return <Text>No holder data.</Text>;

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Address</Th>
            <Th isNumeric>Tokens</Th>
            <Th isNumeric>%</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((h, idx) => (
            <Tr key={h.address}>
              <Td>{idx + 1}</Td>
              <Td fontSize="xs">
                <ChakraLink
                  as="button"
                  color="blue.500"
                  onClick={() => onAddressClick?.(h.address)}
                >
                  {h.address.slice(0, 6)}…
                </ChakraLink>
              </Td>
              <Td isNumeric>{h.quantity}</Td>
              <Td isNumeric>{(h.percentage * 100).toFixed(2)}%</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
