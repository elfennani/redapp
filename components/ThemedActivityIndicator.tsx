import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useStyles } from "react-native-unistyles";

type Props = {};

const ThemedActivityIndicator = (props: Props) => {
  const { theme } = useStyles();
  return <ActivityIndicator color={theme.colors.primary} size={40} />;
};

export default ThemedActivityIndicator;

const styles = StyleSheet.create({});
