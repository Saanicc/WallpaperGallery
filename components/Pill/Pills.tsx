import { BORDER_RADIUS, PADDING, PADDING_VERTICAL } from "@/helpers/constants";
import { PixabayImageOrder } from "@/types/types";
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
          disabled={isPillSelected(pill)}
          style={[
            styles.sortButton,
            {
              backgroundColor: isPillSelected(pill) ? "#FFFFFF" : "transparent",
              ...(selectedPill === PixabayImageOrder.POPULAR && {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }),
              ...(selectedPill === PixabayImageOrder.LATEST && {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }),
            },
          ]}
          onPress={() => onPillSelect(pill)}
        >
          <ThemedText
            type="defaultSemiBold"
            style={{
              color: isPillSelected(pill) ? "#000000" : "#FFFFFF",
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
    zIndex: 2,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: BORDER_RADIUS,
  },
  sortButton: {
    justifyContent: "center",
    paddingVertical: PADDING_VERTICAL,
    paddingHorizontal: PADDING,
    borderRadius: 14,
  },
});
