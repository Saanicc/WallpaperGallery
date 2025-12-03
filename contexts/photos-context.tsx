import { useScreenSize } from "@/hooks/useScreenSize";
import {
  Category,
  PixabayImageOrder,
  PixabayImageResponse,
} from "@/types/types";
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface WallpaperContextValue {
  orderBy: PixabayImageOrder;
  selectedCategory: Category | undefined;
  getWallpaper: (
    wallpaperId: string
  ) => UseQueryResult<PixabayImageResponse, Error>;
  getWallpapers: (
    order?: PixabayImageOrder,
    category?: Category,
    perPage?: number
  ) => UseInfiniteQueryResult<InfiniteData<PixabayImageResponse>, Error>;
  setOrderBy: Dispatch<SetStateAction<PixabayImageOrder>>;
  setSelectedCategory: Dispatch<SetStateAction<Category | undefined>>;
}

export const WallpaperContext = createContext<WallpaperContextValue>({
  orderBy: PixabayImageOrder.POPULAR,
  selectedCategory: undefined,
  getWallpaper: () => ({} as UseQueryResult<PixabayImageResponse, Error>),
  getWallpapers: () =>
    ({} as UseInfiniteQueryResult<InfiniteData<PixabayImageResponse>, Error>),
  setOrderBy: () => Promise.resolve(),
  setSelectedCategory: () => Promise.resolve(),
});

const PIXABAY_API_URL = `https://pixabay.com/api/?key=${process.env.EXPO_PUBLIC_PIXABAY_API_KEY}`;

export const WallpaperContextProvider = ({ children }: PropsWithChildren) => {
  const [orderBy, setOrderBy] = useState<PixabayImageOrder>(
    PixabayImageOrder.POPULAR
  );
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();

  const { actualWidthInPixels, actualHeightInPixels } = useScreenSize();

  const getWallpaper = useCallback(
    (wallpaperId: string) =>
      useQuery<PixabayImageResponse>({
        queryKey: ["wallpaper", wallpaperId],
        queryFn: async () => {
          const URL = `${PIXABAY_API_URL}&id=${wallpaperId}`;
          return await fetch(URL).then((res) => {
            const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");
            console.log("X-RateLimit-Remaining:", rateLimitRemaining);
            return res.json();
          });
        },
      }),
    []
  );

  const getWallpapers = useCallback(
    (
      order: PixabayImageOrder = PixabayImageOrder.POPULAR,
      category?: Category,
      perPage: number = 20
    ) =>
      useInfiniteQuery<PixabayImageResponse>({
        queryKey: [
          "wallpapers",
          order.toLowerCase(),
          category?.toLowerCase(),
          perPage,
        ],
        queryFn: async ({ pageParam = 1 }) => {
          const imageType = `&image_type=photo`;
          const safeSearch = `&safesearch=true`;
          const categoryParam = category ? `&category=${category}` : "";
          const width = `&min_width=${actualWidthInPixels}`;
          const height = `&min_height=${actualHeightInPixels}`;
          const orderParam = `&order=${order.toLowerCase()}`;
          const pageParameter = `&page=${pageParam}`;
          const perPageParam = `&per_page=${perPage}`;

          const URL = `${PIXABAY_API_URL}${imageType}${safeSearch}${categoryParam}${width}${height}${orderParam}${pageParameter}${perPageParam}`;

          return await fetch(URL).then((res) => {
            const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");
            console.log("X-RateLimit-Remaining:", rateLimitRemaining);
            return res.json();
          });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) =>
          lastPage?.hits?.length ? pages.length + 1 : undefined,
      }),
    [actualWidthInPixels, actualHeightInPixels]
  );

  const value = useMemo(() => {
    return {
      orderBy,
      selectedCategory,
      getWallpaper,
      getWallpapers,
      setOrderBy,
      setSelectedCategory,
    };
  }, [
    orderBy,
    selectedCategory,
    setOrderBy,
    getWallpaper,
    getWallpapers,
    setSelectedCategory,
  ]);

  return (
    <WallpaperContext.Provider value={value}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaperContext = () => {
  const context = useContext(WallpaperContext);

  if (context === undefined) {
    throw new Error(
      "useWallpaperContext must be used within a WallpaperContext"
    );
  }
  return context;
};
