import SettingsList from "@/components/SettingsList/SettingsList";
import useTheme from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";

const settings = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <SettingsList />
    </View>
  );
};

export default settings;
