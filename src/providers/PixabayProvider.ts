import {
  IWallpaperProvider,
  PixabayImage,
  PixabayImageResponse,
  Wallpaper,
  WallpaperInput,
  WallpaperResponse,
} from "@/types/types";

const PIXABAY_API_URL = `https://pixabay.com/api/?key=${process.env.EXPO_PUBLIC_PIXABAY_API_KEY}`;

export class PixabayProvider implements IWallpaperProvider {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  async getWallpapers({
    page,
    perPage,
    order,
    category,
    query,
    orientation,
    color,
    editorsChoice,
  }: WallpaperInput): Promise<WallpaperResponse> {
    const imageType = `&image_type=photo`;
    const safeSearch = `&safesearch=true`;
    const categoryParam = category ? `&category=${category}` : "";
    const widthParam = `&min_width=${this.width}`;
    const heightParam = `&min_height=${this.height}`;
    const orderParam = `&order=${order?.toLowerCase()}`;
    const pageParameter = `&page=${page}`;
    const perPageParam = `&per_page=${perPage}`;
    const queryParam = query ? `&q=${encodeURIComponent(query)}` : "";
    const orientationParam = orientation ? `&orientation=${orientation}` : "";
    const colorParam = color ? `&colors=${color}` : "";
    const editorsChoiceParam = editorsChoice ? `&editors_choice=true` : "";

    const URL = `${PIXABAY_API_URL}${imageType}${safeSearch}${categoryParam}${widthParam}${heightParam}${orderParam}${pageParameter}${perPageParam}${queryParam}${orientationParam}${colorParam}${editorsChoiceParam}`;

    const response = await fetch(URL);
    const data: PixabayImageResponse = await response.json();

    return {
      wallpapers: data.hits.map(this.mapToWallpaper),
      nextPage: data.hits.length ? page + 1 : undefined,
    };
  }

  async getWallpaper(id: string): Promise<Wallpaper> {
    const URL = `${PIXABAY_API_URL}&id=${id}`;
    const response = await fetch(URL);
    const data: PixabayImageResponse = await response.json();

    if (!data.hits.length) {
      throw new Error("Wallpaper not found");
    }

    return this.mapToWallpaper(data.hits[0]);
  }

  private mapToWallpaper(item: PixabayImage): Wallpaper {
    return {
      id: String(item.id),
      url: item.largeImageURL,
      thumbnail: item.webformatURL,
      width: item.imageWidth,
      height: item.imageHeight,
      photographer: item.user,
      photographerUrl: item.userImageURL,
      photographerId: item.user_id,
      views: item.views,
      downloads: item.downloads,
      likes: item.likes,
      tags: item.tags ? item.tags.split(", ") : [],
      size: item.imageSize,
      provider: "pixabay",
    };
  }
}
