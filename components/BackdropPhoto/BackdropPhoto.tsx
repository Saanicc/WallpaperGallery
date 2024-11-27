import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BackdropPhotoProps } from "./BackdropPhoto.config";

const BackdropPhoto = ({ photo, index, scrollX }: BackdropPhotoProps) => {
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
      source={{ uri: photo.previewURL }}
      style={[StyleSheet.absoluteFillObject, stylez]}
      blurRadius={5}
    />
  );
};

export default BackdropPhoto;
