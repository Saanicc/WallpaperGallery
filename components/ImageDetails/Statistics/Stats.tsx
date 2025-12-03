import { Text } from "@/components/ui/text";
import { GAP, PADDING } from "@/constants/style";
import React from "react";
import { StyleSheet, View } from "react-native";
import { sharedStyles } from "../styles";
import { StatisticsProps } from "./Statistics.config";

const Statistics = ({ views, downloads, likes }: StatisticsProps) => {
  return (
    <View style={styles.infoWrapper}>
      <View style={sharedStyles.infoItem}>
        <Text variant="large">Views</Text>
        <Text>{views}</Text>
      </View>
      <View style={sharedStyles.infoItem}>
        <Text variant="large">Downloads</Text>
        <Text>{downloads}</Text>
      </View>
      <View style={sharedStyles.infoItem}>
        <Text variant="large">Likes</Text>
        <Text>{likes}</Text>
      </View>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  infoWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: PADDING,
    paddingHorizontal: PADDING,
    gap: GAP,
  },
});
