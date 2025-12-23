import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { capitalizeFirstChar } from "@/helpers/functions";
import useTheme from "@/hooks/useTheme";
import { categories, Category } from "@/types/types";
import React from "react";
import { ScrollView, View } from "react-native";

const CategoriesFilter = ({
  category,
  setCategory,
}: {
  category: Category | "";
  setCategory: (category: Category | "") => void;
}) => {
  const theme = useTheme();

  return (
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
                  category === "" ? theme.colors.background : theme.colors.text,
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
  );
};

export default CategoriesFilter;
