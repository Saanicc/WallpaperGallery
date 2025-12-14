import { capitalizeFirstChar } from "@/helpers/functions";
import useTheme from "@/hooks/useTheme";
import {
  categories,
  Category,
  categoryImageMap,
  PixabayImageOrder,
} from "@/types/types";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { FlatList, ImageBackground, Pressable } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Text } from "../ui/text";

const CategoryList = () => {
  const router = useRouter();
  const theme = useTheme();

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
    <Card className="h-14 p-0">
      <ImageBackground
        source={categoryImageMap[item]}
        imageClassName="rounded-xl w-full h-full"
      >
        <Pressable
          onPress={() => navigateToWallpapers(PixabayImageOrder.LATEST, item)}
          className="h-full flex-row items-center justify-between px-4 rounded-xl"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <Text
            className="text-sm"
            style={{
              color: "#FFFFFF",
            }}
          >
            {capitalizeFirstChar(item)}
          </Text>
        </Pressable>
      </ImageBackground>
    </Card>
  );

  return (
    <Card className="p-4 dark:bg-input/30 bg-background gap-4">
      <Pressable onPress={() => router.push("/categories")}>
        <CardHeader className="flex-row items-center justify-between p-0">
          <CardTitle className="p-0">
            <Text variant="large">Categories</Text>
          </CardTitle>
          <ChevronRight size={24} color={theme.colors.text} />
        </CardHeader>
      </Pressable>
      <CardContent className="p-0">
        <FlatList
          data={categories.slice(0, 10)}
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
