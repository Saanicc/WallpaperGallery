import { PixabayImage, PixabayImageOrder } from "@/api/pixabay/types";
import { useWallpaperContext } from "@/contexts/photos-context";
import { useScreenSize } from "@/hooks/useScreenSize";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useRef } from "react";
import { FlatList, StatusBar, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import BackdropPhotos from "./Backdrop/BackdropPhotos";
import LoadingSkeleton from "./LoadingSkeleton/LoadingSkeleton";
import Photo from "./Photo/Photo";
import Pills from "./Pill/Pills";
import { ThemedText } from "./ThemedText/ThemedText";

const Wallpapers = () => {
  const {
    allWallpapers,
    loading,
    isLoadingMore,
    orderBy,
    selectedCategory,
    loadMore,
    setOrderBy,
  } = useWallpaperContext();

  const { width } = useScreenSize();

  const flatListRef = useRef<FlatList<any>>(null);

  const _imageWidth = width * 0.7;
  const _imageHeight = _imageWidth * 1.76;
  const _spacing = 16;

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });

  useEffect(() => {
    scrollX.value = 0;
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [orderBy, selectedCategory]);

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
      <StatusBar barStyle="light-content" backgroundColor={"#00000000"} />
      <BackdropPhotos
        photos={allWallpapers}
        scrollX={scrollX}
        isLoading={loading}
      />
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LinearGradient
          colors={[
            "#000000",
            "#00000080",
            "#00000040",
            "#00000020",
            "transparent",
          ]}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "25%",
          }}
        />
        <View
          style={{
            flex: 0.25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!!selectedCategory && (
            <ThemedText type="title" style={{ marginBottom: 16 }}>
              {selectedCategory.toUpperCase()}
            </ThemedText>
          )}
          <Pills
            selectedPill={orderBy}
            items={[PixabayImageOrder.POPULAR, PixabayImageOrder.LATEST]}
            onPillSelect={setOrderBy}
          />
        </View>
        {loading ? (
          <View style={{ flex: 1 }}>
            <LoadingSkeleton
              width={_imageWidth}
              height={_imageHeight}
              borderRadius={_spacing}
            />
          </View>
        ) : (
          <Animated.FlatList
            ref={flatListRef}
            data={allWallpapers}
            keyExtractor={(item) => String(item.id)}
            horizontal
            style={{ flex: 1, zIndex: 1 }}
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
              isLoadingMore ? (
                <LoadingSkeleton
                  width={_imageWidth}
                  height={_imageHeight}
                  borderRadius={_spacing}
                />
              ) : null
            }
          />
        )}
        <LinearGradient
          colors={[
            "transparent",
            "#00000020",
            "#00000040",
            "#00000080",
            "#000000",
          ]}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "25%",
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default Wallpapers;
