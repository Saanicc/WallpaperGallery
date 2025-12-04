import Header from "@/components/Header/Header";
import ImageDetails from "@/components/ImageDetails/ImageDetails";
import MenuButton from "@/components/MenuButton/MenuButton";
import { Text } from "@/components/ui/text";
import { BORDER_RADIUS, PADDING } from "@/constants/style";
import { useFavoriteContext } from "@/contexts/favorite-context";
import { useWallpaperContext } from "@/contexts/photos-context";
import { useScreenSize } from "@/hooks/useScreenSize";
import useTheme from "@/hooks/useTheme";
import { NAV_THEME } from "@/lib/theme";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const { id, thumbnail, url, width, height } = useLocalSearchParams<{
    id: string;
    thumbnail?: string;
    url?: string;
    width?: string;
    height?: string;
  }>();
  const { getWallpaper } = useWallpaperContext();
  const { addToFavorites, isWallpaperFavorited } = useFavoriteContext();

  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({
    width: width ? parseInt(width) : 0,
    height: height ? parseInt(height) : 0,
    aspectRatio: width && height ? parseInt(width) / parseInt(height) : 0,
  });

  const { width: screenWidth } = useScreenSize();
  const theme = useTheme();

  const { data: wallpaper } = getWallpaper(id);

  const scrollViewRef = useRef<ScrollView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const _headerHeight = Platform.OS === "ios" ? 140 : 100;
  const headerShadowHeight = useSharedValue(_headerHeight);
  const opacity = useSharedValue(1);
  const imageOpacity = useSharedValue(0);

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
    const imageUri = url || wallpaper?.url;
    if (!imageUri) return;

    getAspectRatio(imageUri)
      .then((imageDim) => {
        setImageDimensions(imageDim);
      })
      .catch((error) => {
        console.error("Error fetching image dimensions:", error);
      });
  }, [url, wallpaper?.url]);

  const centerContent = (width: number) => {
    const offsetX = (width - screenWidth) / 2;
    scrollViewRef.current?.scrollTo({ x: offsetX, animated: false });
  };

  const snapPoints = useMemo(() => ["25%", "50%", "100%"], []);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      {imageDimensions.width >= screenWidth && (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          style={StyleSheet.absoluteFillObject}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          onContentSizeChange={(w) => centerContent(w)}
        >
          <Pressable
            onLongPress={handleLongPress}
            onPressOut={handlePressOut}
            style={{
              flex: 1,
              aspectRatio: imageDimensions.aspectRatio,
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: thumbnail || wallpaper?.thumbnail }}
                style={{
                  width: undefined,
                  height: "100%",
                  aspectRatio: imageDimensions.aspectRatio,
                }}
                resizeMode="cover"
                blurRadius={Platform.OS === "ios" ? 5 : 2}
              />
              <Animated.Image
                source={{ uri: url || wallpaper?.url }}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: "100%",
                  aspectRatio: imageDimensions.aspectRatio,
                  opacity: imageOpacity,
                }}
                resizeMode="cover"
                onLoad={() => {
                  imageOpacity.value = withTiming(1, { duration: 300 });
                }}
              />
            </View>
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
            <MenuButton
              icon="arrow-back"
              onPress={() => navigation.goBack()}
              iconColor={NAV_THEME.dark.colors.text}
            />
          }
          rightComponent={
            <MenuButton
              icon={isWallpaperFavorited(id) ? "star" : "star-outline"}
              onPress={() => wallpaper && addToFavorites(wallpaper)}
              iconColor={NAV_THEME.dark.colors.text}
            />
          }
        />
      </Animated.View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        handleStyle={{
          backgroundColor: theme.colors.background,
          borderRadius: BORDER_RADIUS,
        }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.primary }}
        containerStyle={{ marginTop: Platform.OS === "ios" ? top + 10 : top }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ flex: 1, padding: PADDING }}
        >
          {wallpaper && <ImageDetails item={wallpaper} />}
          {!wallpaper && (
            <View style={{ alignItems: "center" }}>
              <Text>No wallpaper information was found.</Text>
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
