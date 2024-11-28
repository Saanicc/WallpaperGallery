import PixabayWallpapers from "@/components/PixabayWallpapers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EventProvider } from "react-native-outside-press";

const queryClient = new QueryClient();

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <EventProvider>
        <PixabayWallpapers />
      </EventProvider>
    </QueryClientProvider>
  );
}
