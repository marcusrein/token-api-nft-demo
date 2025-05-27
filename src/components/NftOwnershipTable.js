import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link as ChakraLink,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import tokenApi from "../lib/tokenApi";
import convertToHttpUrl from "../utils/convertToHttpUrl";

async function fetchOwnerships(address) {
  const { data } = await tokenApi.get(`/nft/ownerships/evm/${address}`, {
    params: { limit: 20 }, // You might want to make limit configurable
  });
  return data.data;
}

export default function NftOwnershipTable({ address }) {
  const { data, isLoading, error } = useQuery(
    ["ownerships", address],
    () => fetchOwnerships(address),
    {
      enabled: !!address,
    },
  );

  if (!address) return <Text>Enter an address to view NFT ownerships.</Text>;
  if (isLoading) return <Spinner />;
  if (error)
    return <Text color="red.500">Error loading NFTs: {error.message}</Text>;
  if (!data || data.length === 0)
    return <Text>No NFTs found for this address.</Text>;

  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Collection</Th>
            <Th>Token ID</Th>
            <Th>Metadata</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((nft, idx) => {
            const directMeta =
              convertToHttpUrl(nft.uri) || convertToHttpUrl(nft.image);
            const apiMeta = `https://token-api.service.stage.pinax.network/nft/items/evm/contract/${nft.contract}/token_id/${encodeURIComponent(String(nft.token_id))}`;
            const metadataLink = directMeta || apiMeta;
            return (
              <Tr key={`${nft.contract}-${nft.token_id}-${idx}`}>
                <Td>
                  <Text fontSize="xs" fontWeight="bold">
                    {nft.name || nft.symbol}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {nft.contract}
                  </Text>
                </Td>
                <Td>
                  <Text fontSize="xs">{nft.token_id}</Text>
                </Td>
                <Td>
                  <ChakraLink
                    href={metadataLink ?? "#"}
                    isExternal
                    fontSize="xs"
                    color="blue.500"
                  >
                    view
                  </ChakraLink>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
