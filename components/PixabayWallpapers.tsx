import { usePixabayImages } from "@/api/pixabay";
import { PixabayImage, PixabayImageOrder } from "@/api/pixabay/types";
import { useScreenSize } from "@/hooks/useScreenSize";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import BackdropPhotos from "./Backdrop/BackdropPhotos";
import Dropdown from "./Dropdown/Dropdown";
import Header from "./Header/Header";
import MenuButton from "./MenuButton/MenuButton";
import Photo from "./Photo/Photo";
import { ThemedText } from "./ThemedText/ThemedText";

const PixabayWallpapers = () => {
  const [orderBy, setOrderBy] = useState<PixabayImageOrder>(
    PixabayImageOrder.POPULAR
  );

  const { width, actualWidthInPixels, actualHeightInPixels } = useScreenSize();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePixabayImages({
      queryKey: orderBy,
      orderBy,
      minWidth: actualWidthInPixels,
      minHeight: actualHeightInPixels,
    });

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const photos = data?.pages.flatMap((page) => page.hits) || [];

  const _imageWidth = width * 0.7;
  const _imageHeight = _imageWidth * 1.76;
  const _spacing = 16;

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });

  const renderItem = useCallback(
    ({ item, index }: { item: PixabayImage; index: number }) => (
      <Photo
        item={item}
        index={index}
        width={_imageWidth}
        height={_imageHeight}
        scrollX={scrollX}
      />
    ),
    []
  );

  return (
    <>
      <BackdropPhotos photos={photos} scrollX={scrollX} isLoading={isLoading} />
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <LinearGradient
          colors={[
            "#000000",
            "#00000020",
            "#00000019",
            "#00000018",
            "#00000017",
            "#00000016",
            "#00000015",
            "#00000010",
            "#00000009",
            "#00000008",
            "#00000007",
            "#00000006",
            "#00000005",
            "transparent",
          ]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: actualHeightInPixels,
          }}
        />
        <Header>
          <MenuButton icon="menu" iconColor="#ffffff" onPress={() => {}} />
          <Dropdown
            label={orderBy}
            filterItems={[PixabayImageOrder.LATEST, PixabayImageOrder.POPULAR]}
            onDropdownSelect={setOrderBy}
          />
          <MenuButton
            icon="heart-outline"
            iconColor="#E00000"
            onPress={() => {}}
          />
        </Header>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <ActivityIndicator size={50} />
          ) : (
            <Animated.FlatList
              data={photos}
              keyExtractor={(item) => String(item.id)}
              horizontal
              style={{ flexGrow: 0, zIndex: 1 }}
              snapToInterval={_imageWidth + _spacing}
              decelerationRate={"fast"}
              contentContainerStyle={{
                gap: _spacing,
                paddingHorizontal: (width - _imageWidth) / 2,
              }}
              renderItem={renderItem}
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
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default PixabayWallpapers;
