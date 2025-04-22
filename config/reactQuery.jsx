import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global cache time for all queries
      cacheTime: 1000 * 60 * 5, // 5 minutes

      // Stale time: how long to wait before considering data stale
      staleTime: 10, // 10s

      // Retry failed requests
      retry: 3, // Retry up to 3 times

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
