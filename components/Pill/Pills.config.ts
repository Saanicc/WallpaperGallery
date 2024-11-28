import { PixabayImageOrder } from "@/api/pixabay/types";

export type PillsProps = {
  selectedPill: PixabayImageOrder;
  items: PixabayImageOrder[];
  onPillSelect: (pill: PixabayImageOrder) => void;
};
