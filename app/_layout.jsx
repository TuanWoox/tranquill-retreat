import { Stack } from "expo-router";

import "../global.css";
import { StatusBar } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/config/reactQuery";
import AuthProvider from "@/context/AuthContext";
import BackgroundLayout from "@/components/BackgroundLayout";

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BackgroundLayout>
          <StatusBar hidden={true} />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login" options={{ headerShown: false }} />
            <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
          </Stack>
        </BackgroundLayout>
      </QueryClientProvider>
    </AuthProvider>
  );
}
