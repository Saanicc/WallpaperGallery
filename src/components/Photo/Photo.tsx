import { BORDER_RADIUS } from "@/constants/style";
import { useScaleAnimation } from "@/hooks/animations/scale";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { PhotoProps } from "./Photo.config";

const Photo = memo(
  ({ item, width, height }: PhotoProps) => {
    const route = useRouter();
    const { handlePressIn, handlePressOut, stylez } = useScaleAnimation();

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
            route.push({
              pathname: "/image/[id]",
              params: {
                id: item.id,
                thumbnail: item.thumbnail,
                url: item.url,
                width: item.width,
                height: item.height,
                provider: item.provider,
              },
            });
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Image source={{ uri: item.thumbnail }} style={{ flex: 1 }} />
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
