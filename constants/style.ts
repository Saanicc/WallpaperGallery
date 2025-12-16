import { useScreenSize } from "@/hooks/useScreenSize";
const { width } = useScreenSize();

export const PADDING = 16;
export const PADDING_VERTICAL = 8;
export const GAP = 10;
export const BORDER_RADIUS = 16;

export const IMAGE_WIDTH = (width - GAP * 3) / 2;
export const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;
