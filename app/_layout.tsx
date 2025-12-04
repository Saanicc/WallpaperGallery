import "../global.css";

import { FavoriteContextProvider } from "@/contexts/favorite-context";
import { WallpaperContextProvider } from "@/contexts/photos-context";
import { RecentlyViewedProvider } from "@/contexts/recently-viewed-context";
import { SettingsProvider } from "@/contexts/settings-context";
import {
  Outfit_100Thin,
  Outfit_200ExtraLight,
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_800ExtraBold,
  Outfit_900Black,
  useFonts,
} from "@expo-google-fonts/outfit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PortalHost } from "@rn-primitives/portal";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { EventProvider } from "react-native-outside-press";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24,
        staleTime: 1000 * 60 * 60 * 24,
      },
    },
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  const [fontsLoaded] = useFonts({
    Outfit_100Thin,
    Outfit_200ExtraLight,
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
    Outfit_900Black,
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded && isReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isReady]);

  if (!fontsLoaded || !isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <SettingsProvider>
          <WallpaperContextProvider>
            <FavoriteContextProvider>
              <RecentlyViewedProvider>
                <EventProvider>
                  <Stack
                    screenOptions={{
                      headerShown: false,
                    }}
                  >
                    <Stack.Screen name="(tabs)" options={{ headerTitle: "" }} />
                    <Stack.Screen
                      name="image/[id]"
                      options={{
                        animation: "fade",
                        presentation: "transparentModal",
                      }}
                    />
                  </Stack>
                  <PortalHost />
                </EventProvider>
              </RecentlyViewedProvider>
            </FavoriteContextProvider>
          </WallpaperContextProvider>
        </SettingsProvider>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}
