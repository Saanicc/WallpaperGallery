import { BORDER_RADIUS } from "@/helpers/constants";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PhotoProps } from "./Photo.config";

const Photo = memo(
  ({ item, index, width, height, scrollX }: PhotoProps) => {
    const route = useRouter();
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
        style={[
          { width, height, overflow: "hidden", borderRadius: BORDER_RADIUS },
          stylez,
        ]}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            route.navigate(`/image/${item.id}`);
          }}
          onPressIn={() => {
            imageCardScale.value = withSpring(0.9, { mass: 0.5, damping: 5 });
          }}
          onPressOut={() => {
            imageCardScale.value = withSpring(1, { mass: 0.5, damping: 5 });
          }}
        >
          <Animated.Image
            source={{ uri: item.webformatURL }}
            style={{ flex: 1 }}
          />
        </Pressable>
      </Animated.View>
    );
  },
  (prev, next) =>
    prev.item === next.item &&
    prev.index === next.index &&
    prev.width === next.width &&
    prev.height === next.height &&
    prev.scrollX === next.scrollX
);

export default Photo;
