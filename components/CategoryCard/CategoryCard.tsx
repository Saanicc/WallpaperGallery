import { BORDER_RADIUS, GAP, PADDING } from "@/constants/style";
import { capitalizeFirstChar } from "@/helpers/functions";
import { useScaleAnimation } from "@/hooks/animations/scale";
import { useScreenSize } from "@/hooks/useScreenSize";
import { NAV_THEME } from "@/lib/theme";
import { Category, categoryImageMap, PixabayImageOrder } from "@/types/types";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { Text } from "../ui/text";

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
          <Text
            style={{
              position: "absolute",
              bottom: PADDING,
              left: PADDING,
              color: NAV_THEME.dark.colors.text,
            }}
          >
            {capitalizeFirstChar(item)}
          </Text>
        </Pressable>
      </ImageBackground>
    </Animated.View>
  );
};

export default CategoryCard;
