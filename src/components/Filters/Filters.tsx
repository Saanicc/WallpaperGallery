import { useSettings } from "@/contexts/settings-context";
import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";
import PexelsFilters from "./PexelsFilters";
import PixabayFilters from "./PixabayFilters";

export default function Filters() {
  const { wallpaperProvider } = useSettings();

  return (
    <View className="gap-4">
      <Text variant="h3">Filters</Text>
      {wallpaperProvider === "pixabay" && <PixabayFilters />}
      {wallpaperProvider === "pexels" && <PexelsFilters />}
      {wallpaperProvider !== "pixabay" && wallpaperProvider !== "pexels" && (
        <Text className="text-muted-foreground">
          No specific filters available for {wallpaperProvider} yet.
        </Text>
      )}
    </View>
  );
}
