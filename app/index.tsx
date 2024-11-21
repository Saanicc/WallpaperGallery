import { getLatestImages, getPopularImages } from "@/api/pixabay";
import { PixabayImage, PixabayImageOrder } from "@/api/pixabay/types";
import { ThemedText } from "@/components/ThemedText";
import WallpaperItem from "@/components/WallpaperItem";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Index() {
  const [images, setImages] = useState<PixabayImage[]>();
  const [orderBy, setOrderBy] = useState<PixabayImageOrder>(
    PixabayImageOrder.Popular
  );

  useEffect(() => {
    if (orderBy === PixabayImageOrder.Latest)
      getLatestImages().then((res) => setImages(res));
    if (orderBy === PixabayImageOrder.Popular)
      getPopularImages().then((res) => setImages(res));
    else return;
  }, [orderBy]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222222",
      }}
    >
      <ThemedText
        type="title"
        onPress={() => setOrderBy(PixabayImageOrder.Latest)}
      >
        {orderBy}
      </ThemedText>

      <FlatList
        horizontal
        pagingEnabled
        data={images}
        renderItem={({ item }) => <WallpaperItem item={item} />}
      />
    </View>
  );
}
