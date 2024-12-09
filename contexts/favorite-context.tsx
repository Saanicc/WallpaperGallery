import { PixabayImage } from "@/api/pixabay/types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

export interface FavoriteContextValue {
  favoriteWallpapers: PixabayImage[];
  addToFavorites: (wallpaper: PixabayImage) => void;
  deleteFavorite: (wallpaperId: string) => void;
  isWallpaperFavorited: (wallpaperId: string) => boolean;
}

export const FavoriteContext = createContext<FavoriteContextValue>({
  favoriteWallpapers: [],
  addToFavorites: () => Promise.resolve(),
  deleteFavorite: () => Promise.resolve(),
  isWallpaperFavorited: () => false,
});

export const FavoriteContextProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<PixabayImage[]>([]);

  const addToFavorites = (wallpaper: PixabayImage) => {
    setFavorites((prev) => {
      if (!prev.some((img) => img.id === wallpaper.id))
        return [...prev, wallpaper];

      const indexOfItemToRemove = prev.findIndex(
        (img) => img.id === wallpaper.id
      );
      return prev.toSpliced(indexOfItemToRemove, 1);
    });
  };

  const deleteFavorite = (wallpaperId: string) => {
    setFavorites((prev) =>
      prev.filter((img) => String(img.id) !== wallpaperId)
    );
  };

  const isWallpaperFavorited = (wallpaperId: string) =>
    favorites.some((img) => String(img.id) === wallpaperId);

  const value = useMemo(() => {
    return {
      favoriteWallpapers: favorites,
      addToFavorites,
      deleteFavorite,
      isWallpaperFavorited,
    };
  }, [favorites, addToFavorites, deleteFavorite, isWallpaperFavorited]);

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);

  if (context === undefined) {
    throw new Error("useFavoriteContext must be used within a FavoriteContext");
  }
  return context;
};
