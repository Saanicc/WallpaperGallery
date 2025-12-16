import { useWallpaperContext } from "@/contexts/photos-context";
import useTheme from "@/hooks/useTheme";
import { PixabayImageOrder } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";

const SurpriseMeButton = () => {
  const router = useRouter();
  const theme = useTheme();
  const { provider } = useWallpaperContext();
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const randomPage = Math.floor(Math.random() * 20) + 1;
      const response = await provider.getWallpapers({
        page: randomPage,
        perPage: 10,
        order: PixabayImageOrder.POPULAR,
      });

      const wallpapers = response.wallpapers;
      if (wallpapers.length > 0) {
        const randomWallpaper =
          wallpapers[Math.floor(Math.random() * wallpapers.length)];

        router.push({
          pathname: "/image/[id]",
          params: {
            id: randomWallpaper.id,
            thumbnail: randomWallpaper.thumbnail,
            url: randomWallpaper.url,
            width: randomWallpaper.width,
            height: randomWallpaper.height,
            provider: randomWallpaper.provider,
          },
        });
      }
    } catch (error) {
      console.error("Failed to fetch random wallpaper", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 16,
        right: 16,
        zIndex: 100,
      }}
    >
      <Pressable
        onPress={handlePress}
        className="bg-primary h-14 w-14 rounded-full items-center justify-center shadow-lg active:opacity-80"
      >
        {isLoading ? (
          <ActivityIndicator color={theme.colors.background} />
        ) : (
          <Ionicons
            name="dice-outline"
            size={28}
            color={theme.colors.background}
          />
        )}
      </Pressable>
    </View>
  );
};

export default SurpriseMeButton;
