import { categories } from "@/api/pixabay/types";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { useScreenSize } from "@/hooks/useScreenSize";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const PADDING = 16;
const GAP = 10;

const Category = ({ item, index }: { item: string; index: number }) => {
  const imageCardScale = useSharedValue(1);
  const { width } = useScreenSize();

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            index,
            [index - 1, index, index + 1],
            [0.78, imageCardScale.value, 0.78]
          ),
        },
      ],
    };
  });

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
        onPress={() => {
          // route.navigate(`/image/${item.id}`);
        }}
        onPressIn={() => {
          imageCardScale.value = withSpring(0.9, { mass: 0.5, damping: 5 });
        }}
        onPressOut={() => {
          imageCardScale.value = withSpring(1, { mass: 0.5, damping: 5 });
        }}
      >
        <ThemedText type="defaultSemiBold">{item}</ThemedText>
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
        renderItem={({ item, index }) => <Category item={item} index={index} />}
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

const styles = StyleSheet.create({});
