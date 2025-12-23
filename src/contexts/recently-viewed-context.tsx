import { Wallpaper } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface RecentlyViewedContextValue {
  recentlyViewed: Wallpaper[];
  addToRecentlyViewed: (wallpaper: Wallpaper) => Promise<void>;
  clearRecentlyViewed: () => Promise<void>;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue>({
  recentlyViewed: [],
  addToRecentlyViewed: async () => {},
  clearRecentlyViewed: async () => {},
});

const STORAGE_KEY = "@recently_viewed";
const MAX_ITEMS = 10;

export const RecentlyViewedProvider = ({ children }: PropsWithChildren) => {
  const [recentlyViewed, setRecentlyViewed] = useState<Wallpaper[]>([]);

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const loadRecentlyViewed = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setRecentlyViewed(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Failed to load recently viewed wallpapers", e);
    }
  };

  const addToRecentlyViewed = useCallback(async (wallpaper: Wallpaper) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists to move it to the top
      const filtered = prev.filter((item) => item.id !== wallpaper.id);
      const updated = [wallpaper, ...filtered].slice(0, MAX_ITEMS);

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch((e) =>
        console.error("Failed to save recently viewed", e)
      );

      return updated;
    });
  }, []);

  const clearRecentlyViewed = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setRecentlyViewed([]);
    } catch (e) {
      console.error("Failed to clear recently viewed", e);
    }
  }, []);

  return (
    <RecentlyViewedContext.Provider
      value={{ recentlyViewed, addToRecentlyViewed, clearRecentlyViewed }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error(
      "useRecentlyViewed must be used within a RecentlyViewedProvider"
    );
  }
  return context;
};
