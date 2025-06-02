import { useQuery } from "@tanstack/react-query";
import convertToHttpUrl from "../utils/convertToHttpUrl";

function needsMetadataFetch(url) {
  if (!url) return false;
  // if url has an image extension we assume it's directly an image
  return !/\.(png|jpe?g|gif|webp|svg)$/i.test(url);
}

export default function useResolvedImage(initialUrl) {
  const httpUrl = convertToHttpUrl(initialUrl);
  const enabled = needsMetadataFetch(httpUrl);

  const { data, isLoading } = useQuery(
    ["resolvedImage", httpUrl],
    async () => {
      try {
        const res = await fetch(httpUrl);
        const json = await res.json();
        const nested = convertToHttpUrl(json.image || json.image_url || null);
        return nested;
      } catch (e) {
        return null;
      }
    },
    { enabled, staleTime: 10 * 60 * 1000 },
  );

  return { url: enabled ? data : httpUrl, isLoading };
}
