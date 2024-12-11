export type MenuButtonProps = {
  icon: "arrow-back" | "star" | "star-outline" | "trash-outline";
  onPress: (...args: any) => void;
  disabled?: boolean;
  size?: number;
  iconColor?: string;
};
