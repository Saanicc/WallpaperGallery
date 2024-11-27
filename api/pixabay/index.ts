import { useInfiniteQuery } from "@tanstack/react-query";
import { PixabayImageOrder, PixabayImageResponse } from "./types";

const PIXABAY_API_URL = `https://pixabay.com/api/?key=${process.env.EXPO_PUBLIC_PIXABAY_API_KEY}`;

type QueryProps = {
  queryKey: string;
  orderBy: PixabayImageOrder;
  minWidth: number;
  minHeight: number;
};

export const usePixabayImages = ({
  queryKey,
  orderBy,
  minWidth,
  minHeight,
}: QueryProps) => {
  return useInfiniteQuery<PixabayImageResponse>({
    queryKey: [`${queryKey}-wallpapers`],
    queryFn: async ({ pageParam = 1 }) => {
      const width = `&min_width=${minWidth}`;
      const height = `&min_height=${minHeight}`;
      const order = `&order=${orderBy.toLowerCase()}`;
      const page = `&page=${pageParam}`;

      const URL = `${PIXABAY_API_URL}${width}${height}${order}${page}`;

      return await fetch(URL).then((res) => res.json());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.hits?.length ? pages.length + 1 : undefined,
  });
};
