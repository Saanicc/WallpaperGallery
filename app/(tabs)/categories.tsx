import { categories } from "@/api/pixabay/types";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { GAP, PADDING } from "@/helpers/constants";
import React from "react";
import { FlatList, View } from "react-native";

const Categories = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#333333",
      }}
    >
      <FlatList
        data={categories}
        keyExtractor={(_, index) => categories[index]}
        renderItem={({ item, index }) => (
          <CategoryCard item={item} index={index} />
        )}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{
          padding: PADDING,
          gap: GAP,
        }}
      />
    </View>
  );
};

export default Categories;
