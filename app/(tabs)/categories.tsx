import { categories, Category } from "@/api/pixabay/types";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { useWallpaperContext } from "@/contexts/photos-context";
import { capitalizeFirstChar } from "@/helpers/functions";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const PADDING = 16;
const GAP = 10;

const CategoryCard = ({ item, index }: { item: Category; index: number }) => {
  const { setSelectedCategory } = useWallpaperContext();
  const route = useRouter();

  const imageCardScale = useSharedValue(1);
  const { width } = useScreenSize();

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            index,
            [index - 1, index, index + 1],
            [0, imageCardScale.value, 0]
          ),
        },
      ],
    };
  });

  const handlePress = () => {
    setSelectedCategory(item);
    route.navigate("/");
  };

  const handlePressIn = () =>
    (imageCardScale.value = withSpring(0.9, { mass: 0.5, damping: 5 }));

  const handlePressOut = () =>
    (imageCardScale.value = withSpring(1, { mass: 0.5, damping: 5 }));

  return (
    <Animated.View style={[{ flex: 1 }, stylez]}>
      <Pressable
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "#444444",
          borderRadius: 10,
          padding: PADDING,
          height: width / 2 - (PADDING + GAP),
        }}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <ThemedText type="defaultSemiBold">
          {capitalizeFirstChar(item)}
        </ThemedText>
      </Pressable>
    </Animated.View>
  );
};

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
