import AppHeader from "@/components/AppHeader";
import "@/utils/setup-styles";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
import ThemedView from "@/components/ThemedView";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  let [loaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemedView style={StyleSheet.absoluteFillObject}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            header: (props) => <AppHeader {...props} />,
          }}
        >
          <Stack.Screen name="(auth)/signin" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/auth" options={{ headerShown: false }} />
          <Stack.Screen
            name="index"
            options={{
              title: "Home Feed",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </ThemedView>
  );
}
