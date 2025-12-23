import { IWallpaperProvider, SearchParams } from "@/types/types";

export const fetchWallpapers = async (
  provider: IWallpaperProvider,
  params: SearchParams,
  page: number
) => {
  return provider.getWallpapers({
    page,
    perPage: params.perPage,
    order: params.order,
    category: params.category,
    query: params.query,
    orientation: params.orientation,
    color: params.color,
    editorsChoice: params.editorsChoice,
    size: params.size,
  });
};
