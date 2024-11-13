import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React, { ComponentProps } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";

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
  const theme = useTheme();
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
