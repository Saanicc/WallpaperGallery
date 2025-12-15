import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useFilterContext } from "@/contexts/filter-context";
import { capitalizeFirstChar } from "@/helpers/functions";
import useTheme from "@/hooks/useTheme";
import { PixabayImageOrder } from "@/types/types";
import React from "react";
import { Pressable, View } from "react-native";
import CategoriesFilter from "./shared/Categories";
import ColorsFilter from "./shared/Colors";
import OrientationFilter from "./shared/Orientation";

export default function PixabayFilters() {
  const theme = useTheme();

  const {
    order,
    setOrder,
    selectedOrientation,
    setSelectedOrientation,
    category,
    setCategory,
    color,
    setColor,
    editorsChoice,
    setEditorsChoice,
  } = useFilterContext();

  return (
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
      <OrientationFilter
        orientation={selectedOrientation}
        setOrientation={setSelectedOrientation}
      />
      <CategoriesFilter category={category} setCategory={setCategory} />
      <ColorsFilter color={color} setColor={setColor} />

      {/* Editor's Choice */}
      <View className="flex-row items-center justify-between">
        <Pressable
          className="flex-1 flex-row items-center justify-between"
          onPress={() => setEditorsChoice(!editorsChoice)}
        >
          <Text>Editor's Choice</Text>
          <Switch checked={editorsChoice} onCheckedChange={setEditorsChoice} />
        </Pressable>
      </View>
    </View>
  );
}
