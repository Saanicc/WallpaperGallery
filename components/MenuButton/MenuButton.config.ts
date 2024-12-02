export type MenuButtonProps = {
  icon: "arrow-back" | "heart" | "heart-outline";
  onPress: (...args: any) => void;
  iconColor?: string;
};
