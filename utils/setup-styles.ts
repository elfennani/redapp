import { darkTheme, lightTheme } from "@/constants/themes";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { UnistylesRegistry } from "react-native-unistyles";

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

// override library types
declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({
  light: lightTheme,
  dark: darkTheme,
  // register other themes with unique names
}).addConfig({
  adaptiveThemes: true,
});
