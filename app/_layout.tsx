import AppHeader from "@/components/AppHeader";
import { darkTheme, lightTheme } from "@/constants/themes";
import { useColorScheme } from "@/hooks/useColorScheme";
import "@/utils/setup-styles";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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

  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider value={theme}>
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
    </ThemeProvider>
  );
}
