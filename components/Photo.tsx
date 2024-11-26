import { PixabayImage } from "@/api/pixabay/types";
import React from "react";
import { Image, View } from "react-native";

const Photo = ({
  item,
  index,
  width,
  height,
}: {
  item: PixabayImage;
  index: number;
  width: number;
  height: number;
}) => {
  return (
    <View style={{ width, height, overflow: "hidden", borderRadius: 16 }}>
      <Image source={{ uri: item.largeImageURL }} style={{ flex: 1 }} />
    </View>
  );
};

export default Photo;
