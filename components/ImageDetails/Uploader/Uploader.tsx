import { ThemedText } from "@/components/ThemedText/ThemedText";
import { useScreenSize } from "@/hooks/useScreenSize";
import React from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
import { UploaderProps } from "./Uploader.config";

const Uploader = ({ imageUrl, username, userId }: UploaderProps) => {
  const { width } = useScreenSize();

  return (
    <View style={{ gap: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: width / 5,
            height: width / 5,
            borderRadius: 50,
          }}
        />
        <View style={{ gap: 8 }}>
          <ThemedText type="subtitle">{username}</ThemedText>
          <TouchableOpacity
            style={{
              backgroundColor: "#333333",
              borderRadius: 50,
              paddingVertical: 8,
              paddingHorizontal: 16,
            }}
            onPress={() =>
              Linking.openURL(`https://pixabay.com/users/${username}-${userId}`)
            }
          >
            <ThemedText>Visit user profile</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Uploader;
