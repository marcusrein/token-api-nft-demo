import { useQuery } from "react-query";
import { resolveEns } from "../lib/ens";

export default function useEnsAddress(input) {
  const isEns = input?.toLowerCase().endsWith(".eth");
  const { data, isLoading, error } = useQuery(
    ["ens", input],
    () => resolveEns(input),
    {
      enabled: isEns,
      staleTime: 60 * 1000, // 1 min
    },
  );

  return {
    address: isEns ? data : input,
    isResolving: isEns && isLoading,
    ensError: isEns && error,
  };
}
