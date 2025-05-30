import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
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
				<Heading size="xl">NFT Portfolio Dashboard</Heading>
				<Text fontSize="sm" color="gray.600">
					Wallet example is Vitalik's EOA: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
				</Text>
				<Text fontSize="sm" color="gray.600" mb={2}>
					Collection example is Pudgy Penguins smart contract: 0xbd3531da5cf5857e7cfaa92426877b022e612cf8
				</Text>
				<Text fontSize="sm" color="gray.600" mb={2}>
					Each component below is standalone—use its built-in inputs to query.
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
