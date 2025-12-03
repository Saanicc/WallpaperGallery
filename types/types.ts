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
