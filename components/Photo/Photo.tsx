import React from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PhotoProps } from "./Photo.config";

const Photo = ({ item, index, width, height, scrollX }: PhotoProps) => {
  const imageCardScale = useSharedValue(1);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [0.78, imageCardScale.value, 0.78]
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [6, 0, -6]
          )}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[{ width, height, overflow: "hidden", borderRadius: 16 }, stylez]}
    >
      <Pressable
        style={{ flex: 1 }}
        onPressIn={() => {
          imageCardScale.value = withSpring(0.9, { mass: 0.5, damping: 0.5 });
        }}
        onPressOut={() => {
          imageCardScale.value = withSpring(1, { mass: 0.5, damping: 0.5 });
        }}
      >
        <Animated.Image
          source={{ uri: item.largeImageURL }}
          style={{ flex: 1 }}
        />
      </Pressable>
    </Animated.View>
  );
};

export default Photo;
