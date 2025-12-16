import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSettings } from "@/contexts/settings-context";
import { capitalizeFirstChar } from "@/helpers/functions";
import useTheme from "@/hooks/useTheme";
import {
  Orientation,
  PexelsOrientation,
  PixabayOrientation,
} from "@/types/types";
import React from "react";
import { View } from "react-native";

const OrientationFilter = ({
  orientation,
  setOrientation,
}: {
  orientation: Orientation;
  setOrientation: (orientation: Orientation) => void;
}) => {
  const theme = useTheme();
  const { wallpaperProvider } = useSettings();

  const orientations =
    wallpaperProvider === "pixabay"
      ? Object.values(PixabayOrientation)
      : Object.values(PexelsOrientation);

  return (
    <View className="gap-2">
      <Text>Orientation</Text>
      <View className="flex-row gap-2 flex-wrap">
        {orientations.map((item) => (
          <Button
            key={item}
            variant={orientation === item ? "default" : "outline"}
            size="sm"
            onPress={() => setOrientation(item)}
          >
            <Text
              style={{
                color:
                  orientation === item
                    ? theme.colors.background
                    : theme.colors.text,
              }}
            >
              {capitalizeFirstChar(item)}
            </Text>
          </Button>
        ))}
      </View>
    </View>
  );
};

export default OrientationFilter;
