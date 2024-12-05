import { ThemedText } from "@/components/ThemedText/ThemedText";
import React from "react";
import { StyleSheet, View } from "react-native";

const categories = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#222222",
      }}
    >
      <ThemedText>Coming soon...</ThemedText>
    </View>
  );
};

export default categories;

const styles = StyleSheet.create({});
