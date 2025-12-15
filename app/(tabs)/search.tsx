import Filters from "@/components/Filters/Filters";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { GAP, PADDING } from "@/constants/style";
import { useFilterContext } from "@/contexts/filter-context";
import { useSettings } from "@/contexts/settings-context";
import useTheme from "@/hooks/useTheme";
import { ScrollView } from "react-native";

export default function SearchScreen() {
  const theme = useTheme();
  const { wallpaperProvider } = useSettings();
  const { handleReset, handleSearch } = useFilterContext();

  return (
    <ScrollView
      contentContainerStyle={{ padding: PADDING, gap: GAP }}
      style={{ backgroundColor: theme.colors.background }}
      keyboardShouldPersistTaps="handled"
    >
      <SearchBar
        placeholder={`Search ${wallpaperProvider}...`}
        onSearch={handleSearch}
        disableReturnKey
      />

      <Filters />

      <Button onPress={handleSearch} className="mt-4">
        <Text style={{ color: theme.colors.background }}>Search</Text>
      </Button>
      <Button variant="ghost" onPress={handleReset}>
        <Text style={{ color: theme.colors.text }}>Clear</Text>
      </Button>
    </ScrollView>
  );
}
