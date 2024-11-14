import React, { useMemo } from "react";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import IconButton from "./IconButton";
import ThemedText, { ThemedTextProps } from "./ThemedText";
import { router } from "expo-router";

type Props = ViewProps;

const Header = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const { top } = useSafeAreaInsets();
  const [hasIconLeft, hasIconRight] = useMemo(() => {
    let hasIconLeft = false;
    let hasIconRight = false;
    React.Children.forEach(props.children, (child) => {
      if (
        React.isValidElement(child) &&
        (child.type as any).name === HeaderIconLeft.displayName
      ) {
        hasIconLeft = true;
      }

      if (
        React.isValidElement(child) &&
        (child.type as any).name === HeaderIconRight.displayName
      ) {
        hasIconRight = true;
      }
    });

    return [hasIconLeft, hasIconRight] as const;
  }, [props.children]);

  return (
    <View
      {...props}
      style={[styles.container(top, hasIconLeft, hasIconRight), props.style]}
    />
  );
};

type HeaderIconLeftProps = { back?: boolean } & ViewProps;

const HeaderIconLeft = ({ back = false, ...props }: HeaderIconLeftProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View {...props} style={[styles.iconsContainer, props.style]}>
      {back && <IconButton name="arrow-back" onPress={() => router.back()} />}
      {props.children}
    </View>
  );
};

HeaderIconLeft.displayName = "HeaderIconLeft";
const HeaderIconRight = (props: ViewProps) => {
  const { styles } = useStyles(stylesheet);
  return <View {...props} style={[styles.iconsContainer, props.style]} />;
};

HeaderIconRight.displayName = "HeaderIconRight";

const HeaderTitle = ({
  size = "medium",
  weight = "black",
  ...props
}: ThemedTextProps) => {
  const { styles } = useStyles(stylesheet);
  const { top } = useSafeAreaInsets();

  return (
    <View style={styles.titleContainer(top)}>
      <ThemedText
        {...props}
        size={size}
        weight={weight}
        style={[styles.title, props.style]}
      />
    </View>
  );
};

Header.LeftIcons = HeaderIconLeft;
Header.RightIcons = HeaderIconRight;
Header.Title = HeaderTitle;
export default Header;

const stylesheet = createStyleSheet((theme) => ({
  container: (top: number, iconLeft: boolean, iconRight: boolean) => {
    return {
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
      zIndex: 30,
    };
  },
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
