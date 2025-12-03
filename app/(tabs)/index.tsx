import CategoryList from "@/components/CategoryList/CategoryList";
import HorizontalList from "@/components/HorizontalList/HorizontalList";
import SearchBar from "@/components/SearchBar/SearchBar";
import { GAP } from "@/constants/style";
import { useWallpaperContext } from "@/contexts/photos-context";
import useTheme from "@/hooks/useTheme";
import { PixabayImageOrder } from "@/types/types";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { getWallpapers } = useWallpaperContext();
  const router = useRouter();
  const theme = useTheme();

  const { data: popularData, isLoading: popularLoading } = getWallpapers(
    PixabayImageOrder.POPULAR,
    undefined,
    10
  );

  const { data: latestData, isLoading: latestLoading } = getWallpapers(
    PixabayImageOrder.LATEST,
    undefined,
    10
  );

  const popularWallpapers =
    popularData?.pages.flatMap((page) => page.hits) || [];
  const latestWallpapers = latestData?.pages.flatMap((page) => page.hits) || [];

  const navigateToWallpapers = (orderBy: PixabayImageOrder) => {
    router.push({
      pathname: "/wallpapers/list",
      params: { orderBy },
    });
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
        <CategoryList />
        <HorizontalList
          title="Latest Wallpapers"
          data={latestWallpapers}
          isLoading={latestLoading}
          onViewMore={() => navigateToWallpapers(PixabayImageOrder.LATEST)}
        />

        <HorizontalList
          title="Trending Wallpapers"
          data={popularWallpapers}
          isLoading={popularLoading}
          onViewMore={() => navigateToWallpapers(PixabayImageOrder.POPULAR)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
