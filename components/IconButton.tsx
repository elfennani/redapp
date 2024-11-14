import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { ComponentProps } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useStyles } from "react-native-unistyles";

type Props = {
  size?: number;
  name: ComponentProps<typeof MaterialIcons>["name"];
  color?: string;
} & TouchableOpacityProps;

const IconButton = ({
  name,
  color,
  size = 24,
  hitSlop = 8,
  ...props
}: Props) => {
  const { theme } = useStyles();
  return (
    <TouchableOpacity
      {...props}
      style={[{ padding: 8 }, props.style]}
      hitSlop={hitSlop}
    >
      <MaterialIcons
        size={size}
        name={name}
        color={color ?? theme.colors.text}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
