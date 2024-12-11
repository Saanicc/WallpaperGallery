import { BORDER_RADIUS, GAP, PADDING } from "@/helpers/constants";
import { useScaleAnimation } from "@/hooks/animations/scale";
import { useScreenSize } from "@/hooks/useScreenSize";
import { PixabayImage } from "@/types/types";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Pressable } from "react-native";
import Animated from "react-native-reanimated";

const FavoriteCard = ({ item }: { item: PixabayImage }) => {
  const route = useRouter();
  const { stylez, handlePressIn, handlePressOut } = useScaleAnimation();
  const { width } = useScreenSize();

  const handlePress = () => {
    route.navigate(`/image/${item.id}`);
  };

  return (
    <Animated.View style={[{ flex: 1 / 2 }, stylez]}>
      <ImageBackground
        source={{ uri: item.previewURL }}
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
