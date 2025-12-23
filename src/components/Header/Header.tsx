import { PADDING } from "@/constants/style";
import React, { PropsWithChildren } from "react";
import { Platform, StyleSheet, View } from "react-native";

type HeaderProps = {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
} & PropsWithChildren;

const Header = ({ leftComponent, rightComponent, children }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftAction}>{leftComponent}</View>
      <View style={styles.center}>{children}</View>
      <View style={styles.rightAction}>{rightComponent}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    paddingHorizontal: PADDING,
    top: Platform.OS === "android" ? 10 : 0,
  },
  leftAction: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  center: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightAction: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
