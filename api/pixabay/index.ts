export const getRandomImages = async () => {
  const response = await fetch(
    `https://pixabay.com/api/?key=${process.env.EXPO_PUBLIC_PIXABAY_API_KEY}`
  );
  const data = (await response.json()) as PixabayImageResponse;
  return data.hits;
};
