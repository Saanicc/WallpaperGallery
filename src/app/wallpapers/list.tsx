import WallpaperList from "@/screens/WallpaperList";
import {
  Category,
  ColorType,
  PexelsImageSize,
  PixabayImageOrder,
  PixabayOrientation,
} from "@/types/types";
import { useLocalSearchParams } from "expo-router";

export type ListScreenProps = {
  orderBy: PixabayImageOrder;
  category: Category;
  query: string;
  orientation: PixabayOrientation;
  color: ColorType;
  editorsChoice: string;
  size: PexelsImageSize;
};

export default function ListScreen() {
  const { orderBy, category, query, orientation, color, editorsChoice, size } =
    useLocalSearchParams<ListScreenProps>();

  return (
    <WallpaperList
      orderBy={orderBy}
      category={category}
      query={query}
      orientation={orientation}
      color={color}
      editorsChoice={editorsChoice}
      size={size}
    />
  );
}
