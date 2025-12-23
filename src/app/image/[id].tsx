import DetailedImage from "@/screens/DetailedImage";
import { WallpaperProvider } from "@/types/types";
import { useLocalSearchParams } from "expo-router";

export type ImageParams = {
  id: string;
  provider: WallpaperProvider;
  thumbnail?: string;
  url?: string;
  width?: string;
  height?: string;
};

export default function DetailedImageScreen() {
  const { id, thumbnail, url, width, height, provider } =
    useLocalSearchParams<ImageParams>();

  return (
    <DetailedImage
      id={id}
      thumbnail={thumbnail}
      url={url}
      width={width}
      height={height}
      provider={provider}
    />
  );
}
