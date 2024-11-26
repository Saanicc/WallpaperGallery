import { PixabayImage } from "@/api/pixabay/types";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const BackdropPhoto = ({
  photo,
  index,
  scrollX,
}: {
  photo: PixabayImage;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0]
      ),
    };
  });
  return (
    <Animated.Image
      source={{ uri: photo.largeImageURL }}
      style={[StyleSheet.absoluteFillObject, stylez]}
      blurRadius={50}
    />
  );
};

export default BackdropPhoto;

const styles = StyleSheet.create({});
