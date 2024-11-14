import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { useStyles } from "react-native-unistyles";

export type ThemedTextProps = TextProps & {
  weight?: keyof typeof weights;
  size?: keyof typeof fontSizes;
};

const weights = {
  light: "Inter_300Light",
  base: "Inter_400Regular",
  bold: "Inter_600SemiBold",
  black: "Inter_800ExtraBold",
};

const fontSizes = {
  extraSmall: 10,
  small: 12,
  base: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  jumbo: 32,
  huge: 40,
};

const ThemedText = ({
  weight = "base",
  size = "base",
  ...props
}: ThemedTextProps) => {
  const { theme } = useStyles();

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: weights[weight],
          fontSize: fontSizes[size],
          color: theme.colors.text,
        },
        props.style,
      ]}
    />
  );
};

export default ThemedText;

const styles = StyleSheet.create({});
