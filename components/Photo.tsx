import { PixabayImage } from "@/api/pixabay/types";
import React from "react";
import { Image } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const Photo = ({
  item,
  index,
  width,
  height,
  scrollX,
}: {
  item: PixabayImage;
  index: number;
  width: number;
  height: number;
  scrollX: SharedValue<number>;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [0.8, 1, 0.8]
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [10, 1, -10]
          )}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[{ width, height, overflow: "hidden", borderRadius: 16 }, stylez]}
    >
      <Image source={{ uri: item.largeImageURL }} style={{ flex: 1 }} />
    </Animated.View>
  );
};

export default Photo;
