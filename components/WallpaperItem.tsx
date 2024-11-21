import React from "react";
import { StyleSheet, View } from "react-native";
import Image from "./Image";
import ImageDetails from "./ImageDetails";

const WallpaperItem = ({ item }: { item: PixabayImage }) => {
  return (
    <View style={styles.container}>
      <Image item={item} />
      <ImageDetails item={item} />
    </View>
  );
};

export default WallpaperItem;

const styles = StyleSheet.create({
  container: {},
});
