import {
  Category,
  PixabayImage,
  PixabayImageOrder,
  PixabayImageResponse,
} from "@/api/pixabay/types";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useInfiniteQuery } from "@tanstack/react-query";
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
  allWallpapers: PixabayImage[];
  loading: boolean;
  isLoadingMore: boolean;
  orderBy: PixabayImageOrder;
  selectedCategory: Category | undefined;
  loadMore: () => void;
  getWallpaper: (wallpaperId: string) => PixabayImage | undefined;
  setOrderBy: Dispatch<SetStateAction<PixabayImageOrder>>;
  setSelectedCategory: Dispatch<SetStateAction<Category | undefined>>;
}

export const WallpaperContext = createContext<WallpaperContextValue>({
  allWallpapers: [],
  loading: false,
  isLoadingMore: false,
  orderBy: PixabayImageOrder.POPULAR,
  selectedCategory: undefined,
  loadMore: () => Promise.resolve(),
  getWallpaper: () => undefined,
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

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
  } = useInfiniteQuery<PixabayImageResponse>({
    queryKey: [
      orderBy.toLowerCase(),
      selectedCategory?.toLowerCase(),
      "wallpapers",
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const imageType = `&image_type=photo`;
      const category = `&category=${selectedCategory}`;
      const width = `&min_width=${actualWidthInPixels}`;
      const height = `&min_height=${actualHeightInPixels}`;
      const order = `&order=${orderBy.toLowerCase()}`;
      const page = `&page=${pageParam}`;
      const perPage = `&per_page=10`;

      const URL = `${PIXABAY_API_URL}${imageType}${category}${width}${height}${order}${page}${perPage}`;

      return await fetch(URL).then((res) => res.json());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.hits?.length ? pages.length + 1 : undefined,
    staleTime:
      orderBy === PixabayImageOrder.POPULAR ? 1000 * 60 * 5 : 1000 * 60,
  });

  const photos = data?.pages.flatMap((page) => page.hits) || [];

  const loadMore = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const getWallpaper = useCallback(
    (wallpaperId: string) =>
      photos.find((photo) => String(photo.id) === wallpaperId),
    [photos]
  );

  const value = useMemo(() => {
    return {
      allWallpapers: photos,
      loading: isLoading || isPending || isFetching,
      isLoadingMore: isFetchingNextPage,
      orderBy,
      selectedCategory,
      loadMore,
      getWallpaper,
      setOrderBy,
      setSelectedCategory,
    };
  }, [
    photos,
    isLoading,
    isFetchingNextPage,
    orderBy,
    selectedCategory,
    loadMore,
    setOrderBy,
    getWallpaper,
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
