import { useWallpaperContext } from "@/contexts/photos-context";
import React from "react";
import HorizontalList from "../HorizontalList/HorizontalList";

interface ThematicListProps {
  title: string;
  query: string;
  onHeaderPress: (query: string) => void;
}

const ThematicList = ({ title, query, onHeaderPress }: ThematicListProps) => {
  const { getWallpapers } = useWallpaperContext();

  const { data, isLoading } = getWallpapers({
    perPage: 10,
    query: query,
  });

  const wallpapers = data?.pages.flatMap((page) => page.wallpapers) || [];

  if (!isLoading && wallpapers.length === 0) return null;

  return (
    <HorizontalList
      title={title}
      data={wallpapers}
      isLoading={isLoading}
      onViewMore={() => onHeaderPress(query)}
    />
  );
};

export default ThematicList;
