import { useFavoriteContext } from "@/contexts/favorite-context";
import useTheme from "@/hooks/useTheme";
import React, { useState } from "react";
import { Text, View } from "react-native";
import MenuButton from "../MenuButton/MenuButton";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const FavoriteHeaderRight = () => {
  const { favoriteWallpapers, deleteAllFavorites } = useFavoriteContext();
  const theme = useTheme();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    deleteAllFavorites();
    setIsDialogOpen(false);
  };

  return (
    <View style={{ marginRight: 16 }}>
      <MenuButton
        disabled={favoriteWallpapers.length === 0 && true}
        icon="trash-outline"
        iconColor={
          favoriteWallpapers.length === 0
            ? theme.colors.card
            : theme.colors.primary
        }
        size={25}
        onPress={() => setIsDialogOpen(true)}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove favorites</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove all favorites?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Dialog className="flex-row justify-end gap-2">
              <DialogClose asChild>
                <Button variant="default" onPress={handleCancel}>
                  <Text>Cancel</Text>
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onPress={handleConfirm}>
                  <Text>Confirm</Text>
                </Button>
              </DialogClose>
            </Dialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default FavoriteHeaderRight;
