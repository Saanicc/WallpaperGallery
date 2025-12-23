import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSettings } from "@/contexts/settings-context";
import { capitalizeFirstChar } from "@/helpers/functions";
import useTheme from "@/hooks/useTheme";
import { ColorType, PexelsColor, PixabayColor } from "@/types/types";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";

const ColorsFilter = ({
  color,
  setColor,
}: {
  color: ColorType | "";
  setColor: (color: ColorType | "") => void;
}) => {
  const theme = useTheme();
  const { wallpaperProvider } = useSettings();

  const colors = useMemo(() => {
    return wallpaperProvider === "pixabay"
      ? Object.values(PixabayColor)
      : Object.values(PexelsColor);
  }, [wallpaperProvider]);

  return (
    <View className="gap-2">
      <Text>Colors</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          <Button
            variant={color === "" ? "default" : "outline"}
            size="sm"
            onPress={() => setColor("")}
          >
            <Text
              style={{
                color:
                  color === "" ? theme.colors.background : theme.colors.text,
              }}
            >
              All
            </Text>
          </Button>
          {colors.map((item) => (
            <Button
              key={item}
              variant={color === item ? "default" : "outline"}
              size="sm"
              onPress={() => setColor(item as ColorType | "")}
            >
              <Text
                style={{
                  color:
                    color === item
                      ? theme.colors.background
                      : theme.colors.text,
                }}
              >
                {capitalizeFirstChar(item)}
              </Text>
            </Button>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ColorsFilter;
