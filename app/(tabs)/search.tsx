import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { GAP, PADDING } from "@/constants/style";
import { useSettings } from "@/contexts/settings-context";
import { capitalizeFirstChar } from "@/helpers/functions";
import useTheme from "@/hooks/useTheme";
import {
  categories,
  Category,
  PexelsColor,
  PexelsOrientation,
  PixabayColor,
  PixabayImageOrder,
  PixabayOrientation,
} from "@/types/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

export default function SearchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { wallpaperProvider } = useSettings();
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<PixabayImageOrder>(
    PixabayImageOrder.POPULAR
  );
  const [orientation, setOrientation] = useState<
    PixabayOrientation | PexelsOrientation
  >(PixabayOrientation.ALL);
  const [category, setCategory] = useState<Category | "">("");
  const [colors, setColors] = useState<PixabayColor | PexelsColor | "">("");
  const [editorsChoice, setEditorsChoice] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    handleReset();
  }, [wallpaperProvider]);

  const handleSearch = () => {
    if (wallpaperProvider === "pexels") {
      if (!query) {
        setError("Pexels requires a search query");
        return;
      }
    }
    if (query.trim() || query === "") {
      setError(undefined);

      router.push({
        pathname: "/wallpapers/list",
        params: {
          query: query.trim(),
          orderBy: wallpaperProvider === "pixabay" ? order : undefined,
          orientation:
            orientation !== PixabayOrientation.ALL &&
            orientation !== PexelsOrientation.ALL
              ? orientation
              : undefined,
          category,
          colors,
          editorsChoice:
            wallpaperProvider === "pixabay" ? String(editorsChoice) : undefined,
        },
      });
    }
  };

  const handleReset = () => {
    setError(undefined);
    setQuery("");
    setOrder(PixabayImageOrder.POPULAR);
    setOrder(PixabayImageOrder.POPULAR);
    setOrientation(
      wallpaperProvider === "pixabay"
        ? PixabayOrientation.ALL
        : PexelsOrientation.ALL
    );
    setCategory("");
    setColors("");
    setEditorsChoice(false);
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
        disableReturnKey
        error={error}
      />

      <View className="gap-4">
        <Text variant="h3">Filters</Text>
        {wallpaperProvider === "pixabay" && (
          <View className="gap-4">
            {/* Order By */}
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
                      {capitalizeFirstChar(item.toLowerCase())}
                    </Text>
                  </Button>
                ))}
              </View>
            </View>

            {/* Orientation */}
            <View className="gap-2">
              <Text>Orientation</Text>
              <View className="flex-row gap-2 flex-wrap">
                {Object.values(PixabayOrientation).map((item) => (
                  <Button
                    key={item}
                    variant={orientation === item ? "default" : "outline"}
                    size="sm"
                    onPress={() => setOrientation(item)}
                  >
                    <Text
                      style={{
                        color:
                          orientation === item
                            ? theme.colors.background
                            : theme.colors.text,
                      }}
                    >
                      {capitalizeFirstChar(item)}
                    </Text>
                  </Button>
                ))}
              </View>
            </View>

            {/* Category */}
            <View className="gap-2">
              <Text>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  <Button
                    variant={category === "" ? "default" : "outline"}
                    size="sm"
                    onPress={() => setCategory("")}
                  >
                    <Text
                      style={{
                        color:
                          category === ""
                            ? theme.colors.background
                            : theme.colors.text,
                      }}
                    >
                      All
                    </Text>
                  </Button>
                  {categories.map((item) => (
                    <Button
                      key={item}
                      variant={category === item ? "default" : "outline"}
                      size="sm"
                      onPress={() => setCategory(item)}
                    >
                      <Text
                        style={{
                          color:
                            category === item
                              ? theme.colors.background
                              : theme.colors.text,
                        }}
                      >
                        {capitalizeFirstChar(item)}
                      </Text>
                    </Button>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Colors */}
            <View className="gap-2">
              <Text>Colors</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  <Button
                    variant={colors === "" ? "default" : "outline"}
                    size="sm"
                    onPress={() => setColors("")}
                  >
                    <Text
                      style={{
                        color:
                          colors === ""
                            ? theme.colors.background
                            : theme.colors.text,
                      }}
                    >
                      All
                    </Text>
                  </Button>
                  {Object.values(PixabayColor).map((item) => (
                    <Button
                      key={item}
                      variant={colors === item ? "default" : "outline"}
                      size="sm"
                      onPress={() => setColors(item)}
                    >
                      <Text
                        style={{
                          color:
                            colors === item
                              ? theme.colors.background
                              : theme.colors.text,
                        }}
                      >
                        {capitalizeFirstChar(item)}
                      </Text>
                    </Button>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Editor's Choice */}
            <View className="flex-row items-center justify-between">
              <Pressable
                className="flex-1 flex-row items-center justify-between"
                onPress={() => setEditorsChoice(!editorsChoice)}
              >
                <Text>Editor's Choice</Text>
                <Switch
                  checked={editorsChoice}
                  onCheckedChange={setEditorsChoice}
                />
              </Pressable>
            </View>
          </View>
        )}

        {wallpaperProvider === "pexels" && (
          <View className="gap-4">
            {/* Orientation */}
            <View className="gap-2">
              <Text>Orientation</Text>
              <View className="flex-row gap-2 flex-wrap">
                {Object.values(PexelsOrientation).map((item) => (
                  <Button
                    key={item}
                    variant={orientation === item ? "default" : "outline"}
                    size="sm"
                    onPress={() => setOrientation(item)}
                  >
                    <Text
                      style={{
                        color:
                          orientation === item
                            ? theme.colors.background
                            : theme.colors.text,
                      }}
                    >
                      {capitalizeFirstChar(item)}
                    </Text>
                  </Button>
                ))}
              </View>
            </View>

            {/* Colors */}
            <View className="gap-2">
              <Text>Colors</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  <Button
                    variant={colors === "" ? "default" : "outline"}
                    size="sm"
                    onPress={() => setColors("")}
                  >
                    <Text
                      style={{
                        color:
                          colors === ""
                            ? theme.colors.background
                            : theme.colors.text,
                      }}
                    >
                      All
                    </Text>
                  </Button>
                  {Object.values(PexelsColor).map((item) => (
                    <Button
                      key={item}
                      variant={colors === item ? "default" : "outline"}
                      size="sm"
                      onPress={() => setColors(item)}
                    >
                      <Text
                        style={{
                          color:
                            colors === item
                              ? theme.colors.background
                              : theme.colors.text,
                        }}
                      >
                        {capitalizeFirstChar(item)}
                      </Text>
                    </Button>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        )}

        {wallpaperProvider !== "pixabay" && wallpaperProvider !== "pexels" && (
          <Text className="text-muted-foreground">
            No specific filters available for {wallpaperProvider} yet.
          </Text>
        )}
      </View>

      <Button onPress={handleSearch} className="mt-4">
        <Text style={{ color: theme.colors.background }}>Search</Text>
      </Button>
      <Button onPress={handleReset} variant="destructive">
        <Text style={{ color: theme.colors.background }}>Reset</Text>
      </Button>
    </ScrollView>
  );
}
