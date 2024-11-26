import { useQuery } from "@tanstack/react-query";
import { PixabayImageOrder, PixabayImageResponse } from "./types";

const PIXABAY_API_URL = `https://pixabay.com/api/?key=${process.env.EXPO_PUBLIC_PIXABAY_API_KEY}`;

export const usePixabayImages = ({
  queryKey,
  orderBy,
}: {
  queryKey: string;
  orderBy: PixabayImageOrder;
}) => {
  return useQuery<PixabayImageResponse>({
    queryKey: [`${queryKey}-wallpapers`],
    queryFn: async () => {
      const response = await fetch(`${PIXABAY_API_URL}&order=${orderBy}`).then(
        (res) => res.json()
      );
      return response;
    },
  });
};
