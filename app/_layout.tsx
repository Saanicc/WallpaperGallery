import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarBackgroundColor: "rgba(0,0,0,0)",
        navigationBarTranslucent: true,
        navigationBarColor: "rgba(0,0,0,0)",
      }}
    />
  );
}
