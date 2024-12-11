import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { useWallpaperContext } from "@/contexts/photos-context";
import { BORDER_RADIUS, GAP, PADDING } from "@/helpers/constants";
import { useScaleAnimation } from "@/hooks/animations/scale";
import { categories } from "@/types/types";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

const Categories = () => {
  const route = useRouter();
  const { setSelectedCategory } = useWallpaperContext();

  const { stylez, handlePressIn, handlePressOut } = useScaleAnimation();

  const handlePress = () => {
    setSelectedCategory(undefined);
    route.navigate("/");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#333333",
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: "#444444",
            borderRadius: BORDER_RADIUS,
            margin: PADDING,
          },
          stylez,
        ]}
      >
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: PADDING,
          }}
        >
          <ThemedText type="defaultSemiBold">All</ThemedText>
        </Pressable>
      </Animated.View>
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
