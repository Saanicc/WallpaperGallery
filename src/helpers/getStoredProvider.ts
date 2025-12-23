import { useScreenSize } from "@/hooks/useScreenSize";
import { getProvider } from "@/providers";
import { IWallpaperProvider, WallpaperProvider } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type StoredProvider = {
  wallpaperProvider: WallpaperProvider;
  provider: IWallpaperProvider;
};

export const getStoredProvider = async (): Promise<StoredProvider> => {
  const settings = {
    wallpaperProvider: "pixabay",
  } as { wallpaperProvider: WallpaperProvider };

  try {
    const storedProvider = await AsyncStorage.getItem(
      "settings.wallpaperProvider"
    );

    if (storedProvider)
      settings.wallpaperProvider = storedProvider as WallpaperProvider;
  } catch (error) {
    console.error("Failed to load settings:", error);
  }

  const { actualWidthInPixels, actualHeightInPixels } = useScreenSize();

  const provider = getProvider(
    settings.wallpaperProvider,
    actualWidthInPixels,
    actualHeightInPixels
  );

  return { ...settings, provider };
};
