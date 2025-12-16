import Link from "@/components/Link/Link";
import { Text } from "@/components/ui/text";
import { capitalizeFirstChar } from "@/helpers/functions";
import { WallpaperProvider } from "@/types/types";
import React from "react";
import { View } from "react-native";

const Attribution = ({ provider }: { provider: WallpaperProvider }) => {
  const providerLink = () => {
    switch (provider) {
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
        <Link url={providerLink()} linkText={capitalizeFirstChar(provider)} />
      </Text>
    </View>
  );
};

export default Attribution;
