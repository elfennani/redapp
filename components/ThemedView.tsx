import React from "react";
import { View, ViewProps } from "react-native";
import { useStyles } from "react-native-unistyles";

type Props = ViewProps;

const ThemedView = (props: Props) => {
  const { theme } = useStyles();
  return (
    <View
      {...props}
      style={[{ backgroundColor: theme.colors.background }, props.style]}
    />
  );
};

export default ThemedView;
