import Header from "@/components/Header/Header";
import ImageDetails from "@/components/ImageDetails";
import MenuButton from "@/components/MenuButton/MenuButton";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { useWallpaperContext } from "@/contexts/photos-context";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useRef } from "react";
import { Image, Platform, Pressable, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DetailedImage() {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getWallpaper } = useWallpaperContext();

  const wallpaper = getWallpaper(id);

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

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <Pressable
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}
        style={StyleSheet.absoluteFillObject}
      >
        <Image
          defaultSource={{ uri: wallpaper?.previewURL }}
          source={{ uri: wallpaper?.largeImageURL }}
          style={{ flex: 1 }}
        />
      </Pressable>
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
            <MenuButton icon="heart-outline" onPress={() => {}} />
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
  },
  container: {
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