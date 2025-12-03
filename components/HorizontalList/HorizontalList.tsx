import Photo from "@/components/Photo/Photo";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { GAP } from "@/constants/style";
import { PixabayImage } from "@/types/types";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

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
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">{title}</ThemedText>
        <Pressable onPress={onViewMore}>
          <ThemedText type="link">View more</ThemedText>
        </Pressable>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View
            style={{
              width: SCREEN_WIDTH / 2,
            }}
          >
            <Photo item={item} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContent: {
    gap: GAP,
  },
});

export default HorizontalList;
