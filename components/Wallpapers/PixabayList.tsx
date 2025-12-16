import { useWallpaperContext } from "@/contexts/photos-context";
import { PixabayImageOrder } from "@/types/types";
import React from "react";
import HorizontalList from "../HorizontalList/HorizontalList";

const PixabayList = ({
  onHeaderPress,
}: {
  onHeaderPress: (orderBy?: PixabayImageOrder) => void;
}) => {
  const { getWallpapers } = useWallpaperContext();

  const { data: latestData, isLoading: latestLoading } = getWallpapers({
    perPage: 10,
    order: PixabayImageOrder.LATEST,
  });

  const { data: popularData, isLoading: popularLoading } = getWallpapers({
    perPage: 10,
    order: PixabayImageOrder.POPULAR,
  });

  const wallpapers = latestData?.pages.flatMap((page) => page.wallpapers) || [];

  const popularWallpapers =
    popularData?.pages.flatMap((page) => page.wallpapers) || [];

  return (
    <>
      <HorizontalList
        title="Latest"
        data={wallpapers}
        isLoading={latestLoading}
        onViewMore={() => onHeaderPress(PixabayImageOrder.LATEST)}
      />

      <HorizontalList
        title="Trending"
        data={popularWallpapers}
        isLoading={popularLoading}
        onViewMore={() => onHeaderPress(PixabayImageOrder.POPULAR)}
      />
    </>
  );
};

export default PixabayList;
