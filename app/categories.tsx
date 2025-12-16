import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { Text } from "@/components/ui/text";
import { BORDER_RADIUS, GAP, PADDING } from "@/constants/style";
import { useScaleAnimation } from "@/hooks/animations/scale";
import useTheme from "@/hooks/useTheme";
import { categories, PixabayImageOrder } from "@/types/types";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

const Categories = () => {
  const router = useRouter();
  const theme = useTheme();

  const { stylez, handlePressIn, handlePressOut } = useScaleAnimation();

  const handlePress = () => {
    router.push({
      pathname: "/wallpapers/list",
      params: { orderBy: PixabayImageOrder.LATEST },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Categories",
          headerTintColor: theme.colors.text,
          headerStyle: { backgroundColor: theme.colors.background },
          animation: "slide_from_right",
        }}
      />
      <FlatList
        data={categories}
        keyExtractor={(_, index) => categories[index]}
        renderItem={({ item }) => <CategoryCard item={item} />}
        numColumns={2}
        columnWrapperStyle={{ gap: GAP }}
        contentContainerStyle={{
          padding: PADDING,
          paddingTop: 0,
          gap: GAP,
        }}
        ListHeaderComponent={
          <Animated.View
            style={[
              {
                borderRadius: BORDER_RADIUS,
                marginTop: PADDING,
                borderColor: theme.colors.border,
                borderWidth: 1,
              },
              stylez,
            ]}
          >
            <Pressable
              onPress={handlePress}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: PADDING,
              }}
            >
              <Text>All</Text>
            </Pressable>
          </Animated.View>
        }
      />
    </View>
  );
};

export default Categories;
