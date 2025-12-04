import Cache from "@/helpers/cache";
import { Wallpaper } from "@/types/types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface FavoriteContextValue {
  favoriteWallpapers: Wallpaper[];
  addToFavorites: (wallpaper: Wallpaper) => void;
  deleteAllFavorites: () => void;
  isWallpaperFavorited: (wallpaperId: string) => boolean;
}

export const FavoriteContext = createContext<FavoriteContextValue>({
  favoriteWallpapers: [],
  addToFavorites: () => Promise.resolve(),
  deleteAllFavorites: () => Promise.resolve(),
  isWallpaperFavorited: () => false,
});

export const FavoriteContextProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Wallpaper[]>([]);

  useEffect(() => {
    Cache.getData<Wallpaper[]>("favorites").then(
      (data) => data && setFavorites(data)
    );
  }, []);

  const addToFavorites = (wallpaper: Wallpaper) => {
    let newArr = [...favorites];

    if (!isWallpaperFavorited(String(wallpaper.id))) {
      newArr.push(wallpaper);
    } else {
      newArr = favorites.filter((item) => item.id !== wallpaper.id);
    }

    Cache.storeData<Wallpaper[]>(newArr, "favorites");
    setFavorites(newArr);
  };

  const deleteAllFavorites = () => {
    Cache.storeData<Wallpaper[]>([], "favorites");
    setFavorites([]);
  };

  const isWallpaperFavorited = (wallpaperId: string) =>
    favorites.some((img) => String(img.id) === wallpaperId);

  const value = useMemo(() => {
    return {
      favoriteWallpapers: favorites,
      addToFavorites,
      deleteAllFavorites,
      isWallpaperFavorited,
    };
  }, [favorites, addToFavorites, deleteAllFavorites, isWallpaperFavorited]);

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
