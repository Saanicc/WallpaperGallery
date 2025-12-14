import Photo from "@/components/Photo/Photo";
import { Text } from "@/components/ui/text";
import { GAP, IMAGE_HEIGHT, IMAGE_WIDTH } from "@/constants/style";
import { useFavoriteContext } from "@/contexts/favorite-context";
import useTheme from "@/hooks/useTheme";
import { Wallpaper } from "@/types/types";
import React from "react";
import { FlatList, View } from "react-native";

const favorites = () => {
  const { favoriteWallpapers } = useFavoriteContext();
  const theme = useTheme();

  const getData = () => {
    if (favoriteWallpapers.length % 2 > 0)
      return [...favoriteWallpapers, {} as Wallpaper];
    return favoriteWallpapers;
  };

  const renderItem = ({ item }: { item: Wallpaper }) => (
    <View style={{ marginBottom: GAP }}>
      <Photo item={item} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
    </View>
  );

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
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ gap: GAP }}
        contentContainerStyle={{ padding: GAP }}
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
