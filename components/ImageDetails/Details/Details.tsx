import { Text } from "@/components/ui/text";
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
        <Text variant="large">Image tags</Text>
        <Text>{tags}</Text>
      </View>
      <View style={sharedStyles.infoItem}>
        <Text variant="large">Image dimensions</Text>
        <Text>
          {imageDim.width} x {imageDim.height}
        </Text>
      </View>
    </View>
  );
};

export default Details;
