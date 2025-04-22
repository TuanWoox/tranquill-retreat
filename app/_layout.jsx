import { Stack } from "expo-router";

import "../global.css";
import { StatusBar } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/config/reactQuery";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
