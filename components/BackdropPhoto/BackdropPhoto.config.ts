import { PixabayImage } from "@/api/pixabay/types";
import { SharedValue } from "react-native-reanimated";

export type BackdropPhotoProps = {
  photo: PixabayImage;
  index: number;
  scrollX: SharedValue<number>;
};
