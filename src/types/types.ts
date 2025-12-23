export enum PixabayImageType {
  All = "all",
  Photo = "photo",
  illustration = "illustration",
  Vector = "vector",
}

export enum PixabayImageOrder {
  POPULAR = "POPULAR",
  LATEST = "LATEST",
}

export type PixabayImage = {
  id: number;
  collections: number;
  pageURL: string;
  type: Omit<PixabayImageType, PixabayImageType.All>;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL?: string;
  imageURL?: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
};

export type PixabayImageResponse = {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
};

export type PexelsImage = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  liked: boolean;
  alt: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
};

export type PexelsImageResponse = {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsImage[];
  next_page: string;
};

export const WallpaperProviders = ["pixabay", "pexels", "unsplash"] as const;

export type WallpaperProvider = (typeof WallpaperProviders)[number];

export interface Wallpaper {
  id: string;
  url: string;
  thumbnail: string;
  width: number;
  height: number;
  photographer: string;
  photographerUrl?: string;
  photographerId?: number;
  views?: number;
  downloads?: number;
  likes?: number;
  tags?: string[];
  provider: WallpaperProvider;
  size?: number;
}

export interface WallpaperResponse {
  wallpapers: Wallpaper[];
  nextPage?: number;
}

export type Orientation = PixabayOrientation | PexelsOrientation;

export enum PixabayOrientation {
  ALL = "all",
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export enum PexelsOrientation {
  ALL = "all",
  LANDSCAPE = "landscape",
  PORTRAIT = "portrait",
  SQUARE = "square",
}

export type ColorType = PixabayColor | PexelsColor;

export enum PixabayColor {
  TRANSPARENT = "transparent",
  RED = "red",
  ORANGE = "orange",
  YELLOW = "yellow",
  GREEN = "green",
  TURQUOISE = "turquoise",
  BLUE = "blue",
  LILAC = "lilac",
  PINK = "pink",
  WHITE = "white",
  GRAY = "gray",
  BLACK = "black",
  BROWN = "brown",
}

export enum PexelsColor {
  RED = "red",
  ORANGE = "orange",
  YELLOW = "yellow",
  GREEN = "green",
  TURQUOISE = "turquoise",
  BLUE = "blue",
  VIOLET = "violet",
  PINK = "pink",
  BROWN = "brown",
  BLACK = "black",
  GRAY = "gray",
  WHITE = "white",
}

export const PexelsImageSizes = ["small", "medium", "large"] as const;

export type PexelsImageSize = (typeof PexelsImageSizes)[number];

export type WallpaperInput = {
  page: number;
  perPage: number;
  order?: PixabayImageOrder;
  category?: Category;
  query?: string;
  orientation?: PixabayOrientation | PexelsOrientation;
  color?: ColorType;
  editorsChoice?: boolean;
  size?: PexelsImageSize;
};

export type SearchParams = Omit<WallpaperInput, "page">;

export interface IWallpaperProvider {
  getWallpapers({
    page,
    perPage,
    order,
    category,
    query,
  }: WallpaperInput): Promise<WallpaperResponse>;
  getWallpaper(id: string): Promise<Wallpaper>;
}

export const categories = [
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
] as const;

export type Category = (typeof categories)[number];

export const categoryImageMap: Record<Category, any> = {
  backgrounds: require(`@/assets/images/category/backgrounds.jpg`),
  fashion: require(`@/assets/images/category/fashion.jpg`),
  nature: require(`@/assets/images/category/nature.jpg`),
  science: require(`@/assets/images/category/science.jpg`),
  education: require(`@/assets/images/category/education.jpg`),
  feelings: require(`@/assets/images/category/feelings.jpg`),
  health: require(`@/assets/images/category/health.jpg`),
  people: require(`@/assets/images/category/people.jpg`),
  religion: require(`@/assets/images/category/religion.jpg`),
  places: require(`@/assets/images/category/places.jpg`),
  animals: require(`@/assets/images/category/animals.jpg`),
  industry: require(`@/assets/images/category/industry.jpg`),
  computer: require(`@/assets/images/category/computer.jpg`),
  food: require(`@/assets/images/category/food.jpg`),
  sports: require(`@/assets/images/category/sports.jpg`),
  transportation: require(`@/assets/images/category/transportation.jpg`),
  travel: require(`@/assets/images/category/travel.jpg`),
  buildings: require(`@/assets/images/category/buildings.jpg`),
  business: require(`@/assets/images/category/business.jpg`),
  music: require(`@/assets/images/category/music.jpg`),
};
