import Link from "@/components/Link/Link";
import { Text } from "@/components/ui/text";
import { useSettings } from "@/contexts/settings-context";
import { capitalizeFirstChar } from "@/helpers/functions";
import React from "react";
import { View } from "react-native";

const Attribution = () => {
  const { wallpaperProvider } = useSettings();

  const providerLink = () => {
    switch (wallpaperProvider) {
      case "pixabay":
        return "https://pixabay.com";
      case "pexels":
        return "https://pexels.com";
      case "unsplash":
        return "https://unsplash.com";
      default:
        return "https://pixabay.com";
    }
  };

  return (
    <View className="items-center mt-4 mb-8">
      <Text className="text-muted-foreground text-sm">
        Image provided by{" "}
        <Link
          url={providerLink()}
          linkText={capitalizeFirstChar(wallpaperProvider)}
        />
      </Text>
    </View>
  );
};

export default Attribution;
