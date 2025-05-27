import { Box, Image, Spinner, Link } from "@chakra-ui/react";
import useNftItem from "../hooks/useNftItem";
import convertToHttpUrl from "../utils/convertToHttpUrl";
import useResolvedImage from "../hooks/useResolvedImage";

export default function NftThumb({ nft }) {
  const tokenIdStr = String(nft.token_id);
  const { data, isLoading } = useNftItem(nft.contract, tokenIdStr);

  const imageCandidate = convertToHttpUrl(data?.image ?? nft.image);
  const { url: finalUrl, isLoading: resolving } =
    useResolvedImage(imageCandidate);

  const metadataUrl = convertToHttpUrl(data?.uri || nft.uri || nft.image);

  const loading = isLoading || resolving;

  if (loading)
    return (
      <Box
        w="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="sm" />
      </Box>
    );

  if (finalUrl) {
    return <Image src={finalUrl} objectFit="cover" w="100%" h="100%" />;
  }

  if (metadataUrl) {
    return (
      <Box textAlign="center" px={2} fontSize="xs">
        <Link href={metadataUrl} isExternal color="blue.500">
          view
        </Link>
      </Box>
    );
  }

  // ultimate fallback – simple placeholder box
  return <Box bg="gray.100" w="100%" h="100%" />;
}
