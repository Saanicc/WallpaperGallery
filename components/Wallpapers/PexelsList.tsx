import { useWallpaperContext } from "@/contexts/photos-context";
import { PixabayImageOrder } from "@/types/types";
import React from "react";
import HorizontalList from "../HorizontalList/HorizontalList";

const PexelsList = ({
  onHeaderPress,
}: {
  onHeaderPress: (orderBy?: PixabayImageOrder | undefined) => void;
}) => {
  const { getWallpapers } = useWallpaperContext();

  const { data: latestData, isLoading: latestLoading } = getWallpapers({
    perPage: 10,
  });

  const wallpapers = latestData?.pages.flatMap((page) => page.wallpapers) || [];

  return (
    <>
      <HorizontalList
        title="Curated Wallpapers"
        data={wallpapers}
        isLoading={latestLoading}
        onViewMore={() => onHeaderPress()}
      />
    </>
  );
};

export default PexelsList;
