import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useWallpaperContext } from "@/contexts/photos-context";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ColorValue, ImageBackground, View } from "react-native";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import { Card } from "../ui/card";

const WallpaperOfTheDay = () => {
  const router = useRouter();
  const theme = useTheme();
  const { getWallpapers } = useWallpaperContext();

  const { data, isLoading } = getWallpapers({
    perPage: 3,
  });

  const wallpaper = data?.pages[0]?.wallpapers[0];

  if (isLoading) {
    return (
      <Card className="h-64 w-full rounded-lg overflow-hidden p-0 items-center justify-center">
        <LoadingSkeleton />
      </Card>
    );
  }

  if (!wallpaper) return null;

  const handlePress = () => {
    router.push({
      pathname: "/image/[id]",
      params: {
        id: wallpaper.id,
        thumbnail: wallpaper.thumbnail,
        url: wallpaper.url,
        width: wallpaper.width,
        height: wallpaper.height,
        provider: wallpaper.provider,
      },
    });
  };

  const gradientColors: readonly [ColorValue, ColorValue, ...ColorValue[]] =
    theme.dark
      ? [
          "transparent",
          "rgba(0,0,0,0.4)",
          "rgba(0,0,0,0.5)",
          "rgba(0,0,0,0.7)",
          "rgba(0,0,0,0.9)",
        ]
      : [
          "transparent",
          "rgba(255,255,255,0.4)",
          "rgba(255,255,255,0.5)",
          "rgba(255,255,255,0.7)",
          "rgba(255,255,255,0.9)",
        ];

  return (
    <Card className="h-64 w-full rounded-lg overflow-hidden p-0">
      <ImageBackground
        source={{ uri: wallpaper.thumbnail }}
        className="flex-1 justify-end"
        resizeMode="cover"
      >
        <LinearGradient colors={gradientColors}>
          <View className="gap-0 p-4">
            <View className="bg-primary/80 self-start px-2 py-[2px] rounded-sm">
              <Text className="text-xs font-bold text-background uppercase">
                Wallpaper of the Day
              </Text>
            </View>
            <Text variant="h3" className="w-2/3">
              Captured by {wallpaper.photographer}
            </Text>
            <Button variant="default" onPress={handlePress} className="mt-2">
              <Text>View Wallpaper</Text>
            </Button>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Card>
  );
};

export default WallpaperOfTheDay;
