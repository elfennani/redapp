import ThemedActivityIndicator from "@/components/ThemedActivityIndicator";
import ThemedText from "@/components/ThemedText";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import usePostList from "../hooks/use-posts-list.query";
import PostCard from "./post-card";

const FeedListing = () => {
  const { styles } = useStyles(stylesheet);
  const {
    data: posts,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
  } = usePostList();

  if (isPending) {
    return (
      <View style={styles.fullscreen}>
        <ThemedActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.fullscreen}>
        <ThemedText size="jumbo">Failed to load feed</ThemedText>
        <ThemedText>{error.message}</ThemedText>
      </View>
    );
  }

  return (
    <FlashList
      data={posts}
      extraData={styles}
      estimatedItemSize={126}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      renderItem={({ item: post }) => <PostCard post={post} />}
      refreshing={isRefetching}
      getItemType={(item) => item.content?.type}
      onRefresh={() => refetch()}
      onEndReached={() => {
        if (!isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.3}
      ListFooterComponent={() => {
        if (isFetchingNextPage) {
          return (
            <View style={styles.loadingContainer}>
              <ThemedActivityIndicator />
            </View>
          );
        }
        return null;
      }}
    />
  );
};

export default FeedListing;

const stylesheet = createStyleSheet((theme) => ({
  fullscreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  mutedText: {
    color: theme.colors.textMuted,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    gap: 8,
  },
  loadingContainer: {
    paddingVertical: 64,
    alignItems: "center",
    justifyContent: "center",
  },
}));
