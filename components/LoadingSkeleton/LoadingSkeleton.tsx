import useTheme from "@/hooks/useTheme";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "../ui/text";

const LoadingSkeleton = ({
  width,
  height,
  borderRadius,
  size,
}: {
  width?: number;
  height?: number;
  borderRadius?: number;
  size?: "small" | "large" | number;
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        width: width || "100%",
        height: height || "100%",
        borderRadius: borderRadius || 8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color={theme.colors.primary} size={size || "small"} />
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingSkeleton;
