import { fetchWallpapers } from "@/helpers/fetchWallpapers";
import "../../global.css";

import { FavoriteContextProvider } from "@/contexts/favorite-context";
import { FilterContextProvider } from "@/contexts/filter-context";
import { WallpaperContextProvider } from "@/contexts/photos-context";
import { RecentlyViewedProvider } from "@/contexts/recently-viewed-context";
import { SettingsProvider } from "@/contexts/settings-context";
import { getStoredProvider, StoredProvider } from "@/helpers/getStoredProvider";
import { wallpapersInfiniteKey } from "@/helpers/wallpapersInfiniteKey";
import { wallpaperThemes } from "@/lib/wallpaperThemes";
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
import { StatusBar } from "expo-status-bar";
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
  const [initialProvider, setInitialProvider] = useState<
    StoredProvider | undefined
  >(undefined);

  useEffect(() => {
    const prefetchQueries = async () => {
      const { provider, wallpaperProvider } = await getStoredProvider();
      setInitialProvider({ provider, wallpaperProvider });

      try {
        await Promise.all(
          wallpaperThemes.map(({ query }) => {
            const params = {
              perPage: 10,
              query,
            };
            return queryClient.prefetchInfiniteQuery({
              queryKey: wallpapersInfiniteKey(params, wallpaperProvider),
              queryFn: async ({ pageParam = 1 }) =>
                await fetchWallpapers(provider, params, pageParam as number),
              initialPageParam: 1,
            });
          })
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    };
    prefetchQueries();
  }, []);

  if (!fontsLoaded || !isReady || !initialProvider) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar />
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <SettingsProvider
          initialWallpaperProvider={initialProvider.wallpaperProvider}
        >
          <WallpaperContextProvider>
            <FavoriteContextProvider>
              <RecentlyViewedProvider>
                <FilterContextProvider>
                  <EventProvider>
                    <Stack
                      screenOptions={{
                        headerShown: false,
                      }}
                    >
                      <Stack.Screen
                        name="(tabs)"
                        options={{ headerTitle: "" }}
                      />
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
                </FilterContextProvider>
              </RecentlyViewedProvider>
            </FavoriteContextProvider>
          </WallpaperContextProvider>
        </SettingsProvider>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}
