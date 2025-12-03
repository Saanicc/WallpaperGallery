import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";
import Photo from "@/components/Photo/Photo";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { BORDER_RADIUS, GAP } from "@/constants/style";
import { useWallpaperContext } from "@/contexts/photos-context";
import { capitalizeFirstChar } from "@/helpers/functions";
import { useScreenSize } from "@/hooks/useScreenSize";
import useTheme from "@/hooks/useTheme";
import { Category, PixabayImage, PixabayImageOrder } from "@/types/types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { FlatList, View } from "react-native";

export default function ListScreen() {
  const { orderBy, category, query } = useLocalSearchParams<{
    orderBy: PixabayImageOrder;
    category: Category;
    query: string;
  }>();
  const { getWallpapers } = useWallpaperContext();
  const { width } = useScreenSize();
  const theme = useTheme();
  const router = useRouter();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    getWallpapers(orderBy, category, undefined, query);

  const photos = data?.pages.flatMap((page) => page.hits) || [];
  const IMAGE_WIDTH = (width - GAP * 3) / 2;
  const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;

  const renderItem = ({ item }: { item: PixabayImage }) => (
    <View style={{ marginBottom: GAP }}>
      <Photo item={item} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: capitalizeFirstChar(
            (query || category || orderBy || "Wallpapers").toLowerCase()
          ),
          headerTintColor: theme.colors.text,
          headerStyle: { backgroundColor: theme.colors.background },
          animation: "slide_from_right",
        }}
      />
      {isLoading ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: GAP,
            padding: GAP,
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingSkeleton
              key={index}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              borderRadius={BORDER_RADIUS}
            />
          ))}
        </View>
      ) : photos.length === 0 ? (
        <View className="flex-1 items-center justify-center gap-4">
          <Text style={{ color: theme.colors.text }}>
            No results matched your search
          </Text>
          <Button onPress={() => router.back()}>
            <ArrowLeft color={theme.colors.background} />
            <Text>Back</Text>
          </Button>
        </View>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={{ gap: GAP }}
          contentContainerStyle={{ padding: GAP }}
          renderItem={renderItem}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <LoadingSkeleton
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                borderRadius={BORDER_RADIUS}
              />
            ) : null
          }
        />
      )}
    </View>
  );
}
