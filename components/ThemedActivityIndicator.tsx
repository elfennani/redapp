import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

type Props = {};

const ThemedActivityIndicator = (props: Props) => {
  const theme = useTheme();
  return <ActivityIndicator color={theme.colors.primary} size={40} />;
};

export default ThemedActivityIndicator;

const styles = StyleSheet.create({});
