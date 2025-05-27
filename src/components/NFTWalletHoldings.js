import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";

const TOKEN_API = "/api/token";

const toHttp = (url) => {
  if (!url) return null;
  return url.startsWith("ipfs://")
    ? url.replace("ipfs://", "https://ipfs.io/ipfs/")
    : url;
};

function useNFTOwnerships(address, networkId) {
  return useQuery(
    ["ownerships", address, networkId],
    async () => {
      const { data } = await axios.get(
        `${TOKEN_API}/nft/ownerships/evm/${address}`,
        {
          params: {
            limit: 20,
            network_id: networkId,
          },
        },
      );
      return data.data;
    },
    { enabled: !!address },
  );
}

export default function NFTWalletHoldings({ address, networkId = "mainnet" }) {
  const { data, isLoading, error } = useNFTOwnerships(address, networkId);

  if (!address) return <Text>Enter a wallet/ENS to view NFTs</Text>;
  if (isLoading) return <Spinner size="sm" />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;
  if (!data?.length) return <Text>No NFTs found.</Text>;

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Collection</Th>
            <Th>Token ID</Th>
            <Th>Metadata</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((nft, index) => {
            const meta =
              toHttp(nft.uri) ||
              toHttp(nft.image) ||
              `${TOKEN_API}/nft/items/evm/contract/${nft.contract}/token_id/${encodeURIComponent(String(nft.token_id))}`;
            return (
              <Tr key={`${nft.contract}-${nft.token_id}-${index}`}>
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
                  <Link href={meta} isExternal fontSize="xs" color="blue.500">
                    view
                  </Link>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
