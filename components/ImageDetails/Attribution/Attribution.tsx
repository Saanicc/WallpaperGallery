import Link from "@/components/Link/Link";
import { Text } from "@/components/ui/text";
import React from "react";
import { View } from "react-native";

const Attribution = () => {
  return (
    <View style={{ marginTop: 16, alignItems: "center" }}>
      <Text style={{ marginBottom: 24 }}>
        Image provided by <Link url="https://pixabay.com" linkText="Pixabay" />
      </Text>
    </View>
  );
};

export default Attribution;
