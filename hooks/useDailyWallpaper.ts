import { useScreenSize } from "@/hooks/useScreenSize";
import { PexelsProvider } from "@/providers/PexelsProvider";
import { PixabayProvider } from "@/providers/PixabayProvider";
import { PixabayImageOrder, Wallpaper } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const STORAGE_KEY_WALLPAPER = "daily_wallpaper";
const STORAGE_KEY_DATE = "last_fetch_date";

export const useDailyWallpaper = () => {
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { actualHeightInPixels, actualWidthInPixels } = useScreenSize();

  useEffect(() => {
    const checkAndFetchWallpaper = async () => {
      try {
        setIsLoading(true);
        const storedWallpaper = await AsyncStorage.getItem(
          STORAGE_KEY_WALLPAPER
        );
        const storedDate = await AsyncStorage.getItem(STORAGE_KEY_DATE);

        const now = new Date();
        const today12pm = new Date();
        today12pm.setHours(12, 0, 0, 0);

        let shouldFetch = false;

        if (!storedWallpaper || !storedDate) {
          shouldFetch = true;
        } else {
          const lastFetchDate = new Date(storedDate);

          if (now > today12pm) {
            if (lastFetchDate < today12pm) {
              shouldFetch = true;
            }
          }
        }

        if (shouldFetch) {
          const randomPage = Math.floor(Math.random() * 10) + 1;
          const pixabayProvider = new PixabayProvider(
            actualWidthInPixels,
            actualHeightInPixels
          );
          const pexelsProvider = new PexelsProvider();

          const [pixabayResponse, pexelsResponse] = await Promise.all([
            pixabayProvider.getWallpapers({
              page: randomPage,
              perPage: 3,
              order: PixabayImageOrder.POPULAR,
            }),
            pexelsProvider.getWallpapers({
              page: randomPage,
              perPage: 3,
            }),
          ]);

          const allWallpapers = [
            ...pixabayResponse.wallpapers,
            ...pexelsResponse.wallpapers,
          ];

          if (allWallpapers.length > 0) {
            const randomWallpaper =
              allWallpapers[Math.floor(Math.random() * allWallpapers.length)];

            await AsyncStorage.setItem(
              STORAGE_KEY_WALLPAPER,
              JSON.stringify(randomWallpaper)
            );
            await AsyncStorage.setItem(STORAGE_KEY_DATE, now.toISOString());
            setWallpaper(randomWallpaper);
          }
        } else {
          if (storedWallpaper) {
            setWallpaper(JSON.parse(storedWallpaper));
          }
        }
      } catch (error) {
        console.error("Error in useDailyWallpaper:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAndFetchWallpaper();
  }, [actualWidthInPixels, actualHeightInPixels]);

  return { wallpaper, isLoading };
};
