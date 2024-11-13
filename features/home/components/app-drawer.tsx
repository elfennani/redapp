import Separator from "@/components/Separator";
import ThemedView from "@/components/ThemedView";
import DrawerUserCard from "@/features/user/components/drawer-user-card";
import React from "react";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const AppDrawer = () => {
  const insets = useSafeAreaInsets();
  const { styles } = useStyles(stylesheet);

  return (
    <ThemedView style={styles.container(insets)}>
      <DrawerUserCard />
      <Separator style={{ marginHorizontal: 32 }} />
    </ThemedView>
  );
};

export default AppDrawer;

const stylesheet = createStyleSheet((theme) => ({
  container: (insets: EdgeInsets) => {
    return {
      flex: 1,
      backgroundColor: theme.colors.card,
      paddingTop: insets.top,
    };
  },
}));
