import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { GAP, PADDING } from "@/constants/style";
import { useRecentlyViewed } from "@/contexts/recently-viewed-context";
import { useSettings } from "@/contexts/settings-context";
import { capitalizeFirstChar } from "@/helpers/functions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingsList = () => {
  const {
    theme,
    setTheme,
    wallpaperProvider,
    setWallpaperProvider,
    clearCache,
  } = useSettings();
  const queryClient = useQueryClient();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { clearRecentlyViewed } = useRecentlyViewed();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClearCache = async () => {
    queryClient.clear();
    await clearRecentlyViewed();
    await clearCache();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        marginVertical: PADDING,
        paddingHorizontal: PADDING,
        gap: GAP,
      }}
    >
      <View className="gap-2">
        <Text variant="large">Appearance</Text>
        <View className="gap-2">
          <Text className="text-muted-foreground">Theme</Text>
          <Select
            value={{ value: theme, label: capitalizeFirstChar(theme) }}
            onValueChange={(option) => setTheme(option?.value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Theme</SelectLabel>
                <SelectItem label="System" value="system" />
                <SelectItem label="Light" value="light" />
                <SelectItem label="Dark" value="dark" />
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
      </View>

      <View className="gap-2">
        <Text variant="large">Content</Text>
        <View className="gap-2">
          <Text className="text-muted-foreground">Wallpaper Source</Text>
          <Select
            value={{
              value: wallpaperProvider,
              label: capitalizeFirstChar(wallpaperProvider),
            }}
            onValueChange={(option) =>
              setWallpaperProvider(option?.value as any)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Provider</SelectLabel>
                <SelectItem label="Pixabay" value="pixabay" />
                <SelectItem
                  label="Unsplash (Coming Soon)"
                  value="unsplash"
                  disabled
                />
                <SelectItem label="Pexels" value="pexels" />
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
      </View>

      <View className="gap-2">
        <Text variant="large">Data & Storage</Text>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Text>Clear Cache</Text>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Clear Cache</DialogTitle>
              <DialogDescription>
                Are you sure you want to clear the image cache? This will remove
                all downloaded images and data.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" onPress={handleClearCache}>
                    <Text>Confirm</Text>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Cache</DialogTitle>
                    <DialogDescription>
                      Cache cleared successfully!
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        onPress={() => setIsDialogOpen(false)}
                      >
                        <Text>Close</Text>
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>

      <View className="gap-2">
        <Text variant="large">About</Text>
        <Button variant="outline" onPress={() => router.push("/about" as any)}>
          <Text>About App</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default SettingsList;
