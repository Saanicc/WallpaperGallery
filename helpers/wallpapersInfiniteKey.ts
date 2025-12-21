import { SearchParams, WallpaperProvider } from "@/types/types";

export const wallpapersInfiniteKey = (
  params: SearchParams,
  wallpaperProvider: WallpaperProvider
) => [
  "wallpapers",
  params.order?.toLowerCase(),
  params.category?.toLowerCase(),
  params.query?.toLowerCase(),
  params.orientation?.toLowerCase(),
  params.color?.toLowerCase(),
  params.editorsChoice,
  params.size,
  wallpaperProvider,
];
