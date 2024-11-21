import { getRandomImages } from "@/api/pixabay";
import WallpaperItem from "@/components/WallpaperItem";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Index() {
  const [images, setImages] = useState<PixabayImage[]>();

  useEffect(() => {
    getRandomImages().then((res) => setImages(res));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222222",
      }}
    >
      <FlatList
        horizontal
        pagingEnabled
        data={images}
        renderItem={({ item }) => <WallpaperItem item={item} />}
      />
    </View>
  );
}
