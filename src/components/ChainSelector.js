import { Select, HStack, Text, Box } from "@chakra-ui/react";
import { useChain, SUPPORTED_CHAINS } from "../contexts/ChainContext";

export default function ChainSelector() {
  const { selectedChain, setSelectedChain } = useChain();

  return (
    <Box>
      <HStack spacing={2} align="center">
        <Text fontSize="sm" color="gray.600">
          Network:
        </Text>
        <Select
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
          size="sm"
          width="auto"
        >
          {Object.entries(SUPPORTED_CHAINS).map(([id, chain]) => (
            <option key={id} value={id} disabled={id !== "mainnet"}>
              {chain.icon} {chain.name}
            </option>
          ))}
        </Select>
      </HStack>
      <Text fontSize="xs" color="gray.500" mt={1}>
        Other chains coming soon!
      </Text>
    </Box>
  );
}
