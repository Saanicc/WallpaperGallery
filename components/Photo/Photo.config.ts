import { PixabayImage } from "@/api/pixabay/types";
import { SharedValue } from "react-native-reanimated";

export type PhotoProps = {
  item: PixabayImage;
  index: number;
  width: number;
  height: number;
  scrollX: SharedValue<number>;
};
