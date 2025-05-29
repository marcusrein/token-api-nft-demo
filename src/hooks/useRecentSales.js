import { useQuery } from "react-query";
import tokenFetch from "../lib/tokenFetch";

export default function useRecentSales(contract) {
  return useQuery(
    ["recentSales", contract],
    async () => {
      const json = await tokenFetch("/nft/sales/evm", { contract, limit: 10 });
      return json.data;
    },
    { enabled: !!contract, staleTime: 60 * 1000 },
  );
}
