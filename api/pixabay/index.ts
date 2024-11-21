import { PixabayImageResponse } from "./types";

const PIXABAY_API_URL = `https://pixabay.com/api/?key=${process.env.EXPO_PUBLIC_PIXABAY_API_KEY}`;

export const getPopularImages = async () => {
  const response = await fetch(PIXABAY_API_URL);
  const data = (await response.json()) as PixabayImageResponse;
  return data.hits;
};

export const getLatestImages = async () => {
  const response = await fetch(`${PIXABAY_API_URL}&order=latest`);
  const data = (await response.json()) as PixabayImageResponse;
  return data.hits;
};
