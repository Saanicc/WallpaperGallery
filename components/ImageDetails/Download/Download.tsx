import { ThemedText } from "@/components/ThemedText/ThemedText";
import React from "react";
import { Linking, TouchableOpacity } from "react-native";
import { sharedStyles } from "../styles";

const Download = ({ pageURL }: { pageURL: string }) => {
  return (
    <TouchableOpacity
      style={[
        sharedStyles.infoItem,
        {
          backgroundColor: "#333333",
          marginVertical: 16,
          alignSelf: "center",
        },
      ]}
      onPress={() => Linking.openURL(pageURL)}
    >
      <ThemedText>Download image</ThemedText>
    </TouchableOpacity>
  );
};

export default Download;
