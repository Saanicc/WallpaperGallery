export type MenuButtonProps = {
  icon: "arrow-back" | "heart" | "heart-outline" | "trash-outline";
  onPress: (...args: any) => void;
  disabled?: boolean;
  size?: number;
  iconColor?: string;
};
