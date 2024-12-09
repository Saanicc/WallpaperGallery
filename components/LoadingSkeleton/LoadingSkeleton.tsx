import React from "react";
import { ActivityIndicator, View } from "react-native";
import { ThemedText } from "../ThemedText/ThemedText";

const LoadingSkeleton = ({
  width,
  height,
  borderRadius,
}: {
  width: number;
  height: number;
  borderRadius: number;
}) => {
  return (
    <View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color="#ffffff" size={50} />
      <ThemedText type="defaultSemiBold">Loading...</ThemedText>
    </View>
  );
};

export default LoadingSkeleton;
