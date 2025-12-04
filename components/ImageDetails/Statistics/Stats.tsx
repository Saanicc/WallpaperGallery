import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/colors";
import { GAP, PADDING } from "@/constants/style";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { StatisticsProps } from "./Statistics.config";

const StatItem = ({
  icon,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  label: string;
}) => (
  <View className="items-center gap-1">
    <Ionicons name={icon} size={24} color={colors.primary} />
    <Text className="font-bold text-lg">{value.toLocaleString()}</Text>
    <Text className="text-xs text-muted-foreground">{label}</Text>
  </View>
);

const Statistics = ({ views, downloads, likes }: StatisticsProps) => {
  return (
    <Card className="border-0 bg-secondary/30 mb-4">
      <CardContent className="flex-row justify-around py-4">
        <StatItem icon="eye-outline" value={views} label="Views" />
        <StatItem icon="download-outline" value={downloads} label="Downloads" />
        <StatItem icon="heart-outline" value={likes} label="Likes" />
      </CardContent>
    </Card>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  infoWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: PADDING,
    paddingHorizontal: PADDING,
    gap: GAP,
  },
});
