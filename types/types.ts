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
