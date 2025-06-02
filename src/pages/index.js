import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
  Alert,
  AlertIcon,
  UnorderedList,
  ListItem,
  Card,
  CardBody,
  Divider,
} from "@chakra-ui/react";
import NFTWalletHoldings from "../components/NFTWalletHoldings";
import NFTTopHolders from "../components/NFTTopHolders";
import RecentSalesTable from "../components/RecentSalesTable";
import ActivityFeed from "../components/ActivityFeed";
import CollectionStatsBadge from "../components/CollectionStatsBadge";

export default function Home() {
  return (
		<Box p={8} maxW="960px" mx="auto">
			<VStack spacing={3} align="stretch">
				<Heading size="xl" mb={4}>
					NFT Portfolio Dashboard
				</Heading>
				<Alert status="info" variant="left-accent" borderRadius="md" mb={6}>
					<Box>
						<Text fontSize="md" mb={2}>
							All data is fetched from The Graph's Token API. Read about the API{" "}
							<ChakraLink
								href="https://token-api.service.stage.pinax.network/#tag/evm"
								isExternal
								color="blue.500"
							>
								here
							</ChakraLink>{' '}and read the Quickstart guide{' '}
							<ChakraLink
								href="https://token-api.service.stage.pinax.network/quickstart"
								isExternal
								color="blue.500"
							>
								here
							</ChakraLink>.
						</Text>
						<Text fontSize="sm" color="gray.600" mb={2}>
							Use these two example smart contract addresses to test the components ➡️. All EOAs and Collection smart contract addresses will work, these are simply provided as examples. Currently, Ethereum Mainnet is the only network supported for Token API NFT data, however more networks will be added in the future.
						</Text>
					</Box>
					<UnorderedList spacing={1} pl={4}>
						<ListItem>
							<Text as="span" fontWeight="semibold">Wallet NFT Explorer example EOA:</Text> 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
						</ListItem>
						<ListItem>
							<Text as="span" fontWeight="semibold">NFT Collection Explorer example smart contract:</Text> 0xbd3531da5cf5857e7cfaa92426877b022e612cf8
						</ListItem>
					</UnorderedList>
				</Alert>
				<Text fontSize="sm" color="gray.600" mb={2}>
					Each component below is standalone! You can copy and paste the
					components into your own project - simply add your own JWT key
					gathered from{" "}
					<ChakraLink
						href="https://marketplace.thegraph.com/"
						isExternal
						color="blue.500"
					>
						The Graph Marketplace
					</ChakraLink>{" "}
					to your .env.local file.
				</Text>
				<Heading size="lg" mb={2}>
					Wallet NFT Explorer
				</Heading>
				<Text fontSize="sm" color="gray.600" mb={4}>
					Enter or adjust the NFT contract address above to see stats, holders,
					sales and on-chain activity for that specific collection.
				</Text>
				<Card>
					<CardBody>
						<NFTWalletHoldings />
					</CardBody>
				</Card>

				<Divider my={10} borderColor="gray.300" borderWidth={2} />
				<Heading size="lg" mb={2}>
					NFT Collection Explorer
				</Heading>
				<Text fontSize="sm" color="gray.600" mb={4}>
					Enter or adjust the NFT contract address above to see stats, holders,
					sales and on-chain activity for that specific collection.
				</Text>
				<Card>
					<CardBody>
						<CollectionStatsBadge />
					</CardBody>
				</Card>

				{/* Top Holders */}
				<Card>
					<CardBody>
						<NFTTopHolders />
					</CardBody>
				</Card>

				{/* Recent Sales */}
				<Card>
					<CardBody>
						<RecentSalesTable />
					</CardBody>
				</Card>

				{/* Activity Feed */}
				<Card>
					<CardBody>
						<ActivityFeed />
					</CardBody>
				</Card>
			</VStack>
		</Box>
	);
}
