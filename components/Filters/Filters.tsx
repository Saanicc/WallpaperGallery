import { useSettings } from "@/contexts/settings-context";
import {
  Category,
  ColorType,
  Orientation,
  PixabayImageOrder,
} from "@/types/types";
import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";
import PexelsFilters from "./PexelsFilters";
import PixabayFilters from "./PixabayFilters";

interface FiltersProps {
  order: PixabayImageOrder;
  setOrder: (order: PixabayImageOrder) => void;
  orientation: Orientation;
  setOrientation: (orientation: Orientation) => void;
  category: Category | "";
  setCategory: (category: Category | "") => void;
  color: ColorType | "";
  setColor: (color: ColorType | "") => void;
  editorsChoice: boolean;
  setEditorsChoice: (editorsChoice: boolean) => void;
}

export default function Filters({
  order,
  setOrder,
  orientation,
  setOrientation,
  category,
  setCategory,
  color,
  setColor,
  editorsChoice,
  setEditorsChoice,
}: FiltersProps) {
  const { wallpaperProvider } = useSettings();

  return (
    <View className="gap-4">
      <Text variant="h3">Filters</Text>
      {wallpaperProvider === "pixabay" && (
        <PixabayFilters
          order={order}
          setOrder={setOrder}
          orientation={orientation}
          setOrientation={setOrientation}
          category={category}
          setCategory={setCategory}
          color={color}
          setColor={setColor}
          editorsChoice={editorsChoice}
          setEditorsChoice={setEditorsChoice}
        />
      )}

      {wallpaperProvider === "pexels" && (
        <PexelsFilters
          orientation={orientation}
          setOrientation={setOrientation}
          category={category}
          setCategory={setCategory}
          color={color}
          setColor={setColor}
        />
      )}

      {wallpaperProvider !== "pixabay" && wallpaperProvider !== "pexels" && (
        <Text className="text-muted-foreground">
          No specific filters available for {wallpaperProvider} yet.
        </Text>
      )}
    </View>
  );
}
