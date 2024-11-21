import React from "react";
import { Linking, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

const PixabayLink = () => {
  const openUrl = () => Linking.openURL("https://pixabay.com");
  return (
    <ThemedText type="link" onPress={openUrl}>
      Pixabay
    </ThemedText>
  );
};

export default PixabayLink;

const styles = StyleSheet.create({});
