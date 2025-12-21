import { fetchWallpapers } from "@/helpers/fetchWallpapers";
import { wallpapersInfiniteKey } from "@/helpers/wallpapersInfiniteKey";
import { useScreenSize } from "@/hooks/useScreenSize";
import { getProvider } from "@/providers";
import {
  IWallpaperProvider,
  SearchParams,
  Wallpaper,
  WallpaperProvider,
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
  getWallpaper: (
    wallpaperId: string,
    providerName: WallpaperProvider
  ) => UseQueryResult<Wallpaper, Error>;
  getWallpapers: (
    params: SearchParams
  ) => UseInfiniteQueryResult<InfiniteData<WallpaperResponse>, Error>;
  provider: IWallpaperProvider;
}

export const WallpaperContext = createContext<WallpaperContextValue>({
  getWallpaper: () => ({}) as UseQueryResult<Wallpaper, Error>,
  getWallpapers: () =>
    ({}) as UseInfiniteQueryResult<InfiniteData<WallpaperResponse>, Error>,
  provider: {} as any,
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
    (wallpaperId: string, providerName: WallpaperProvider) =>
      useQuery<Wallpaper>({
        queryKey: ["wallpaper", wallpaperId, providerName],
        queryFn: async () => {
          const targetProvider = getProvider(
            providerName,
            actualWidthInPixels,
            actualHeightInPixels
          );
          return targetProvider.getWallpaper(wallpaperId);
        },
      }),
    [actualWidthInPixels, actualHeightInPixels]
  );

  const getWallpapers = useCallback(
    (params: SearchParams) =>
      useInfiniteQuery<WallpaperResponse>({
        queryKey: wallpapersInfiniteKey(params, wallpaperProvider),
        queryFn: async ({ pageParam = 1 }) =>
          await fetchWallpapers(provider, params, pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }),
    [provider, wallpaperProvider]
  );

  const value = useMemo(() => {
    return {
      getWallpaper,
      getWallpapers,
      provider,
    };
  }, [getWallpaper, getWallpapers, provider]);

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
