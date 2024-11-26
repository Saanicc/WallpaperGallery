import { usePixabayImages } from "@/api/pixabay";
import { PixabayImageOrder } from "@/api/pixabay/types";
import Photo from "@/components/Photo";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import BackdropPhoto from "./BackdropPhoto";

const PixabayWallpapers = () => {
  const [orderBy, setOrderBy] = useState<PixabayImageOrder>("popular");

  const { width } = Dimensions.get("screen");
  const _imageWidth = width * 0.7;
  const _imageHeight = _imageWidth * 1.76;
  const _spacing = 16;

  const { data, isLoading } = usePixabayImages({
    queryKey: orderBy,
    orderBy,
  });

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#222222",
      }}
    >
      <View style={StyleSheet.absoluteFillObject}>
        {data?.hits.map((photo, index) => (
          <BackdropPhoto photo={photo} index={index} scrollX={scrollX} />
        ))}
      </View>
      <ThemedText
        style={{ marginVertical: 12 }}
        type="title"
        onPress={() => setOrderBy("popular")}
      >
        {orderBy}
      </ThemedText>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Animated.FlatList
            data={data?.hits}
            keyExtractor={(item) => String(item.id)}
            horizontal
            style={{ flexGrow: 0 }}
            snapToInterval={_imageWidth + _spacing}
            decelerationRate={"fast"}
            contentContainerStyle={{
              gap: _spacing,
              paddingHorizontal: (width - _imageWidth) / 2,
            }}
            renderItem={({ item, index }) => (
              <Photo
                item={item}
                index={index}
                width={_imageWidth}
                height={_imageHeight}
                scrollX={scrollX}
              />
            )}
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={1000 / 60}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PixabayWallpapers;
