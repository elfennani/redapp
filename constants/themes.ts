import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

export const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#dc2626",
  },
};

export const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#dc2626",
  },
};
