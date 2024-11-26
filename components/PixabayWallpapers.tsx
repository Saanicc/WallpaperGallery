import { usePixabayImages } from "@/api/pixabay";
import { PixabayImageOrder } from "@/api/pixabay/types";
import { useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import BackdropPhoto from "./BackdropPhoto";
import Dropdown from "./Dropdown";
import Photo from "./Photo";
import { ThemedText } from "./ThemedText";

const PixabayWallpapers = () => {
  const [orderBy, setOrderBy] = useState<PixabayImageOrder>(
    PixabayImageOrder.POPULAR
  );

  const { width } = Dimensions.get("screen");
  const _imageWidth = width * 0.7;
  const _imageHeight = _imageWidth * 1.76;
  const _spacing = 16;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePixabayImages({
      queryKey: orderBy,
      orderBy,
    });

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const photos = data?.pages.flatMap((page) => page.hits) || [];

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });

  return (
    <>
      <View style={StyleSheet.absoluteFillObject}>
        {photos?.map((photo, index) => (
          <BackdropPhoto
            key={photo.id}
            photo={photo}
            index={index}
            scrollX={scrollX}
          />
        ))}
      </View>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Dropdown
          label={orderBy}
          filterItems={[PixabayImageOrder.LATEST, PixabayImageOrder.POPULAR]}
          onDropdownSelect={setOrderBy}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Animated.FlatList
              data={photos}
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
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={1000 / 60}
              ListFooterComponent={
                isFetchingNextPage ? (
                  <View
                    style={{
                      width: _imageWidth,
                      height: _imageHeight,
                      borderRadius: _spacing,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator color="#ffffff" size={50} />
                    <ThemedText type="defaultSemiBold">Loading...</ThemedText>
                  </View>
                ) : null
              }
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default PixabayWallpapers;
