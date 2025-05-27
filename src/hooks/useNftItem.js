import { useQuery } from "react-query";
import tokenApi from "../lib/tokenApi";

export default function useNftItem(contract, tokenId) {
  // If tokenId is supplied as a plain number and is outside the safe integer range, the
  // upstream API will reject it (and JavaScript will serialise it in scientific notation).
  // In that situation we simply skip the fetch – the calling component can still fall back
  // to whatever basic information it already has in the NFT list.
  const idStr = String(tokenId);
  const looksScientific = /[eE\.]/.test(idStr);
  const isFineNumber =
    !looksScientific &&
    (typeof tokenId !== "number" ||
      (Number.isSafeInteger(tokenId) && tokenId >= 0));

  return useQuery(
    ["nftItem", contract, tokenId],
    async () => {
      // Ensure token ID is treated purely as a string and URI-encoded so that very large numeric
      // values (which JavaScript may otherwise coerce into scientific-notation) are passed to
      // the Token API exactly as received.
      const safeTokenId = encodeURIComponent(String(tokenId));
      const { data } = await tokenApi.get(
        `/nft/items/evm/contract/${contract}/token_id/${safeTokenId}`,
      );
      return data.data?.[0];
    },
    {
      enabled:
        !!contract && tokenId !== undefined && tokenId !== null && isFineNumber,
      staleTime: 5 * 60 * 1000,
    },
  );
}
