import FavoriteCard from "@/components/FavoriteCard/FavoriteCard";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { colors } from "@/constants/colors";
import { GAP, PADDING } from "@/constants/style";
import { useFavoriteContext } from "@/contexts/favorite-context";
import { PixabayImage } from "@/types/types";
import React from "react";
import { FlatList, View } from "react-native";

const favorites = () => {
  const { favoriteWallpapers } = useFavoriteContext();

  const getData = () => {
    if (favoriteWallpapers.length % 2 > 0)
      return [...favoriteWallpapers, {} as PixabayImage];
    return favoriteWallpapers;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
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
            <ThemedText>
              You haven't added any favorite wallpapers yet.
            </ThemedText>
          </View>
        )}
      />
    </View>
  );
};

export default favorites;
