import { StyleSheet, Text } from "react-native";
import { ThemedTextProps } from "./ThemedText.config";

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
    fontFamily: "ArimaMadurai",
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: "ArimaMadurai",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontFamily: "ArimaMadurai",
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 28,
  },
  subtitle: {
    fontFamily: "ArimaMadurai",
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    fontFamily: "ArimaMadurai",
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
