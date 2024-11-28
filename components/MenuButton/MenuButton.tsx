import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { MenuButtonProps } from "./MenuButton.config";

const MenuButton = ({ icon, iconColor, onPress }: MenuButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        borderRadius: 50,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={30} color={iconColor} />
    </TouchableOpacity>
  );
};

export default MenuButton;
