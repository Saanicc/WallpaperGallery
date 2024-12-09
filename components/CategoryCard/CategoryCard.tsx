import { Category } from "@/api/pixabay/types";
import { useWallpaperContext } from "@/contexts/photos-context";
import { GAP, PADDING } from "@/helpers/constants";
import { capitalizeFirstChar } from "@/helpers/functions";
import { useScreenSize } from "@/hooks/useScreenSize";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { ThemedText } from "../ThemedText/ThemedText";

const categoryImageMap: Record<Category, any> = {
  backgrounds: require(`@/assets/images/category/backgrounds.jpg`),
  fashion: require(`@/assets/images/category/fashion.jpg`),
  nature: require(`@/assets/images/category/nature.jpg`),
  science: require(`@/assets/images/category/science.jpg`),
  education: require(`@/assets/images/category/education.jpg`),
  feelings: require(`@/assets/images/category/feelings.jpg`),
  health: require(`@/assets/images/category/health.jpg`),
  people: require(`@/assets/images/category/people.jpg`),
  religion: require(`@/assets/images/category/religion.jpg`),
  places: require(`@/assets/images/category/places.jpg`),
  animals: require(`@/assets/images/category/animals.jpg`),
  industry: require(`@/assets/images/category/industry.jpg`),
  computer: require(`@/assets/images/category/computer.jpg`),
  food: require(`@/assets/images/category/food.jpg`),
  sports: require(`@/assets/images/category/sports.jpg`),
  transportation: require(`@/assets/images/category/transportation.jpg`),
  travel: require(`@/assets/images/category/travel.jpg`),
  buildings: require(`@/assets/images/category/buildings.jpg`),
  business: require(`@/assets/images/category/business.jpg`),
  music: require(`@/assets/images/category/music.jpg`),
};

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
    <Animated.View style={[{ flex: 1, borderRadius: 16 }, stylez]}>
      <ImageBackground
        source={categoryImageMap[item]}
        imageStyle={{ borderRadius: 16 }}
      >
        <Pressable
          style={{
            height: width / 2 - (PADDING + GAP),
            borderRadius: 16,
          }}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={[
              "transparent",
              "#00000020",
              "#00000040",
              "#00000080",
              "#000000DD",
            ]}
            locations={[0, 0.25, 0.5, 0.75, 1]}
            style={{
              height: "100%",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 16,
            }}
          />
          <ThemedText
            type="defaultSemiBold"
            style={{ position: "absolute", bottom: 16, left: 16 }}
          >
            {capitalizeFirstChar(item)}
          </ThemedText>
        </Pressable>
      </ImageBackground>
    </Animated.View>
  );
};

export default CategoryCard;
