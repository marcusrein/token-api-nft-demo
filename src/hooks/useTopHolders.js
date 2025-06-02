import { useQuery } from "@tanstack/react-query";
import tokenFetch from "../lib/tokenFetch";

export default function useTopHolders(contract) {
  return useQuery(
    ["topHolders", contract],
    async () => {
      const json = await tokenFetch(`/nft/holders/evm/${contract}`, { limit: 10 });
      return json.data;
    },
    { enabled: !!contract, staleTime: 60 * 1000 },
  );
}
