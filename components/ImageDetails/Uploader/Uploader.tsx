import { ThemedText } from "@/components/ThemedText/ThemedText";
import { colors } from "@/constants/colors";
import { PADDING, PADDING_VERTICAL } from "@/constants/style";
import { useScreenSize } from "@/hooks/useScreenSize";
import React from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
import { UploaderProps } from "./Uploader.config";

const Uploader = ({ imageUrl, username, userId }: UploaderProps) => {
  const { width } = useScreenSize();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: PADDING,
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
      <View>
        <ThemedText type="subtitle">{username}</ThemedText>
        <TouchableOpacity
          style={{
            backgroundColor: colors.button,
            borderRadius: 50,
            paddingVertical: PADDING_VERTICAL,
            paddingHorizontal: PADDING,
          }}
          onPress={() =>
            Linking.openURL(`https://pixabay.com/users/${username}-${userId}`)
          }
        >
          <ThemedText>Visit user profile</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Uploader;
