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
import useTheme from "@/hooks/useTheme";
import { WallpaperProviders } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

const Settings = () => {
  const systemTheme = useTheme();

  const {
    theme,
    setTheme,
    wallpaperProvider,
    setWallpaperProvider,
    clearCache,
  } = useSettings();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { clearRecentlyViewed } = useRecentlyViewed();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [themeTriggerWidth, setThemeTriggerWidth] = useState(0);
  const [providerTriggerWidth, setProviderTriggerWidth] = useState(0);

  const handleClearCache = async () => {
    queryClient.clear();
    await clearRecentlyViewed();
    await clearCache();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: systemTheme.colors.background,
      }}
    >
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
              <SelectTrigger
                onLayout={(ev) => {
                  setThemeTriggerWidth(ev.nativeEvent.layout.width);
                }}
              >
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent style={{ width: themeTriggerWidth }}>
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
              <SelectTrigger
                onLayout={(ev) => {
                  setProviderTriggerWidth(ev.nativeEvent.layout.width);
                }}
              >
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent style={{ width: providerTriggerWidth }}>
                <SelectGroup>
                  <SelectLabel>Provider</SelectLabel>
                  {[...WallpaperProviders]
                    .sort((a, b) => a.localeCompare(b))
                    .map((provider) => (
                      <SelectItem
                        key={provider}
                        label={
                          provider === "unsplash"
                            ? "Unsplash (Coming Soon)"
                            : capitalizeFirstChar(provider)
                        }
                        value={provider}
                        disabled={provider === "unsplash"}
                      />
                    ))}
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
            <DialogContent className="p-4">
              <DialogHeader>
                <DialogTitle>Clear Cache</DialogTitle>
                <DialogDescription>
                  {`Are you sure you want to clear the image cache?\nThis will remove all cached images and data.`}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" onPress={handleClearCache}>
                      <Text>Confirm</Text>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-4">
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
          <Button
            variant="outline"
            onPress={() => router.push("/about" as any)}
          >
            <Text>About App</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
