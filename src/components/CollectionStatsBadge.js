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
import axios from "axios";

const TOKEN_API = "/api/token";

async function fetchCollection(contract, networkId) {
  const { data } = await axios.get(
    `${TOKEN_API}/nft/collections/evm/${contract}`,
    { params: { network_id: networkId } },
  );
  return data.data?.[0];
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
