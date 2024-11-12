import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import {
  createStyleSheet,
  UnistylesVariants,
  useStyles,
} from "react-native-unistyles";
import ThemedText, { ThemedTextProps } from "./ThemedText";

export type ButtonProps = TouchableOpacityProps & {
  variant?: UnistylesVariants<typeof stylesheet>["variant"];
};

const Button = ({
  variant = "primary",
  activeOpacity = 0.8,
  ...props
}: ButtonProps) => {
  const { styles } = useStyles(stylesheet, { variant });
  return (
    <TouchableOpacity
      {...props}
      style={styles.button}
      activeOpacity={activeOpacity}
    />
  );
};

export type ButtonLabelProps = ThemedTextProps;

const ButtonLabel = ({ weight = "bold", ...props }: ButtonLabelProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <ThemedText
      {...props}
      style={[styles.label, props.style]}
      weight={weight}
    />
  );
};

Button.Label = ButtonLabel;

export default Button;

const stylesheet = createStyleSheet((theme) => ({
  button: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    variants: {
      variant: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.background,
        },
      },
    },
  },
  label: {
    color: theme.colors.background,
    fontSize: 14,
  },
}));
