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
          borderTopWidth: 0,
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: { color: theme.colors.text },
          title: "Home",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
          },
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
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopWidth: 0,
          },
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
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopWidth: 0,
          },
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
          tabBarLabelStyle: {
            fontSize: 12,
          },
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
