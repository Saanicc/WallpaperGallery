import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Directory, File, Paths } from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import { Alert, Linking } from "react-native";

const Download = ({
  pageURL,
  provider,
}: {
  pageURL: string;
  provider: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const handleSaveWallpaper = async () => {
    try {
      setLoading(true);

      if (permissionResponse?.status !== "granted") {
        const { status } = await requestPermission();
        if (status !== "granted") {
          Alert.alert(
            "Permission needed",
            "Please grant permission to save photos to your gallery."
          );
          return;
        }
      }

      const downloadsDir = new Directory(Paths.cache, "WallpaperGallery");
      if (downloadsDir.exists) {
        downloadsDir.delete();
      }
      downloadsDir.create();

      const { uri } = await File.downloadFileAsync(pageURL, downloadsDir);
      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync("WallpaperGallery");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("WallpaperGallery", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert("Success", "Image saved to gallery!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to download or save image");
    } finally {
      setLoading(false);
    }
  };

  if (provider === "pixabay") {
    return (
      <Button
        size="lg"
        className="w-full my-4"
        onPress={() => Linking.openURL(pageURL)}
      >
        <Text>Download Image</Text>
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className="w-full my-4"
      onPress={handleSaveWallpaper}
      disabled={loading}
    >
      <Text>{loading ? "Downloading..." : "Download Image"}</Text>
    </Button>
  );
};

export default Download;
