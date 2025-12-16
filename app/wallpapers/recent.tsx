import Photo from "@/components/Photo/Photo";
import { GAP } from "@/constants/style";
import { useRecentlyViewed } from "@/contexts/recently-viewed-context";
import { useScreenSize } from "@/hooks/useScreenSize";
import useTheme from "@/hooks/useTheme";
import { Wallpaper } from "@/types/types";
import { Stack } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

export default function RecentListScreen() {
  const { width } = useScreenSize();
  const theme = useTheme();
  const { recentlyViewed } = useRecentlyViewed();

  const IMAGE_WIDTH = (width - GAP * 3) / 2;
  const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;

  const renderItem = ({ item }: { item: Wallpaper }) => (
    <View style={{ marginBottom: GAP }}>
      <Photo item={item} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Recently Viewed",
          headerTintColor: theme.colors.text,
          headerStyle: { backgroundColor: theme.colors.background },
          animation: "slide_from_right",
        }}
      />

      <FlatList
        data={recentlyViewed}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={{ gap: GAP }}
        contentContainerStyle={{ padding: GAP }}
        renderItem={renderItem}
      />
    </View>
  );
}
