import Header from "@/components/Header/Header";
import MenuButton from "@/components/MenuButton/MenuButton";
import { useWallpaperContext } from "@/contexts/photos-context";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image, Platform, Pressable, StyleSheet } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailedImage() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getWallpaper } = useWallpaperContext();

  const _headerHeight = Platform.OS === "ios" ? 140 : 100;
  const headerShadowHeight = useSharedValue(_headerHeight);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    headerShadowHeight.value = withTiming(0, { duration: 500 });
    opacity.value = withTiming(0, { duration: 500 });
  };

  const handlePressOut = () => {
    headerShadowHeight.value = withTiming(_headerHeight, { duration: 500 });
    opacity.value = withTiming(1, { duration: 500 });
  };

  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#222222",
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={StyleSheet.absoluteFillObject}
      >
        <Image
          defaultSource={{ uri: getWallpaper(id)?.previewURL }}
          source={{ uri: getWallpaper(id)?.largeImageURL }}
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

      <Animated.View style={{ opacity }}>
        <Header
          leftComponent={
            <MenuButton icon="arrow-back" onPress={() => navigation.goBack()} />
          }
          rightComponent={
            <MenuButton icon="heart-outline" onPress={() => {}} />
          }
        />
      </Animated.View>
    </SafeAreaView>
  );
}
