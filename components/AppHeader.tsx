import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ThemedText from "./ThemedText";
import { View } from "react-native";
import IconButton from "./IconButton";

type Props = NativeStackHeaderProps;

const AppHeader = ({ route, options, navigation, back }: Props) => {
  const { styles } = useStyles(stylesheet);
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={styles.container(top, !!options.headerLeft, !!options.headerRight)}
    >
      <View style={styles.iconsContainer}>
        {!!back && <IconButton name="arrow-back" />}
        {options.headerLeft?.({})}
      </View>
      <View style={styles.titleContainer(top)}>
        <ThemedText size="medium" weight="black" style={styles.title}>
          {options.title ?? route.name}
        </ThemedText>
      </View>
      <View style={styles.iconsContainer}>{options.headerRight?.({})}</View>
    </View>
  );
};

export default AppHeader;

const stylesheet = createStyleSheet((theme) => ({
  container: (top: number, iconLeft: boolean, iconRight: boolean) => ({
    backgroundColor: theme.colors.card,
    paddingHorizontal: 16,
    paddingLeft: iconLeft ? 8 : 16,
    paddingRight: iconRight ? 8 : 16,
    paddingTop: top,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    height: top + 56,
    borderBottomWidth: theme.dark ? 1 : 0,
    elevation: theme.dark ? 0 : 2,
    shadowColor: theme.colors.textMuted,
    borderBottomColor: theme.colors.border,
    position: "relative",
    justifyContent: "space-between",
  }),
  iconsContainer: {
    flexDirection: "row",
    gap: 8,
    position: "relative",
    zIndex: 10,
  },
  titleContainer: (top) => ({
    paddingTop: top,
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  }),
  title: {
    textAlign: "center",
  },
}));
