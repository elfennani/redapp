import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
  orientation?: "horizontal" | "vertical";
  style?: StyleProp<ViewStyle>;
};

const Separator = ({ style, orientation = "horizontal" }: Props) => {
  const { styles } = useStyles(stylesheet);
  return <View style={[styles.separator(orientation), style]} />;
};

export default Separator;

const stylesheet = createStyleSheet((theme) => ({
  separator: (orientation: Props["orientation"]) => ({
    width: orientation === "horizontal" ? "auto" : 1,
    height: orientation === "horizontal" ? 1 : "auto",
    backgroundColor: theme.colors.border,
  }),
}));
