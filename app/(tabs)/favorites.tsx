import { PixabayImage } from "@/api/pixabay/types";
import FavoriteCard from "@/components/FavoriteCard/FavoriteCard";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { useFavoriteContext } from "@/contexts/favorite-context";
import { GAP, PADDING } from "@/helpers/constants";
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
        backgroundColor: "#333333",
      }}
    >
      <FlatList
        data={getData()}
        keyExtractor={(wallpaper) => String(wallpaper.id)}
        renderItem={({ item, index }) => (
          <FavoriteCard item={item} index={index} />
        )}
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
