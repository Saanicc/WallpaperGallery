import { useScreenSize } from "@/hooks/useScreenSize";
import { getProvider } from "@/providers";
import {
  Category,
  PixabayImageOrder,
  Wallpaper,
  WallpaperResponse,
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
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useSettings } from "./settings-context";

export interface WallpaperContextValue {
  getWallpaper: (wallpaperId: string) => UseQueryResult<Wallpaper, Error>;
  getWallpapers: ({
    order,
    category,
    perPage,
    query,
  }: {
    order?: PixabayImageOrder;
    category?: Category;
    perPage?: number;
    query?: string;
  }) => UseInfiniteQueryResult<InfiniteData<WallpaperResponse>, Error>;
}

export const WallpaperContext = createContext<WallpaperContextValue>({
  getWallpaper: () => ({}) as UseQueryResult<Wallpaper, Error>,
  getWallpapers: () =>
    ({}) as UseInfiniteQueryResult<InfiniteData<WallpaperResponse>, Error>,
});

export const WallpaperContextProvider = ({ children }: PropsWithChildren) => {
  const { actualWidthInPixels, actualHeightInPixels } = useScreenSize();
  const { wallpaperProvider } = useSettings();

  const provider = useMemo(
    () =>
      getProvider(
        wallpaperProvider as any,
        actualWidthInPixels,
        actualHeightInPixels
      ),
    [wallpaperProvider, actualWidthInPixels, actualHeightInPixels]
  );

  const getWallpaper = useCallback(
    (wallpaperId: string) =>
      useQuery<Wallpaper>({
        queryKey: ["wallpaper", wallpaperId, wallpaperProvider],
        queryFn: async () => provider.getWallpaper(wallpaperId),
      }),
    [provider, wallpaperProvider]
  );

  const getWallpapers = useCallback(
    ({
      order,
      category,
      perPage = 20,
      query,
    }: {
      order?: PixabayImageOrder;
      category?: Category;
      perPage?: number;
      query?: string;
    }) =>
      useInfiniteQuery<WallpaperResponse>({
        queryKey: [
          "wallpapers",
          order?.toLowerCase(),
          category?.toLowerCase(),
          perPage,
          query,
          wallpaperProvider,
        ],
        queryFn: async ({ pageParam = 1 }) =>
          provider.getWallpapers({
            page: pageParam as number,
            perPage,
            order,
            category,
            query,
          }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }),
    [provider, wallpaperProvider]
  );

  const value = useMemo(() => {
    return {
      getWallpaper,
      getWallpapers,
    };
  }, [getWallpaper, getWallpapers]);

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
