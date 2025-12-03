import { Text } from "@/components/ui/text";
import React from "react";
import { Linking } from "react-native";
import { LinkProps } from "./Link.config";

const Link = ({ url, linkText }: LinkProps) => {
  const openUrl = () => Linking.openURL(url);

  return (
    <Text variant="link" onPress={openUrl}>
      {linkText}
    </Text>
  );
};

export default Link;
