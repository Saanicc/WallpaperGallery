import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MenuButtonProps } from "./MenuButton.config";

const MenuButton = ({
  icon,
  iconColor,
  size,
  disabled,
  onPress,
}: MenuButtonProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      disabled={disabled ? disabled : false}
      style={styles.menuButton}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={size ? size : 30}
        color={iconColor ? iconColor : theme.colors.primary}
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
