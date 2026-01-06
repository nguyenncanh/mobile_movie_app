import { QueryProvider } from "@/providers/QueryProvider";
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </QueryProvider>
  );
}
