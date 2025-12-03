import Link from "@/components/Link/Link";
import { Text } from "@/components/ui/text";
import React from "react";
import { View } from "react-native";

const Attribution = () => {
  return (
    <View className="items-center mt-4 mb-8">
      <Text className="text-muted-foreground text-sm">
        Image provided by <Link url="https://pixabay.com" linkText="Pixabay" />
      </Text>
    </View>
  );
};

export default Attribution;
