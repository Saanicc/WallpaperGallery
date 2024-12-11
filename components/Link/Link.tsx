import React from "react";
import { Linking } from "react-native";
import { ThemedText } from "../ThemedText/ThemedText";
import { LinkProps } from "./Link.config";

const Link = ({ url, linkText }: LinkProps) => {
  const openUrl = () => Linking.openURL(url);

  return (
    <ThemedText type="link" onPress={openUrl}>
      {linkText}
    </ThemedText>
  );
};

export default Link;
