import { BORDER_RADIUS, GAP, PADDING } from "@/constants/style";
import { useScaleAnimation } from "@/hooks/animations/scale";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Wallpaper } from "@/types/types";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Pressable } from "react-native";
import Animated from "react-native-reanimated";

const FavoriteCard = ({ item }: { item: Wallpaper }) => {
  const route = useRouter();
  const { stylez, handlePressIn, handlePressOut } = useScaleAnimation();
  const { width } = useScreenSize();

  const handlePress = () => {
    route.push({
      pathname: "/image/[id]",
      params: {
        id: item.id,
        thumbnail: item.thumbnail,
        url: item.url,
        width: item.width,
        height: item.height,
      },
    });
  };

  return (
    <Animated.View style={[{ flex: 1 / 2 }, stylez]}>
      <ImageBackground
        source={{ uri: item.thumbnail }}
        imageStyle={{ borderRadius: BORDER_RADIUS }}
      >
        <Pressable
          style={{
            height: width / 2 - (PADDING + GAP),
          }}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={!item.id}
        />
      </ImageBackground>
    </Animated.View>
  );
};

export default FavoriteCard;
