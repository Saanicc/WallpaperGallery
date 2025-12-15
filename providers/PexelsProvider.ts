import {
  IWallpaperProvider,
  PexelsImage,
  PexelsImageResponse,
  Wallpaper,
  WallpaperInput,
  WallpaperResponse,
} from "@/types/types";

const PEXELS_BASE_URL = `https://api.pexels.com/v1`;

export class PexelsProvider implements IWallpaperProvider {
  async getWallpapers({
    page,
    perPage,
    query,
    orientation,
    color,
    size,
  }: WallpaperInput): Promise<WallpaperResponse> {
    const pageParameter = `?page=${page}`;
    const perPageParam = `&per_page=${perPage}`;
    const sizeParam = size ? `&size=${size}` : "";
    const orientationParam = orientation ? `&orientation=${orientation}` : "";
    const colorParam = color ? `&color=${color}` : "";
    const isSearch = !!query;
    const endpoint = isSearch ? "/search" : "/curated";
    const queryParam = isSearch ? `&query=${encodeURIComponent(query)}` : "";

    const URL = `${PEXELS_BASE_URL}${endpoint}${pageParameter}${perPageParam}${sizeParam}${queryParam}${orientationParam}${colorParam}`;

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.EXPO_PUBLIC_PEXELS_API_KEY ?? "",
      },
    });
    const data: PexelsImageResponse = await response.json();

    return {
      wallpapers: data.photos.map(this.mapToWallpaper),
      nextPage: data.photos.length ? page + 1 : undefined,
    };
  }

  async getWallpaper(id: string): Promise<Wallpaper> {
    const URL = `${PEXELS_BASE_URL}/photos/${id}`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.EXPO_PUBLIC_PEXELS_API_KEY ?? "",
      },
    });
    const data: PexelsImage = await response.json();

    if (!data) {
      throw new Error("Wallpaper not found");
    }

    return this.mapToWallpaper(data);
  }

  private mapToWallpaper(item: PexelsImage): Wallpaper {
    return {
      id: String(item.id),
      url: item.src.original,
      thumbnail: item.src.tiny,
      width: item.width,
      height: item.height,
      photographer: item.photographer,
      photographerUrl: item.photographer_url,
      photographerId: item.photographer_id,
      provider: "pexels",
    };
  }
}
