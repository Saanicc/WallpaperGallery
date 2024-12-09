import { StyleSheet, Text } from "react-native";
import { Font, ThemedTextProps } from "./ThemedText.config";

export function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: "#fff" },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: Font.ArimaMadurai_400Regular,
    fontSize: 16,
  },
  defaultSemiBold: {
    fontFamily: Font.ArimaMadurai_900Black,
    fontSize: 16,
  },
  title: {
    fontFamily: Font.ArimaMadurai_700Bold,
    fontSize: 28,
  },
  subtitle: {
    fontFamily: Font.ArimaMadurai_700Bold,
    fontSize: 20,
  },
  link: {
    fontFamily: Font.ArimaMadurai_700Bold,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
