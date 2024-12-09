import { FavoriteContextProvider } from "@/contexts/favorite-context";
import { WallpaperContextProvider } from "@/contexts/photos-context";
import {
  ArimaMadurai_100Thin,
  ArimaMadurai_200ExtraLight,
  ArimaMadurai_300Light,
  ArimaMadurai_400Regular,
  ArimaMadurai_500Medium,
  ArimaMadurai_700Bold,
  ArimaMadurai_800ExtraBold,
  ArimaMadurai_900Black,
  useFonts,
} from "@expo-google-fonts/arima-madurai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { EventProvider } from "react-native-outside-press";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const queryClient = new QueryClient();

  const [fontsLoaded] = useFonts({
    ArimaMadurai_100Thin,
    ArimaMadurai_200ExtraLight,
    ArimaMadurai_300Light,
    ArimaMadurai_400Regular,
    ArimaMadurai_500Medium,
    ArimaMadurai_700Bold,
    ArimaMadurai_800ExtraBold,
    ArimaMadurai_900Black,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <WallpaperContextProvider>
          <FavoriteContextProvider>
            <EventProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  statusBarBackgroundColor: "rgba(0,0,0,0)",
                  navigationBarTranslucent: true,
                  navigationBarColor: "rgba(0,0,0,0)",
                }}
              >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="image/[id]"
                  options={{
                    animation: "fade",
                    presentation: "transparentModal",
                  }}
                />
              </Stack>
            </EventProvider>
          </FavoriteContextProvider>
        </WallpaperContextProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
