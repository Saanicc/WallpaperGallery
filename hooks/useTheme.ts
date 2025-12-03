import { NAV_THEME } from "@/lib/theme";
import { useColorScheme } from "react-native";

const useTheme = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;

  return theme;
};

export default useTheme;
