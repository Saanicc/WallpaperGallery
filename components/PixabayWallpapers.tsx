import { usePixabayImages } from "@/api/pixabay";
import { PixabayImageOrder } from "@/api/pixabay/types";
import Photo from "@/components/Photo";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PixabayWallpapers = () => {
  const [orderBy, setOrderBy] = useState<PixabayImageOrder>("popular");

  const { data, isLoading } = usePixabayImages({
    queryKey: orderBy,
    orderBy,
  });

  const { width } = Dimensions.get("screen");
  const _imageWidth = width * 0.7;
  const _imageHeight = _imageWidth * 1.76;
  const _spacing = 16;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#222222",
      }}
    >
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
          <FlatList
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
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PixabayWallpapers;
