import { useFilterContext } from "@/contexts/filter-context";
import React from "react";
import { View } from "react-native";
import CategoriesFilter from "./shared/Categories";
import ColorsFilter from "./shared/Colors";
import OrientationFilter from "./shared/Orientation";

export default function PexelsFilters() {
  const {
    selectedOrientation,
    setSelectedOrientation,
    category,
    setCategory,
    color,
    setColor,
  } = useFilterContext();

  return (
    <View className="gap-4">
      <OrientationFilter
        orientation={selectedOrientation}
        setOrientation={setSelectedOrientation}
      />
      <CategoriesFilter category={category} setCategory={setCategory} />
      <ColorsFilter color={color} setColor={setColor} />
    </View>
  );
}
