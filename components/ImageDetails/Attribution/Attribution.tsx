import Link from "@/components/Link/Link";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import React from "react";
import { View } from "react-native";

const Attribution = () => {
  return (
    <View style={{ marginTop: 16, alignItems: "center" }}>
      <ThemedText style={{ marginBottom: 24 }}>
        Image provided by <Link url="https://pixabay.com" linkText="Pixabay" />
      </ThemedText>
    </View>
  );
};

export default Attribution;
