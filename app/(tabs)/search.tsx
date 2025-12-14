import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { GAP, PADDING } from "@/constants/style";
import { useSettings } from "@/contexts/settings-context";
import useTheme from "@/hooks/useTheme";
import { PixabayImageOrder } from "@/types/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function SearchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { wallpaperProvider } = useSettings();
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<PixabayImageOrder>(
    PixabayImageOrder.POPULAR
  );

  const handleSearch = () => {
    if (query.trim()) {
      router.push({
        pathname: "/wallpapers/list",
        params: {
          query: query.trim(),
          orderBy: wallpaperProvider === "pixabay" ? order : undefined,
        },
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ padding: PADDING, gap: GAP }}
      style={{ backgroundColor: theme.colors.background }}
      keyboardShouldPersistTaps="handled"
    >
      <SearchBar
        placeholder={`Search ${wallpaperProvider}...`}
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />

      <View className="gap-2">
        <Text variant="h3">Filters</Text>

        {wallpaperProvider === "pixabay" && (
          <View className="gap-2">
            <Text>Order By</Text>
            <View className="flex-row gap-2 flex-wrap">
              {Object.values(PixabayImageOrder).map((item) => (
                <Button
                  key={item}
                  variant={order === item ? "default" : "outline"}
                  size="sm"
                  onPress={() => setOrder(item)}
                >
                  <Text
                    style={{
                      color:
                        order === item
                          ? theme.colors.background
                          : theme.colors.text,
                    }}
                  >
                    {item}
                  </Text>
                </Button>
              ))}
            </View>
          </View>
        )}

        {wallpaperProvider !== "pixabay" && (
          <Text className="text-muted-foreground">
            No specific filters available for {wallpaperProvider} yet.
          </Text>
        )}
      </View>

      <Button onPress={handleSearch} className="mt-4">
        <Text style={{ color: theme.colors.background }}>Search</Text>
      </Button>
    </ScrollView>
  );
}
