import { WallpaperContextProvider } from "@/contexts/photos-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { EventProvider } from "react-native-outside-press";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <WallpaperContextProvider>
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
        </WallpaperContextProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
