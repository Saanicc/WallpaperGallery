import { useRecentlyViewed } from "@/contexts/recently-viewed-context";
import { useRouter } from "expo-router";
import React from "react";
import HorizontalList from "../HorizontalList/HorizontalList";

const RecentlyViewedList = () => {
  const { recentlyViewed } = useRecentlyViewed();
  const router = useRouter();

  if (recentlyViewed.length === 0) return null;

  return (
    <HorizontalList
      title="Recently Viewed"
      data={recentlyViewed}
      isLoading={false}
      onViewMore={() => router.push("/wallpapers/recent")}
    />
  );
};

export default RecentlyViewedList;
