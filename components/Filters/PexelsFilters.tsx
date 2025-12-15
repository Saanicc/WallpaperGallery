import { useFilterContext } from "@/contexts/filter-context";
import { capitalizeFirstChar } from "@/helpers/functions";
import useTheme from "@/hooks/useTheme";
import { PexelsImageSizes } from "@/types/types";
import { InfoIcon } from "lucide-react-native";
import React from "react";
import { ScrollView, View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import ColorsFilter from "./shared/Colors";
import OrientationFilter from "./shared/Orientation";

export default function PexelsFilters() {
  const {
    selectedOrientation,
    setSelectedOrientation,
    color,
    setColor,
    selectedSize,
    setSelectedSize,
  } = useFilterContext();
  const theme = useTheme();

  return (
    <View className="gap-4">
      <OrientationFilter
        orientation={selectedOrientation}
        setOrientation={setSelectedOrientation}
      />
      <ColorsFilter color={color} setColor={setColor} />

      <View className="gap-2">
        <View className="flex-row items-center gap-2">
          <Text>Minimum image size</Text>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon size={16} color={theme.colors.text} />
            </TooltipTrigger>
            <TooltipContent
              className="border border-border bg-background p-4"
              align="end"
            >
              <View className="gap-3">
                <Text className="font-semibold text-foreground">
                  Image Size Guide
                </Text>
                <View className="gap-2">
                  <View className="flex-row items-center justify-between gap-4">
                    <Text className="text-foreground">Small</Text>
                    <Text className="text-muted-foreground">4 MP</Text>
                  </View>
                  <View className="flex-row items-center justify-between gap-4">
                    <Text className="text-foreground">Medium</Text>
                    <Text className="text-muted-foreground">12 MP</Text>
                  </View>
                  <View className="flex-row items-center justify-between gap-4">
                    <Text className="text-foreground">Large</Text>
                    <Text className="text-muted-foreground">24 MP</Text>
                  </View>
                </View>
              </View>
            </TooltipContent>
          </Tooltip>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            <Button
              variant={selectedSize === "" ? "default" : "outline"}
              size="sm"
              onPress={() => setSelectedSize("")}
            >
              <Text
                style={{
                  color:
                    selectedSize === ""
                      ? theme.colors.background
                      : theme.colors.text,
                }}
              >
                All
              </Text>
            </Button>
            {PexelsImageSizes.map((size) => (
              <Button
                key={size}
                variant={size === selectedSize ? "default" : "outline"}
                size="sm"
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={{
                    color:
                      size === selectedSize
                        ? theme.colors.background
                        : theme.colors.text,
                  }}
                >
                  {capitalizeFirstChar(size.toLowerCase())}
                </Text>
              </Button>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
