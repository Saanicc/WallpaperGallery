import Filters from "@/components/Filters/Filters";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { GAP, PADDING } from "@/constants/style";
import { useSettings } from "@/contexts/settings-context";
import useTheme from "@/hooks/useTheme";
import {
  Category,
  ColorType,
  Orientation,
  PexelsOrientation,
  PixabayImageOrder,
  PixabayOrientation,
} from "@/types/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function SearchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { wallpaperProvider } = useSettings();
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<PixabayImageOrder>(
    PixabayImageOrder.POPULAR
  );
  const [selectedOrientation, setSelectedOrientation] = useState<Orientation>(
    PixabayOrientation.ALL
  );
  const [category, setCategory] = useState<Category | "">("");
  const [color, setColor] = useState<ColorType | "">("");
  const [editorsChoice, setEditorsChoice] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    handleReset();
  }, [wallpaperProvider]);

  const handleSearch = () => {
    if (wallpaperProvider === "pexels") {
      if (!query && !category) {
        setError("Pexels requires a search query or category");
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
            selectedOrientation !== PixabayOrientation.ALL &&
            selectedOrientation !== PexelsOrientation.ALL
              ? selectedOrientation
              : undefined,
          category: category === "" ? undefined : category,
          color: color === "" ? undefined : color,
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
    setSelectedOrientation(
      wallpaperProvider === "pixabay"
        ? PixabayOrientation.ALL
        : PexelsOrientation.ALL
    );
    setCategory("");
    setColor("");
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

      <Filters
        order={order}
        setOrder={setOrder}
        orientation={selectedOrientation}
        setOrientation={setSelectedOrientation}
        category={category}
        setCategory={setCategory}
        color={color}
        setColor={setColor}
        editorsChoice={editorsChoice}
        setEditorsChoice={setEditorsChoice}
      />

      <Button onPress={handleSearch} className="mt-4">
        <Text style={{ color: theme.colors.background }}>Search</Text>
      </Button>
      <Button onPress={handleReset} variant="destructive">
        <Text style={{ color: theme.colors.background }}>Reset</Text>
      </Button>
    </ScrollView>
  );
}
