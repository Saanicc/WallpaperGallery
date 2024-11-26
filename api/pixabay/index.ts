import { useInfiniteQuery } from "@tanstack/react-query";
import { PixabayImageOrder, PixabayImageResponse } from "./types";

const PIXABAY_API_URL = `https://pixabay.com/api/?key=${process.env.EXPO_PUBLIC_PIXABAY_API_KEY}`;

export const usePixabayImages = ({
  queryKey,
  orderBy,
}: {
  queryKey: string;
  orderBy: PixabayImageOrder;
}) => {
  return useInfiniteQuery<PixabayImageResponse>({
    queryKey: [`${queryKey}-wallpapers`],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = `${PIXABAY_API_URL}&order=${orderBy}&page=${pageParam}`;

      return await fetch(URL).then((res) => res.json());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.hits?.length ? pages.length + 1 : undefined,
  });
};
