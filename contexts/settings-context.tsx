import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

type Theme = "system" | "light" | "dark";
type WallpaperProvider = "pixabay" | "unsplash" | "pexels";

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  wallpaperProvider: WallpaperProvider;
  setWallpaperProvider: (provider: WallpaperProvider) => void;
  clearCache: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>("system");
  const [wallpaperProvider, setWallpaperProviderState] =
    useState<WallpaperProvider>("pixabay");

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (theme === "system") {
      Appearance.setColorScheme(null);
    } else {
      Appearance.setColorScheme(theme);
    }
  }, [theme]);

  const loadSettings = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem("settings.theme");
      const storedProvider = await AsyncStorage.getItem(
        "settings.wallpaperProvider"
      );

      if (storedTheme) setThemeState(storedTheme as Theme);
      if (storedProvider)
        setWallpaperProviderState(storedProvider as WallpaperProvider);
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    await AsyncStorage.setItem("settings.theme", newTheme);
  };

  const setWallpaperProvider = async (provider: WallpaperProvider) => {
    setWallpaperProviderState(provider);
    await AsyncStorage.setItem("settings.wallpaperProvider", provider);
  };

  const clearCache = async () => {
    await AsyncStorage.removeItem("settings.theme");
    await AsyncStorage.removeItem("settings.wallpaperProvider");
    setThemeState("system");
    setWallpaperProviderState("pixabay");
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        wallpaperProvider,
        setWallpaperProvider,
        clearCache,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
