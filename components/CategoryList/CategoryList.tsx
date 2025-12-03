import { capitalizeFirstChar } from "@/helpers/functions";
import {
  categories,
  Category,
  categoryImageMap,
  PixabayImageOrder,
} from "@/types/types";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, ImageBackground, Pressable } from "react-native";
import { Card, CardContent } from "../ui/card";
import { Text } from "../ui/text";

const CategoryList = () => {
  const router = useRouter();

  const navigateToWallpapers = (
    orderBy: PixabayImageOrder,
    category?: Category
  ) => {
    router.push({
      pathname: "/wallpapers/list",
      params: { orderBy: orderBy, category: category },
    });
  };

  const Category = ({ item }: { item: Category }) => (
    <Card className="h-12 p-0">
      <ImageBackground
        source={categoryImageMap[item]}
        imageClassName="rounded-xl w-full h-full"
      >
        <Pressable
          onPress={() => navigateToWallpapers(PixabayImageOrder.LATEST, item)}
          className="h-full flex-row items-center justify-between px-8 py-4"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <Text variant="small">{capitalizeFirstChar(item)}</Text>
        </Pressable>
      </ImageBackground>
    </Card>
  );

  return (
    <Card className="p-2">
      <CardContent className="p-0 gap-2">
        <Text variant="large">Categories</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => categories[index]}
          contentContainerClassName="gap-2"
          renderItem={({ item }) => <Category item={item} />}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryList;
