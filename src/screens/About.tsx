import { Text } from "@/components/ui/text";
import { PADDING } from "@/constants/style";
import useTheme from "@/hooks/useTheme";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const About = () => {
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
          animation: "slide_from_right",
          animationDuration: 200,
        }}
      />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          padding: PADDING,
          alignItems: "center",
          gap: 16,
        }}
      >
        <Image
          source={require("@/assets/images/adaptive-icon.png")}
          style={{
            width: SCREEN_WIDTH / 2,
            height: SCREEN_WIDTH / 2,
            maxWidth: 256,
            maxHeight: 256,
          }}
        />
        <Text variant="h1" className="text-primary">
          Wallpaper Gallery
        </Text>
        <Text className="text-muted-foreground text-center">
          A beautiful wallpaper gallery app built with React Native, Expo, and
          NativeWind.
        </Text>
        <View className="items-center">
          <Text className="font-bold">Version</Text>
          <Text className="text-sm text-muted-foreground">{version}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default About;
