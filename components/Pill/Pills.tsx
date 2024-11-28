import { PixabayImageOrder } from "@/api/pixabay/types";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText/ThemedText";
import { PillsProps } from "./Pills.config";

const Pills = ({ selectedPill, items, onPillSelect }: PillsProps) => {
  const isPillSelected = (pill: PixabayImageOrder) => pill === selectedPill;

  return (
    <View style={styles.wrapper}>
      {items.map((pill) => (
        <TouchableOpacity
          key={pill}
          style={[
            styles.sortButton,
            {
              backgroundColor: isPillSelected(pill)
                ? "#00000020"
                : "transparent",
            },
          ]}
          onPress={() => onPillSelect(pill)}
        >
          <ThemedText
            type={isPillSelected(pill) ? "defaultSemiBold" : "default"}
            style={{
              textDecorationLine: isPillSelected(pill) ? "underline" : "none",
            }}
          >
            {pill}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Pills;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    height: "100%",
    zIndex: 2,
    gap: 16,
  },
  sortButton: {
    justifyContent: "center",
    paddingHorizontal: 18,
    borderRadius: 30,
  },
});
