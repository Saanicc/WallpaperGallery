import { ThemedText } from "@/components/ThemedText/ThemedText";
import { colors } from "@/constants/colors";
import React from "react";
import { Linking, TouchableOpacity } from "react-native";
import { sharedStyles } from "../styles";

const Download = ({ pageURL }: { pageURL: string }) => {
  return (
    <TouchableOpacity
      style={[
        sharedStyles.infoItem,
        {
          backgroundColor: colors.button,
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
