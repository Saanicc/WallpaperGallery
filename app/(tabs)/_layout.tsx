import { Font } from "@/components/ThemedText/ThemedText.config";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0,
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
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: Font.ArimaMadurai_500Medium,
          },
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#222222" },
          headerTitleStyle: { color: "#FFFFFF" },
          title: "Categories",
          tabBarActiveTintColor: "#FFFFFF",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="apps-sharp" size={size} color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: Font.ArimaMadurai_500Medium,
          },
          tabBarStyle: {
            backgroundColor: "#222222",
            borderTopWidth: 0,
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#222222" },
          headerTitleStyle: { color: "#FFFFFF" },
          title: "Favorites",
          tabBarActiveTintColor: "#FFFFFF",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: Font.ArimaMadurai_500Medium,
          },
          tabBarStyle: {
            backgroundColor: "#222222",
            borderTopWidth: 0,
          },
        }}
      />
    </Tabs>
  );
}
