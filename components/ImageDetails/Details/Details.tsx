import { ThemedText } from "@/components/ThemedText/ThemedText";
import React from "react";
import { View } from "react-native";
import { sharedStyles } from "../styles";
import { DetailsProps } from "./Details.config";

const Details = ({ tags, imageDim }: DetailsProps) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={sharedStyles.infoItem}>
        <ThemedText type="defaultSemiBold">Image tags</ThemedText>
        <ThemedText>{tags}</ThemedText>
      </View>
      <View style={sharedStyles.infoItem}>
        <ThemedText type="defaultSemiBold">Image dimensions</ThemedText>
        <ThemedText>
          {imageDim.width} x {imageDim.height}
        </ThemedText>
      </View>
    </View>
  );
};

export default Details;
