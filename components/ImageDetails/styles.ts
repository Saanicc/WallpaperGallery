import { BORDER_RADIUS, PADDING, PADDING_VERTICAL } from "@/constants/style";
import { StyleSheet } from "react-native";

export const sharedStyles = StyleSheet.create({
  infoItem: {
    alignItems: "center",
    borderRadius: BORDER_RADIUS,
    paddingVertical: PADDING_VERTICAL,
    paddingHorizontal: PADDING,
  },
});
