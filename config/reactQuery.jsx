import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Data becomes stale immediately
      refetchOnWindowFocus: true, // Refetch on window focus
      refetchOnMount: true, // Refetch every time component mounts
      refetchOnReconnect: true, // Refetch when reconnecting to the internet
    },
  },
});

export default queryClient;
