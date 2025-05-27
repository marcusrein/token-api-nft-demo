import { useState } from "react";
import {
  Box,
  Input,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
  Card,
  CardHeader,
  CardBody,
  Divider,
  HStack,
} from "@chakra-ui/react";
import NFTWalletHoldings from "../components/NFTWalletHoldings";
import NFTTopHolders from "../components/NFTTopHolders";
import RecentSalesTable from "../components/RecentSalesTable";
import ActivityFeed from "../components/ActivityFeed";
import CollectionStatsBadge from "../components/CollectionStatsBadge";
import useEnsAddress from "../hooks/useEnsAddress";
import ApiLogDrawer from "../components/ApiLogDrawer";
import ChainSelector from "../components/ChainSelector";
import { useChain } from "../contexts/ChainContext";

export default function Home() {
  const [input, setInput] = useState("vitalik.eth");
  const { address } = useEnsAddress(input);
  const [contract, setContract] = useState(
    "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
  );
  const { selectedChain } = useChain();

  return (
    <Box p={8} maxW="960px" mx="auto">
      <VStack spacing={3} align="stretch">
        <HStack justify="space-between" align="center">
          <Heading size="lg">NFT Portfolio Dashboard</Heading>
          <ChainSelector />
        </HStack>
        <Text fontSize="sm" color="gray.600">
          Enter an Ethereum wallet address or ENS name below to see its NFT
          holdings and related collection information across multiple chains.
          This demonstrates how the Token API can be used to build rich NFT
          portfolio experiences.
        </Text>
        <Heading size="lg" mb={1}>
          Wallet Explorer
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={2}>
          Enter a wallet address or ENS name below to explore NFT holdings.
        </Text>
        <Input
          placeholder="e.g., vitalik.eth or 0xd8dA..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="sm"
          mb={2}
        />

        <Card>
          <CardHeader>
            <Heading size="md">NFT Ownerships</Heading>
            <Text fontSize="sm" color="gray.600">
              Enter a wallet address or ENS name below to see their NFTs.
            </Text>
            <Text fontSize="xs" color="gray.500">
              Uses:{" "}
              <ChakraLink
                href="https://token-api.service.stage.pinax.network/#tag/evm/GET/nft/ownerships/evm/%7Baddress%7D"
                isExternal
                color="blue.500"
              >
                /nft/ownerships
              </ChakraLink>{" "}
              for the list, and{" "}
              <ChakraLink
                href="https://token-api.service.stage.pinax.network/#tag/evm/GET/nft/items/evm/contract/%7Bcontract%7D/token_id/%7Btoken_id%7D"
                isExternal
                color="blue.500"
              >
                /nft/items
              </ChakraLink>{" "}
              for each thumbnail's metadata.
            </Text>
          </CardHeader>
          <CardBody>
            <NFTWalletHoldings address={address} networkId={selectedChain} />
          </CardBody>
        </Card>

        <Divider my={10} borderColor="gray.300" borderWidth={2} />
        <Heading size="lg" mb={2}>
          Contract Explorer
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={4}>
          Enter or adjust the NFT contract address above to see stats, holders,
          sales and on-chain activity for that specific collection.
        </Text>
        <Card>
          <CardHeader>
            <Heading size="md">Collection Stats</Heading>
            <Text fontSize="sm" color="gray.600">
              Enter an NFT contract address to view its metadata.
            </Text>
            <Input
              placeholder="NFT contract address"
              value={contract}
              onChange={(e) => setContract(e.target.value)}
              size="sm"
              mt={2}
            />
            <Text fontSize="xs" color="gray.500">
              Uses:{" "}
              <ChakraLink
                href="https://token-api.service.stage.pinax.network/#tag/evm/GET/nft/collections/evm/%7Bcontract%7D"
                isExternal
                color="blue.500"
              >
                /nft/collections
              </ChakraLink>
            </Text>
          </CardHeader>
          <CardBody>
            <CollectionStatsBadge
              contract={contract}
              networkId={selectedChain}
            />
          </CardBody>
        </Card>

        {/* Top Holders */}
        <Card>
          <CardHeader>
            <Heading size="md">Top Holders</Heading>
            <Text fontSize="sm" color="gray.600">
              Top NFT holders for this contract.
            </Text>
            <Text fontSize="xs" color="gray.500">
              Uses:{" "}
              <ChakraLink
                href="https://token-api.service.stage.pinax.network/#tag/evm/GET/nft/holders/evm/%7Bcontract%7D"
                isExternal
                color="blue.500"
              >
                /nft/holders
              </ChakraLink>
            </Text>
          </CardHeader>
          <CardBody>
            <NFTTopHolders
              contract={contract}
              networkId={selectedChain}
              onAddressClick={(addr) => setInput(addr)}
            />
          </CardBody>
        </Card>

        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <Heading size="md">Recent Marketplace Sales</Heading>
            <Text fontSize="sm" color="gray.600">
              Latest sales for this contract.
            </Text>
            <Text fontSize="xs" color="gray.500">
              Uses:{" "}
              <ChakraLink
                href="https://token-api.service.stage.pinax.network/#tag/evm/GET/nft/sales/evm"
                isExternal
                color="blue.500"
              >
                /nft/sales
              </ChakraLink>
            </Text>
          </CardHeader>
          <CardBody>
            <RecentSalesTable contract={contract} networkId={selectedChain} />
          </CardBody>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <Heading size="md">Contract Activity</Heading>
            <Text fontSize="sm" color="gray.600">
              Recent NFT mints, transfers and burns for this contract.
            </Text>
            <Text fontSize="xs" color="gray.500">
              Uses:{" "}
              <ChakraLink
                href="https://token-api.service.stage.pinax.network/#tag/evm/GET/nft/activities/evm"
                isExternal
                color="blue.500"
              >
                /nft/activities
              </ChakraLink>
            </Text>
          </CardHeader>
          <CardBody>
            <ActivityFeed contract={contract} networkId={selectedChain} />
          </CardBody>
        </Card>
      </VStack>
      <ApiLogDrawer />
    </Box>
  );
}
