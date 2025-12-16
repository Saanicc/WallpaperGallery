import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { GAP, PADDING } from "@/constants/style";
import useTheme from "@/hooks/useTheme";
import { categories } from "@/types/types";
import { Stack } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

const Categories = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Categories",
          headerTintColor: theme.colors.text,
          headerStyle: { backgroundColor: theme.colors.background },
          animation: "slide_from_right",
        }}
      />
      <FlatList
        data={categories}
        keyExtractor={(_, index) => categories[index]}
        renderItem={({ item }) => <CategoryCard item={item} />}
        numColumns={2}
        columnWrapperStyle={{ gap: GAP }}
        contentContainerStyle={{
          padding: PADDING,
          paddingTop: 0,
          gap: GAP,
        }}
      />
    </View>
  );
};

export default Categories;
