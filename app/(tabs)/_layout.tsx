import FavoriteHeaderRight from "@/components/FavoriteHeaderRight/FavoriteHeaderRight";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.background,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: { color: theme.colors.text },
          title: "Categories",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "apps" : "apps-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: { color: theme.colors.text },
          headerRight: () => <FavoriteHeaderRight />,
          title: "Favorites",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "star" : "star-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: { color: theme.colors.text },
        }}
      />
    </Tabs>
  );
}
