import { useScreenSize } from "@/hooks/useScreenSize";
import { PixabayImage } from "@/types/types";
import React from "react";
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import PixabayLink from "./Link";
import { ThemedText } from "./ThemedText/ThemedText";

const ImageDetails = ({ item }: { item: PixabayImage }) => {
  const { width } = useScreenSize();

  return (
    <>
      <View style={{ gap: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Image
            source={{ uri: item.userImageURL }}
            style={{
              width: width / 5,
              height: width / 5,
              borderRadius: 50,
            }}
          />
          <View style={{ gap: 8 }}>
            <ThemedText type="subtitle">{item.user}</ThemedText>
            <TouchableOpacity
              style={{
                backgroundColor: "#333333",
                borderRadius: 50,
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}
              onPress={() =>
                Linking.openURL(
                  `https://pixabay.com/users/${item.user}-${item.user_id}`
                )
              }
            >
              <ThemedText>Visit user profile</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.infoWrapper}>
        <View style={styles.infoItem}>
          <ThemedText type="defaultSemiBold">Views</ThemedText>
          <ThemedText>{item.views}</ThemedText>
        </View>
        <View style={styles.infoItem}>
          <ThemedText type="defaultSemiBold">Downloads</ThemedText>
          <ThemedText>{item.downloads}</ThemedText>
        </View>
        <View style={styles.infoItem}>
          <ThemedText type="defaultSemiBold">Likes</ThemedText>
          <ThemedText>{item.likes}</ThemedText>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.infoItem}>
          <ThemedText type="defaultSemiBold">Image tags</ThemedText>
          <ThemedText>{item.tags}</ThemedText>
        </View>
        <View style={styles.infoItem}>
          <ThemedText type="defaultSemiBold">Image dimensions</ThemedText>
          <ThemedText>
            {item.imageWidth} x {item.imageHeight}
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[
            styles.infoItem,
            {
              backgroundColor: "#333333",
              marginVertical: 16,
            },
          ]}
          onPress={() => Linking.openURL(item.pageURL)}
        >
          <ThemedText>Download image</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText style={{ marginBottom: 24 }}>
          Image provided by <PixabayLink />
        </ThemedText>
      </View>
    </>
  );
};

export default ImageDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
  infoItem: {
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
