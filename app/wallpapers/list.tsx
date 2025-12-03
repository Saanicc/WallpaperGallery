import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";
import Photo from "@/components/Photo/Photo";
import { BORDER_RADIUS, GAP } from "@/constants/style";
import { useWallpaperContext } from "@/contexts/photos-context";
import { capitalizeFirstChar } from "@/helpers/functions";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Category, PixabayImage, PixabayImageOrder } from "@/types/types";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

export default function ListScreen() {
  const { orderBy, category } = useLocalSearchParams<{
    orderBy: PixabayImageOrder;
    category: Category;
  }>();
  const { getWallpapers } = useWallpaperContext();
  const { width } = useScreenSize();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    getWallpapers(orderBy, category);

  const photos = data?.pages.flatMap((page) => page.hits) || [];
  const IMAGE_WIDTH = (width - GAP * 3) / 2;
  const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;

  const renderItem = ({ item }: { item: PixabayImage }) => (
    <View style={{ marginBottom: GAP }}>
      <Photo item={item} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: capitalizeFirstChar(
            (category || orderBy || "Wallpapers").toLowerCase()
          ),
          headerTintColor: "white",
          headerStyle: { backgroundColor: "black" },
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
