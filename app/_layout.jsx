// ./app/_layout.jsx  (or wherever your RootLayout lives)
import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/config/reactQuery";
import AuthProvider from "@/context/AuthContext";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar hidden={true} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
          <Stack.Screen
            name="user/profile/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="user/booking/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="user/booking/[id]/edit"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="admin/settingAdjust"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="cabins/[cabinId]"
            options={{ headerShown: false }}
          />
        </Stack>
        <Toast />
      </QueryClientProvider>
    </AuthProvider>
  );
}
