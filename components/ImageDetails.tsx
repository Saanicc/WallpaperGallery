import React from "react";
import { StyleSheet, View } from "react-native";
import PixabayLink from "./Link";
import { ThemedText } from "./ThemedText";

const ImageDetails = ({ item }: { item: PixabayImage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoWrapper}>
        <View style={styles.infoItem}>
          <ThemedText>Total downloads</ThemedText>
          <ThemedText>{item.downloads}</ThemedText>
        </View>
        <View style={styles.infoItem}>
          <ThemedText>Total likes</ThemedText>
          <ThemedText>{item.likes}</ThemedText>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <ThemedText style={{ marginBottom: 24 }}>
          Image uploaded to <PixabayLink /> by{" "}
          <ThemedText type="defaultSemiBold">{item.user}</ThemedText>
        </ThemedText>
      </View>
    </View>
  );
};

export default ImageDetails;

const styles = StyleSheet.create({
  container: {},
  infoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 24,
  },
  infoItem: {
    alignItems: "center",
  },
});
