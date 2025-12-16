import { useRecentlyViewed } from "@/contexts/recently-viewed-context";
import React from "react";
import HorizontalList from "../HorizontalList/HorizontalList";

const RecentlyViewedList = () => {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) return null;

  return (
    <HorizontalList
      title="Recently Viewed"
      data={recentlyViewed}
      isLoading={false}
      onViewMore={() => {}}
    />
  );
};

export default RecentlyViewedList;
