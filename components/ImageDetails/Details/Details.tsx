import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import React from "react";
import { View } from "react-native";
import { DetailsProps } from "./Details.config";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between py-2 border-b border-border">
    <Text className="text-muted-foreground">{label}</Text>
    <Text className="font-medium">{value}</Text>
  </View>
);

const Details = ({ tags, imageDim, type, size }: DetailsProps) => {
  const tagList = tags.split(",").map((tag) => tag.trim());
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <View className="gap-6 my-4">
      <View>
        <Text variant="h4" className="mb-3">
          Tags
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {tagList.map((tag, index) => (
            <Badge key={index} variant="secondary">
              <Text>{tag}</Text>
            </Badge>
          ))}
        </View>
      </View>

      <View>
        <Text variant="h4" className="mb-3">
          Image Info
        </Text>
        <InfoRow
          label="Resolution"
          value={`${imageDim.width} x ${imageDim.height}`}
        />
        <InfoRow label="Type" value={type.toUpperCase()} />
        <InfoRow label="Size" value={formatSize(size)} />
      </View>
    </View>
  );
};

export default Details;
