import PixabayWallpapers from "@/components/PixabayWallpapers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <PixabayWallpapers />
    </QueryClientProvider>
  );
}
