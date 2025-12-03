import { BORDER_RADIUS, GAP, PADDING } from "@/constants/style";
import { capitalizeFirstChar } from "@/helpers/functions";
import { useScaleAnimation } from "@/hooks/animations/scale";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Category, PixabayImageOrder } from "@/types/types";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Pressable } from "react-native";
import Animated from "react-native-reanimated";
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

const CategoryCard = ({ item }: { item: Category }) => {
  const router = useRouter();
  const { stylez, handlePressIn, handlePressOut } = useScaleAnimation();

  const { width } = useScreenSize();

  const handlePress = () => {
    router.push({
      pathname: "/wallpapers/list",
      params: { orderBy: PixabayImageOrder.LATEST, category: item },
    });
  };

  return (
    <Animated.View style={[{ flex: 1 }, stylez]}>
      <ImageBackground
        source={categoryImageMap[item]}
        imageStyle={{ borderRadius: BORDER_RADIUS }}
      >
        <Pressable
          style={{
            height: width / 2 - (PADDING + GAP),
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
              borderRadius: BORDER_RADIUS,
            }}
          />
          <ThemedText
            type="defaultSemiBold"
            style={{ position: "absolute", bottom: PADDING, left: PADDING }}
          >
            {capitalizeFirstChar(item)}
          </ThemedText>
        </Pressable>
      </ImageBackground>
    </Animated.View>
  );
};

export default CategoryCard;
