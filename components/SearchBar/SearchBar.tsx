import { BORDER_RADIUS } from "@/constants/style";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../ui/input";
import { Text } from "../ui/text";

interface SearchBarProps {
  placeholder: string;
  query: string;
  setQuery: (query: string) => void;
  onSearch?: () => void;
  disableReturnKey?: boolean;
  error?: string;
}

export default function SearchBar({
  placeholder,
  query,
  setQuery,
  onSearch,
  disableReturnKey = false,
  error,
}: SearchBarProps) {
  const router = useRouter();
  const theme = useTheme();

  const handleSearch = () => {
    if (query.trim()) {
      router.push({
        pathname: "/wallpapers/list",
        params: {
          query: query.trim(),
        },
      });
      setQuery("");
    }
  };

  return (
    <View className="flex-1">
      <View
        className="flex-row items-center"
        style={{
          backgroundColor: theme.colors.card,
          borderRadius: BORDER_RADIUS,
        }}
      >
        <View className="flex-row items-center flex-1 relative">
          <Ionicons
            name="search"
            size={20}
            color={theme.colors.text}
            className="absolute left-4 z-10"
            onPress={onSearch || handleSearch}
            disabled={query.trim().length === 0}
          />
          <Input
            placeholder={placeholder}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={
              disableReturnKey ? undefined : onSearch || handleSearch
            }
            className="pl-12 rounded-lg"
            returnKeyLabel="Search"
            returnKeyType={disableReturnKey ? "done" : "search"}
          />
        </View>
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => setQuery("")}
            className="absolute right-4"
          >
            <Ionicons name="close-circle" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text variant="small" className="text-red-500 mt-2">
          {error}
        </Text>
      )}
    </View>
  );
}
