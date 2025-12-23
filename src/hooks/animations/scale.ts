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

  const handlePressIn = () => {
    scale.value = withSpring(0.9, {
      stiffness: 900,
      damping: 90,
      mass: 4,
      overshootClamping: false,
      velocity: 0,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      stiffness: 900,
      damping: 90,
      mass: 4,
      overshootClamping: false,
      velocity: 0,
    });
  };

  return { handlePressIn, handlePressOut, stylez };
};
