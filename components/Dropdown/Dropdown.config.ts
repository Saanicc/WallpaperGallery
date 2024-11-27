import { PixabayImageOrder } from "@/api/pixabay/types";

export type DropdownProps = {
  label: string;
  filterItems: PixabayImageOrder[];
  onDropdownSelect: (item: any) => void;
};
