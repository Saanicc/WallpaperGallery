import { IWallpaperProvider } from "@/types/types";
import { PexelsProvider } from "./PexelsProvider";
import { PixabayProvider } from "./PixabayProvider";

export const getProvider = (
  provider: "pixabay" | "pexels" | "unsplash",
  width: number,
  height: number
): IWallpaperProvider => {
  switch (provider) {
    case "pixabay":
      return new PixabayProvider(width, height);
    case "pexels":
      return new PexelsProvider();
    default:
      return new PixabayProvider(width, height);
  }
};

export * from "./PexelsProvider";
export * from "./PixabayProvider";
