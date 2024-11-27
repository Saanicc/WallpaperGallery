import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BackdropPhotosProps, BackdropProps } from "./Backdrop.config";

const Backdrop = ({ photo, index, scrollX }: BackdropProps) => {
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

const BackdropPhotos = ({
  photos,
  scrollX,
  isLoading,
}: BackdropPhotosProps) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          ...(isLoading && {
            backgroundColor: "#222222",
          }),
        },
      ]}
    >
      {photos?.map((photo, index) => (
        <Backdrop
          key={photo.id}
          photo={photo}
          index={index}
          scrollX={scrollX}
        />
      ))}
    </View>
  );
};

export default BackdropPhotos;
