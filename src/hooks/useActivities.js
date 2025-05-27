import { useQuery } from "react-query";
import tokenApi from "../lib/tokenApi";

export default function useActivities({ wallet, contract }) {
  return useQuery(
    ["activities", wallet, contract],
    async () => {
      const params = { limit: 10, orderDirection: "desc" };
      if (wallet) params.any = wallet;
      if (contract) params.contract = contract;
      const { data } = await tokenApi.get("/nft/activities/evm", { params });
      return data.data;
    },
    { enabled: !!wallet || !!contract, staleTime: 30 * 1000 },
  );
}
