import { useQuery } from "react-query";
import tokenApi from "../lib/tokenApi";

export default function useTopHolders(contract) {
  return useQuery(
    ["topHolders", contract],
    async () => {
      const { data } = await tokenApi.get(`/nft/holders/evm/${contract}`, {
        params: { limit: 10 },
      });
      return data.data;
    },
    { enabled: !!contract, staleTime: 60 * 1000 },
  );
}
