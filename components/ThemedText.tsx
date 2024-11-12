import { StyleSheet, Text, TextProps, View } from "react-native";
import React from "react";

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
  return (
    <Text
      {...props}
      style={[
        { fontFamily: weights[weight], fontSize: fontSizes[size] },
        props.style,
      ]}
    />
  );
};

export default ThemedText;

const styles = StyleSheet.create({});
