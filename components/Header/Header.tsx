import React, { PropsWithChildren } from "react";
import { Platform, StyleSheet, View } from "react-native";

const Header = ({ children }: PropsWithChildren) => {
  return <View style={styles.header}>{children}</View>;
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    top: Platform.OS === "android" ? 10 : 0,
  },
});
