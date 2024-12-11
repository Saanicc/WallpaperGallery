import { ThemedText } from "@/components/ThemedText/ThemedText";
import React from "react";
import { StyleSheet, View } from "react-native";
import { sharedStyles } from "../styles";
import { StatisticsProps } from "./Statistics.config";

const Statistics = ({ views, downloads, likes }: StatisticsProps) => {
  return (
    <View style={styles.infoWrapper}>
      <View style={sharedStyles.infoItem}>
        <ThemedText type="defaultSemiBold">Views</ThemedText>
        <ThemedText>{views}</ThemedText>
      </View>
      <View style={sharedStyles.infoItem}>
        <ThemedText type="defaultSemiBold">Downloads</ThemedText>
        <ThemedText>{downloads}</ThemedText>
      </View>
      <View style={sharedStyles.infoItem}>
        <ThemedText type="defaultSemiBold">Likes</ThemedText>
        <ThemedText>{likes}</ThemedText>
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
    marginVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
});
