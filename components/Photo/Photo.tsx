import { BORDER_RADIUS } from "@/constants/style";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PhotoProps } from "./Photo.config";

const Photo = memo(
  ({ item, width, height }: PhotoProps) => {
    const route = useRouter();
    const imageCardScale = useSharedValue(1);

    const stylez = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: imageCardScale.value,
          },
        ],
      };
    });

    return (
      <Animated.View
        style={[
          {
            width: width ?? "100%",
            height: height ?? "100%",
            overflow: "hidden",
            borderRadius: BORDER_RADIUS,
          },
          stylez,
        ]}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            route.navigate(`/image/${item.id}`);
          }}
          onPressIn={() => {
            imageCardScale.value = withSpring(0.95, {
              stiffness: 900,
              damping: 90,
              mass: 4,
              overshootClamping: false,
              velocity: 0,
            });
          }}
          onPressOut={() => {
            imageCardScale.value = withSpring(1, {
              stiffness: 900,
              damping: 90,
              mass: 4,
              overshootClamping: false,
              velocity: 0,
            });
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
    prev.item.id === next.item.id &&
    prev.width === next.width &&
    prev.height === next.height
);

export default Photo;
