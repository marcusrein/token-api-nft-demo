import { useQuery } from "@tanstack/react-query";
import tokenFetch from "../lib/tokenFetch";

export default function useActivities({ wallet, contract }) {
  return useQuery(
    ["activities", wallet, contract],
    async () => {
      const params = { limit: 10, orderDirection: "desc" };
      if (wallet) params.any = wallet;
      if (contract) params.contract = contract;
      const json = await tokenFetch("/nft/activities/evm", params);
      return json.data;
    },
    { enabled: !!wallet || !!contract, staleTime: 30 * 1000 },
  );
}
