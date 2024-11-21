import React from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Image = ({ item }: { item: PixabayImage }) => {
  const { width } = useWindowDimensions();

  const verticalImagePadding = useSharedValue(128);
  const horizontalImagePadding = useSharedValue(64);
  const borderRadius = useSharedValue(16);

  const showImageFullscreen = () => {
    verticalImagePadding.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    });
    horizontalImagePadding.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    });
    borderRadius.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    });
  };

  const returnImageToNormalSize = () => {
    verticalImagePadding.value = withSpring(128);
    horizontalImagePadding.value = withSpring(64);
    borderRadius.value = withSpring(16);
  };
  return (
    <Animated.View
      style={{
        flex: 1,
        width: width,
        paddingVertical: verticalImagePadding,
        paddingHorizontal: horizontalImagePadding,
      }}
    >
      <Pressable
        onLongPress={showImageFullscreen}
        onPressOut={returnImageToNormalSize}
        style={{
          flex: 1,
        }}
      >
        <Animated.Image
          source={{
            uri: item.largeImageURL,
            width: item.imageWidth,
            height: item.imageHeight,
          }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius,
            resizeMode: "cover",
          }}
        />
      </Pressable>
    </Animated.View>
  );
};

export default Image;

const styles = StyleSheet.create({});
