import { VStack, HStack, Text, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import tokenFetch from "../lib/tokenFetch";

function useActivities(params) {
  return useQuery(
    ["activities", params],
    async () => {
      const { wallet, contract, networkId } = params || {};
      const query = { limit: 10, orderDirection: "desc" };
      if (wallet) query.any = wallet;
      if (contract) query.contract = contract;
      if (networkId) query.network_id = networkId;
      const json = await tokenFetch(`/nft/activities/evm`, query);
      return json.data;
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

function minutesAgo(date) {
  const diffMs = Date.now() - new Date(date).getTime();
  return Math.round(diffMs / 60000);
}

function formatAgo(date) {
  const minutes = minutesAgo(date);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (Math.abs(minutes) < 60) return rtf.format(-minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
  const days = Math.round(hours / 24);
  return rtf.format(-days, "day");
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
          <Text>{formatAgo(act.timestamp)}</Text>
          <Text>
            #{act.token_id} {act.from?.slice(0, 4)}… → {act.to?.slice(0, 4)}…
          </Text>
        </HStack>
      ))}
    </VStack>
  );
}
