import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import React from "react";
import { Linking } from "react-native";

const Download = ({ pageURL }: { pageURL: string }) => {
  return (
    <Button
      size="lg"
      className="w-full my-4"
      onPress={() => Linking.openURL(pageURL)}
    >
      <Text>Download Image</Text>
    </Button>
  );
};

export default Download;
