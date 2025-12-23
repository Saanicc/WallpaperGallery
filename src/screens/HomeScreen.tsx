import SearchBar from "@/components/SearchBar/SearchBar";
import SurpriseMeButton from "@/components/SurpriseMeButton/SurpriseMeButton";
import WallpaperOfTheDay from "@/components/WallpaperOfTheDay/WallpaperOfTheDay";
import PexelsList from "@/components/Wallpapers/PexelsList";
import PixabayList from "@/components/Wallpapers/PixabayList";
import RecentlyViewedList from "@/components/Wallpapers/RecentlyViewedList";
import ThematicList from "@/components/Wallpapers/ThematicList";
import { GAP } from "@/constants/style";
import { useFilterContext } from "@/contexts/filter-context";
import { useSettings } from "@/contexts/settings-context";
import useTheme from "@/hooks/useTheme";
import { wallpaperThemes } from "@/lib/wallpaperThemes";
import { PixabayImageOrder, WallpaperProvider } from "@/types/types";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { wallpaperProvider } = useSettings();
  const router = useRouter();
  const theme = useTheme();
  const { setQuery } = useFilterContext();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setQuery("");
      };
    }, [setQuery])
  );

  const navigateToWallpapers = (
    orderBy?: PixabayImageOrder,
    query?: string
  ) => {
    router.push({
      pathname: "/wallpapers/list",
      params: { orderBy, query },
    });
  };

  const ProviderData = ({ provider }: { provider: WallpaperProvider }) => {
    switch (provider) {
      case "pixabay":
        return <PixabayList onHeaderPress={navigateToWallpapers} />;
      case "pexels":
        return <PexelsList onHeaderPress={navigateToWallpapers} />;
      case "unsplash":
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <ScrollView
        style={{
          flex: 1,
          minHeight: SCREEN_HEIGHT,
          backgroundColor: theme.colors.background,
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{
          gap: GAP,
          paddingBottom: Platform.OS === "ios" ? 100 : 130,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 mt-4">
          <SearchBar placeholder="Quick search..." />
        </View>
        <WallpaperOfTheDay />
        <ProviderData provider={wallpaperProvider} />

        {wallpaperThemes.map(({ title, query }) => (
          <ThematicList
            key={query}
            title={title}
            query={query}
            onHeaderPress={(q) => navigateToWallpapers(undefined, q)}
          />
        ))}
        <RecentlyViewedList />
      </ScrollView>
      <SurpriseMeButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
