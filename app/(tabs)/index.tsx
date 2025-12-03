import HorizontalList from "@/components/HorizontalList/HorizontalList";
import { useWallpaperContext } from "@/contexts/photos-context";
import useTheme from "@/hooks/useTheme";
import { PixabayImageOrder } from "@/types/types";
import { useRouter } from "expo-router";
import { View } from "react-native";

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <HorizontalList
        title="Latest Wallpapers"
        data={latestWallpapers}
        isLoading={latestLoading}
        onViewMore={() =>
          router.push({
            pathname: "/wallpapers/list",
            params: { orderBy: PixabayImageOrder.LATEST },
          })
        }
      />

      <HorizontalList
        title="Popular Wallpapers"
        data={popularWallpapers}
        isLoading={popularLoading}
        onViewMore={() =>
          router.push({
            pathname: "/wallpapers/list",
            params: { orderBy: PixabayImageOrder.POPULAR },
          })
        }
      />
    </View>
  );
}
