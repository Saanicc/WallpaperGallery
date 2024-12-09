import MenuButton from "@/components/MenuButton/MenuButton";
import { Font } from "@/components/ThemedText/ThemedText.config";
import { useFavoriteContext } from "@/contexts/favorite-context";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Alert, View } from "react-native";

export default function TabLayout() {
  const { favoriteWallpapers, deleteAllFavorites } = useFavoriteContext();

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
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <MenuButton
                disabled={favoriteWallpapers.length === 0 && true}
                icon="trash-outline"
                iconColor={
                  favoriteWallpapers.length === 0 ? "#666666" : "#FFFFFF"
                }
                size={25}
                onPress={() =>
                  Alert.alert(
                    "Delete all favorites",
                    "Are you sure you want to delete all favorites?",
                    [
                      {
                        style: "destructive",
                        text: "Cancel",
                      },
                      {
                        style: "default",
                        text: "Confirm",
                        onPress: deleteAllFavorites,
                      },
                    ],
                    { userInterfaceStyle: "dark" }
                  )
                }
              />
            </View>
          ),
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
