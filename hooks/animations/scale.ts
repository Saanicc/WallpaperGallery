import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const useScaleAnimation = () => {
  const scale = useSharedValue(1);
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  const handlePressIn = () =>
    (scale.value = withSpring(0.9, { mass: 0.5, damping: 5 }));

  const handlePressOut = () =>
    (scale.value = withSpring(1, { mass: 0.5, damping: 5 }));

  return { handlePressIn, handlePressOut, stylez };
};
