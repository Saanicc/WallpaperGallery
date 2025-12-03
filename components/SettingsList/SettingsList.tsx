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
import { useSettings } from "@/contexts/settings-context";
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
    accentColor,
    setAccentColor,
  } = useSettings();
  const queryClient = useQueryClient();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 24,
        paddingBottom: insets.bottom + 16,
      }}
    >
      <View className="gap-4">
        <Text variant="h3">Appearance</Text>
        <View className="gap-2">
          <Text className="text-muted-foreground">Theme</Text>
          <Select
            value={{ value: theme, label: theme }}
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

        <View className="gap-2">
          <Text className="text-muted-foreground">Accent Color</Text>
          <Select
            value={{
              value: accentColor || "default",
              label: accentColor ? "Custom" : "Default",
            }}
            onValueChange={(option) => setAccentColor(option?.value as string)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select accent color" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Colors</SelectLabel>
                <SelectItem label="Default" value="" />
                <SelectItem label="Blue" value="#3b82f6" />
                <SelectItem label="Red" value="#ef4444" />
                <SelectItem label="Green" value="#22c55e" />
                <SelectItem label="Purple" value="#a855f7" />
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
      </View>

      <View className="gap-4">
        <Text variant="h3">Content</Text>
        <View className="gap-2">
          <Text className="text-muted-foreground">Wallpaper Source</Text>
          <Select
            value={{ value: wallpaperProvider, label: wallpaperProvider }}
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
                <SelectItem
                  label="Pexels (Coming Soon)"
                  value="pexels"
                  disabled
                />
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
      </View>

      <View className="gap-4">
        <Text variant="h3">Data & Storage</Text>
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
                  <Button
                    variant="destructive"
                    onPress={() => queryClient.clear()}
                  >
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

      <View className="gap-4">
        <Text variant="h3">About</Text>
        <Button variant="outline" onPress={() => router.push("/about" as any)}>
          <Text>About App</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default SettingsList;
