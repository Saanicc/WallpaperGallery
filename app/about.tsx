import { Text } from "@/components/ui/text";
import { PADDING } from "@/constants/style";
import useTheme from "@/hooks/useTheme";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  const theme = useTheme();
  const version = Constants.expoConfig?.version || "1.0.0";

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "About",
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          padding: PADDING,
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <Text variant="h1" className="text-primary">
          Wallpaper Gallery
        </Text>
        <Text className="text-muted-foreground text-center">
          A beautiful wallpaper gallery app built with React Native, Expo, and
          NativeWind.
        </Text>
        <View className="items-center mt-8">
          <Text className="font-bold">Version</Text>
          <Text>{version}</Text>
        </View>
        <Text className="text-xs text-muted-foreground mt-auto">
          © 2025 Mattias Ahlström
        </Text>
      </SafeAreaView>
    </>
  );
}
