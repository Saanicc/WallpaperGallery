import FavoriteCard from "@/components/FavoriteCard/FavoriteCard";
import { Text } from "@/components/ui/text";
import { GAP, PADDING } from "@/constants/style";
import { useFavoriteContext } from "@/contexts/favorite-context";
import useTheme from "@/hooks/useTheme";
import { PixabayImage } from "@/types/types";
import React from "react";
import { FlatList, View } from "react-native";

const favorites = () => {
  const { favoriteWallpapers } = useFavoriteContext();
  const theme = useTheme();

  const getData = () => {
    if (favoriteWallpapers.length % 2 > 0)
      return [...favoriteWallpapers, {} as PixabayImage];
    return favoriteWallpapers;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <FlatList
        data={getData()}
        keyExtractor={(wallpaper) => String(wallpaper.id)}
        renderItem={({ item }) => <FavoriteCard item={item} />}
        numColumns={2}
        columnWrapperStyle={{ gap: GAP }}
        contentContainerStyle={{
          padding: PADDING,
          gap: GAP,
        }}
        ListEmptyComponent={() => (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>You haven't added any favorite wallpapers yet.</Text>
          </View>
        )}
      />
    </View>
  );
};

export default favorites;
