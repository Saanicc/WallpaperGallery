import Photo from "@/components/Photo/Photo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { colors } from "@/constants/colors";
import { GAP } from "@/constants/style";
import { PixabayImage } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import { Text } from "../ui/text";

interface HorizontalListProps {
  title: string;
  data: PixabayImage[];
  onViewMore: () => void;
  isLoading: boolean;
}

const HorizontalList = ({
  title,
  data,
  onViewMore,
  isLoading,
}: HorizontalListProps) => {
  return (
    <View className="flex-1">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <LoadingSkeleton />
        </View>
      ) : (
        <Card className="w-full h-full p-4 rounded-none border-0">
          <Pressable onPress={onViewMore}>
            <CardHeader className="flex-row items-center justify-between p-0">
              <CardTitle>
                <Text variant="h4">{title}</Text>
              </CardTitle>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.primary}
              />
            </CardHeader>
          </Pressable>
          <CardContent className="flex-1 p-0">
            <FlatList
              data={data}
              keyExtractor={(item) => String(item.id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <View key={item.id} style={{ width: SCREEN_WIDTH / 2 }}>
                  <Photo item={item} />
                </View>
              )}
            />
          </CardContent>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    gap: GAP,
  },
});

export default HorizontalList;
