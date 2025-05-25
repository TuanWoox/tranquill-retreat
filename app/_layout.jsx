// ./app/_layout.jsx
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

          <Stack.Screen
            name="auth"
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="user"
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="admin"
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="cabins"
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
        </Stack>

        <Toast />
      </QueryClientProvider>
    </AuthProvider>
  );
}
