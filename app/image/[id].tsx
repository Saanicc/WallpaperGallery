import Header from "@/components/Header/Header";
import ImageDetails from "@/components/ImageDetails";
import MenuButton from "@/components/MenuButton/MenuButton";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { useFavoriteContext } from "@/contexts/favorite-context";
import { useWallpaperContext } from "@/contexts/photos-context";
import { useScreenSize } from "@/hooks/useScreenSize";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ImageDimensions = {
  width: number;
  height: number;
  aspectRatio: number;
};

export default function DetailedImage() {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getWallpaper } = useWallpaperContext();
  const { addToFavorites, isWallpaperFavorited } = useFavoriteContext();

  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
    aspectRatio: 0,
  });

  const { width: screenWidth } = useScreenSize();

  const { data } = getWallpaper(id);

  const wallpaper = data?.hits[0];

  const scrollViewRef = useRef<ScrollView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const _headerHeight = Platform.OS === "ios" ? 140 : 100;
  const headerShadowHeight = useSharedValue(_headerHeight);
  const opacity = useSharedValue(1);

  const ANIMATION_DURATION = 500;

  const handleLongPress = () => {
    headerShadowHeight.value = withTiming(0, { duration: ANIMATION_DURATION });
    opacity.value = withTiming(0, { duration: ANIMATION_DURATION });
    bottomSheetRef.current?.close({ duration: ANIMATION_DURATION });
  };

  const handlePressOut = () => {
    headerShadowHeight.value = withTiming(_headerHeight, {
      duration: ANIMATION_DURATION,
    });
    opacity.value = withTiming(1, { duration: ANIMATION_DURATION });
    bottomSheetRef.current?.snapToIndex(0, { duration: ANIMATION_DURATION });
  };

  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);

  const getAspectRatio = useCallback((imageUri: string) => {
    return new Promise<ImageDimensions>((resolve, reject) => {
      Image.getSize(
        imageUri,
        (width, height) => {
          resolve({
            width,
            height,
            aspectRatio: width / height,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }, []);

  useEffect(() => {
    if (!wallpaper) return;

    const imageUri = wallpaper?.largeImageURL;
    getAspectRatio(imageUri)
      .then((imageDim) => {
        setImageDimensions(imageDim);
      })
      .catch((error) => {
        console.error("Error fetching image dimensions:", error);
      });
  }, [wallpaper?.largeImageURL]);

  const centerContent = (width: number, height: number) => {
    const offsetX = (width - screenWidth) / 2;
    scrollViewRef.current?.scrollTo({ x: offsetX, animated: false });
  };

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      {imageDimensions.width >= screenWidth && (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          style={StyleSheet.absoluteFillObject}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          onContentSizeChange={(w, h) => centerContent(w, h)}
        >
          <Pressable
            onLongPress={handleLongPress}
            onPressOut={handlePressOut}
            style={{
              flex: 1,
              aspectRatio: imageDimensions.aspectRatio,
            }}
          >
            <Image
              defaultSource={{ uri: wallpaper?.previewURL }}
              source={{ uri: wallpaper?.largeImageURL }}
              style={{
                width: undefined,
                height: "100%",
                aspectRatio: imageDimensions.aspectRatio,
              }}
              resizeMode="cover"
            />
          </Pressable>
        </ScrollView>
      )}
      <AnimatedLinearGradient
        colors={["#000000", "transparent"]}
        style={{
          height: headerShadowHeight,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      />

      <Animated.View style={{ opacity, top }}>
        <Header
          leftComponent={
            <MenuButton icon="arrow-back" onPress={() => navigation.goBack()} />
          }
          rightComponent={
            <MenuButton
              icon={isWallpaperFavorited(id) ? "heart" : "heart-outline"}
              onPress={() => wallpaper && addToFavorites(wallpaper)}
            />
          }
        />
      </Animated.View>

      <BottomSheet
        ref={bottomSheetRef}
        backgroundStyle={styles.bottomSheetBackgroundStyle}
        handleStyle={styles.bottomSheetHandleStyle}
        handleIndicatorStyle={styles.bottomSheetHandleIndicatorStyle}
        snapPoints={["10%", "40%"]}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.bottomSheetScrollViewContainerStyle}
        >
          {wallpaper && <ImageDetails item={wallpaper} />}
          {!wallpaper && (
            <View style={{ alignItems: "center" }}>
              <ThemedText type="default">
                No wallpaper information was found.
              </ThemedText>
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    backgroundColor: "#222222",
  },
  bottomSheetBackgroundStyle: {
    backgroundColor: "#222222",
  },
  bottomSheetHandleStyle: {
    backgroundColor: "#222222",
    borderRadius: 16,
  },
  bottomSheetHandleIndicatorStyle: {
    backgroundColor: "#FFFFFF",
  },
  bottomSheetScrollViewContainerStyle: {
    flex: 1,
    padding: 16,
  },
});
