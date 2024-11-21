import { getRandomImages } from "@/api/pixabay";
import { useEffect, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";

export default function Index() {
  const [images, setImages] = useState<PixabayImage[]>();
  const { width, height } = useWindowDimensions();

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
        data={images}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              width: width,
              padding: 48,
              justifyContent: "center",
            }}
          >
            <Animated.Image
              source={{
                uri: item.largeImageURL,
              }}
              style={{
                width: "100%",
                height: height / 1.6,
                borderRadius: 16,
                resizeMode: "cover",
              }}
            />
          </View>
        )}
        horizontal
        pagingEnabled
      />
    </View>
  );
}
