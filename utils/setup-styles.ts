import { darkTheme, lightTheme } from "@/constants/themes";
import { Theme } from "@react-navigation/native";
import { EdgeInsets } from "react-native-safe-area-context";
import { UnistylesRegistry } from "react-native-unistyles";

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

// override library types
declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: Theme["colors"] & {
      /*
        base theme colors:
          - primary
          - background
          - card
          - text
          - border
          - notification
      */
      primaryForeground: string;
      textMuted: string;
    };
    fonts: Theme["fonts"];
  };
  export function useTheme(): ExtendedTheme;
}

UnistylesRegistry.addThemes({
  light: lightTheme,
  dark: darkTheme,
  // register other themes with unique names
}).addConfig({
  adaptiveThemes: true,
});
