import { GAP, PADDING } from "@/helpers/constants";
import { useScreenSize } from "@/hooks/useScreenSize";
import { PixabayImage } from "@/types/types";
import { useRouter } from "expo-router";
import React from "react";
import { Animated, ImageBackground, Pressable } from "react-native";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const FavoriteCard = ({
  item,
  index,
}: {
  item: PixabayImage;
  index: number;
}) => {
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
    route.navigate(`/image/${item.id}`);
  };

  const handlePressIn = () =>
    (imageCardScale.value = withSpring(0.9, { mass: 0.5, damping: 5 }));

  const handlePressOut = () =>
    (imageCardScale.value = withSpring(1, { mass: 0.5, damping: 5 }));

  return (
    <Animated.View style={[{ flex: 1 / 2, borderRadius: 16 }, stylez]}>
      <ImageBackground
        source={{ uri: item.previewURL }}
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
          disabled={!item.id}
        />
      </ImageBackground>
    </Animated.View>
  );
};

export default FavoriteCard;
