import CategoryList from "@/components/CategoryList/CategoryList";
import SearchBar from "@/components/SearchBar/SearchBar";
import WallpaperOfTheDay from "@/components/WallpaperOfTheDay/WallpaperOfTheDay";
import PexelsList from "@/components/Wallpapers/PexelsList";
import PixabayList from "@/components/Wallpapers/PixabayList";
import { GAP } from "@/constants/style";
import { useSettings } from "@/contexts/settings-context";
import useTheme from "@/hooks/useTheme";
import { PixabayImageOrder, WallpaperProvider } from "@/types/types";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { wallpaperProvider } = useSettings();
  const router = useRouter();
  const theme = useTheme();

  const navigateToWallpapers = (orderBy?: PixabayImageOrder) => {
    router.push({
      pathname: "/wallpapers/list",
      params: { orderBy },
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
      className="flex-1 pt-4"
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
      >
        <SearchBar />
        <WallpaperOfTheDay />
        <CategoryList />
        <ProviderData provider={wallpaperProvider} />
      </ScrollView>
    </SafeAreaView>
  );
}
