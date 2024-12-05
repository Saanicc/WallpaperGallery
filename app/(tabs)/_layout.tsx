import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Wallpapers",
          tabBarActiveTintColor: "#FFFFFF",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="image-outline" size={size} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarActiveTintColor: "#FFFFFF",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="apps-sharp" size={size} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
    </Tabs>
  );
}