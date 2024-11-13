import {
  DarkTheme,
  DefaultTheme,
  ExtendedTheme,
} from "@react-navigation/native";

export const lightTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#dc2626",
    primaryForeground: "#fef2f2",
    textMuted: "#737373",
    text: "#0a0a0a",
    border: "#e5e5e5",
  },
};

export const darkTheme: ExtendedTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#dc2626",
    primaryForeground: "#fef2f2",
    textMuted: "#a3a3a3",
    text: "#fafafa",
    border: "#3f3f46",
  },
};
