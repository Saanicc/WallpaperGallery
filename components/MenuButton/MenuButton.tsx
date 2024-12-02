import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MenuButtonProps } from "./MenuButton.config";

const MenuButton = ({ icon, iconColor, onPress }: MenuButtonProps) => {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <Ionicons
        name={icon}
        size={30}
        color={iconColor ? iconColor : "#ffffff"}
      />
    </TouchableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  menuButton: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
