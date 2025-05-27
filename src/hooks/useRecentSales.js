import { useQuery } from "react-query";
import tokenApi from "../lib/tokenApi";

export default function useRecentSales(contract) {
  return useQuery(
    ["recentSales", contract],
    async () => {
      const { data } = await tokenApi.get("/nft/sales/evm", {
        params: { token: contract, limit: 10 },
      });
      return data.data;
    },
    { enabled: !!contract, staleTime: 60 * 1000 },
  );
}
