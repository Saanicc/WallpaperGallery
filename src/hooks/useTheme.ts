import { useSettings } from "@/contexts/settings-context";
import { NAV_THEME } from "@/lib/theme";
import { useColorScheme } from "react-native";

const useTheme = () => {
  const { theme: settingsTheme } = useSettings();
  const colorScheme = useColorScheme();

  const activeTheme =
    settingsTheme === "system"
      ? colorScheme === "dark"
        ? "dark"
        : "light"
      : settingsTheme;

  const theme = activeTheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;

  return theme;
};

export default useTheme;
