import IconButton from "@/components/IconButton";
import Skeleton from "@/components/Skeleton";
import ThemedText from "@/components/ThemedText";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import useActiveUser from "../hooks/use-active-user.query";

type Props = {};

const DrawerUserCard = (props: Props) => {
  const { data: user, isPending, isError } = useActiveUser();
  const { styles } = useStyles(stylesheet);

  if (isPending) {
    return <DrawerUserCardSkeleton />;
  }

  if (isError) {
    return <DrawerUserCardSkeleton error />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          recyclingKey={`user-icon-${user.id}`}
          source={user.icon}
          style={styles.icon}
        />
        <IconButton name="more-horiz" style={styles.moreIcon} />
      </View>
      <View style={styles.namesContainer}>
        <ThemedText size="large">{user.title ?? `u/${user.name}`}</ThemedText>
        <ThemedText weight="bold" size="small" style={styles.username}>
          {user.title ? `u/${user.name}` : ""}
        </ThemedText>
      </View>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <ThemedText weight="bold" size="small" style={styles.username}>
          {user.karma.total} Karma
        </ThemedText>
      </View>
    </View>
  );
};

const DrawerUserCardSkeleton = ({ error = false }: { error?: boolean }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Skeleton circular style={[styles.icon, styles.skeletonBg(error)]} />
        <Skeleton circular style={[styles.button, styles.skeletonBg(error)]} />
      </View>
      <View style={styles.namesContainer}>
        <Skeleton style={[styles.titleSkeleton, styles.skeletonBg(error)]} />
        <Skeleton style={[styles.usernameSkeleton, styles.skeletonBg(error)]} />
      </View>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Skeleton style={[styles.usernameSkeleton, styles.skeletonBg(error)]} />
        <Skeleton style={[styles.usernameSkeleton, styles.skeletonBg(error)]} />
      </View>
    </View>
  );
};

export default DrawerUserCard;

const stylesheet = createStyleSheet((theme) => ({
  container: { padding: 32, gap: 16 },
  skeletonBg: (error: boolean) => ({
    backgroundColor: error ? theme.colors.notification : theme.colors.border,
    opacity: error ? 0.12 : 1,
  }),
  icon: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: theme.colors.background,
  },
  moreIcon: {
    marginRight: -8,
  },
  button: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleSkeleton: {
    width: "66%",
    height: 28.4,
  },
  usernameSkeleton: {
    width: "40%",
    height: 19.6,
  },
  namesContainer: {
    gap: 2,
  },
  username: {
    color: theme.colors.textMuted,
  },
}));
