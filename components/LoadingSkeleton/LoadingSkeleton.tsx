import useTheme from "@/hooks/useTheme";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { ThemedText } from "../ThemedText/ThemedText";

const LoadingSkeleton = ({
  width,
  height,
  borderRadius,
}: {
  width?: number;
  height?: number;
  borderRadius?: number;
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        width: width || 100,
        height: height || 100,
        borderRadius: borderRadius || 8,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color={theme.colors.primary} size={50} />
      <ThemedText type="defaultSemiBold">Loading...</ThemedText>
    </View>
  );
};

export default LoadingSkeleton;
