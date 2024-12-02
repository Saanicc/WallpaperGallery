export enum PixabayImageType {
  All = "all",
  Photo = "photo",
  illustration = "illustration",
  Vector = "vector",
}

export enum PixabayImageOrder {
  POPULAR = "Popular",
  LATEST = "Latest",
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
