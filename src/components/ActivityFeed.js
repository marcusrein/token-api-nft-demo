import { VStack, HStack, Text, Spinner } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "react-query";
import axios from "axios";

dayjs.extend(relativeTime);

const TOKEN_API = "/api/token";

function useActivities(params) {
  return useQuery(
    ["activities", params],
    async () => {
      const { wallet, contract, networkId } = params || {};
      const query = new URLSearchParams({ limit: 10, orderDirection: "desc" });
      if (wallet) query.set("any", wallet);
      if (contract) query.set("contract", contract);
      if (networkId) query.set("network_id", networkId);
      const { data } = await axios.get(
        `${TOKEN_API}/nft/activities/evm?${query.toString()}`,
      );
      return data.data;
    },
    { enabled: !!(params.wallet || params.contract) },
  );
}

function badge(type) {
  switch (type) {
    case "MINT":
      return "🟢";
    case "BURN":
      return "🔴";
    default:
      return "🔄";
  }
}

export default function ActivityFeed({
  wallet,
  contract,
  networkId = "mainnet",
}) {
  const { data, isLoading, error } = useActivities({
    wallet,
    contract,
    networkId,
  });

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading activity</Text>;
  if (!data || data.length === 0) return <Text>No recent activity.</Text>;

  return (
    <VStack align="stretch" spacing={1} maxH="300px" overflowY="auto">
      {data.map((act, idx) => (
        <HStack key={`${act.tx_hash}-${idx}`} fontSize="xs" spacing={2}>
          <Text>{badge(act["@type"])}</Text>
          <Text>{dayjs(act.timestamp).fromNow()}</Text>
          <Text>
            #{act.token_id} {act.from?.slice(0, 4)}… → {act.to?.slice(0, 4)}…
          </Text>
        </HStack>
      ))}
    </VStack>
  );
}
