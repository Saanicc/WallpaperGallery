import { TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export enum Font {
  ArimaMadurai_100Thin = "ArimaMadurai_100Thin",
  ArimaMadurai_200ExtraLight = "ArimaMadurai_200ExtraLight",
  ArimaMadurai_300Light = "ArimaMadurai_300Light",
  ArimaMadurai_400Regular = "ArimaMadurai_400Regular",
  ArimaMadurai_500Medium = "ArimaMadurai_500Medium",
  ArimaMadurai_700Bold = "ArimaMadurai_700Bold",
  ArimaMadurai_800ExtraBold = "ArimaMadurai_800ExtraBold",
  ArimaMadurai_900Black = "ArimaMadurai_900Black",
}
