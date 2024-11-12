import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, ViewProps } from "react-native";

type Props = ViewProps;

const ThemedView = (props: Props) => {
  const theme = useTheme();
  return (
    <View
      {...props}
      style={[{ backgroundColor: theme.colors.background }, props.style]}
    />
  );
};

export default ThemedView;
