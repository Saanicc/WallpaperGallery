import { Category, ColorType, Orientation } from "@/types/types";
import React from "react";
import { View } from "react-native";
import CategoriesFilter from "./shared/Categories";
import ColorsFilter from "./shared/Colors";
import OrientationFilter from "./shared/Orientation";

interface PexelsFiltersProps {
  orientation: Orientation;
  setOrientation: (orientation: Orientation) => void;
  category: Category | "";
  setCategory: (category: Category | "") => void;
  color: ColorType | "";
  setColor: (color: ColorType | "") => void;
}

export default function PexelsFilters({
  orientation,
  setOrientation,
  category,
  setCategory,
  color,
  setColor,
}: PexelsFiltersProps) {
  return (
    <View className="gap-4">
      <OrientationFilter
        orientation={orientation}
        setOrientation={setOrientation}
      />
      <CategoriesFilter category={category} setCategory={setCategory} />
      <ColorsFilter color={color} setColor={setColor} />
    </View>
  );
}
