import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // Refetch data when the window is focused
      refetchOnWindowFocus: true,
      // Refetch data when the network is reconnected
      refetchOnReconnect: true,
      // Optional: refetch interval (for polling)
      refetchInterval: false, // Disable polling by default
    },
  },
});

export default queryClient;
