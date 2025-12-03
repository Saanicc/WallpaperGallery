import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { PADDING } from "@/constants/style";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React from "react";
import { Linking, View } from "react-native";
import { UploaderProps } from "./Uploader.config";

const Uploader = ({ imageUrl, username, userId }: UploaderProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: PADDING,
      }}
    >
      <View className="flex-row items-center gap-4">
        <Avatar
          alt="User Avatar"
          style={{ width: SCREEN_WIDTH / 8, height: SCREEN_WIDTH / 8 }}
          className="w-12 h-12"
        >
          <AvatarImage source={{ uri: imageUrl }} />
          <AvatarFallback>
            <Text>{username.charAt(0).toUpperCase()}</Text>
          </AvatarFallback>
        </Avatar>
        <Text variant="h4">{username}</Text>
      </View>
      <Button
        variant="secondary"
        size="default"
        onPress={() =>
          Linking.openURL(`https://pixabay.com/users/${username}-${userId}`)
        }
      >
        <Text>Visit Profile</Text>
      </Button>
    </View>
  );
};

export default Uploader;
