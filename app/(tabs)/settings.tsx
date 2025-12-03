import SettingsList from "@/components/SettingsList/SettingsList";
import useTheme from "@/hooks/useTheme";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const settings = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <SettingsList />
    </SafeAreaView>
  );
};

export default settings;
