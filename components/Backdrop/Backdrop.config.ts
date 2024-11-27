import { PixabayImage } from "@/api/pixabay/types";
import { SharedValue } from "react-native-reanimated";

export type BackdropProps = {
  photo: PixabayImage;
  index: number;
  scrollX: SharedValue<number>;
};

export type BackdropPhotosProps = {
  photos: PixabayImage[];
  scrollX: SharedValue<number>;
  isLoading: boolean;
};
