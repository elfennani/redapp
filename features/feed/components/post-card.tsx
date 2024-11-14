import ThemedText from "@/components/ThemedText";
import { Image, useImage } from "expo-image";
import { memo, useRef, useState } from "react";
import { View } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import PagerView from "react-native-pager-view";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Post from "../types/Post";
import { useMMKVNumber } from "react-native-mmkv";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
      <View style={styles.card}>
        <View>
          <ThemedText size="extraSmall" weight="bold" style={styles.mutedText}>
            r/{post.subreddit.name} • u/{post.author?.name}
          </ThemedText>
          <ThemedText weight="bold">{post.title}</ThemedText>
        </View>
        <PostContent id={post.id} content={post.content} />
        {post.body && (
          <ThemedText
            size="extraSmall"
            style={styles.mutedText}
            numberOfLines={3}
          >
            {post.body}
          </ThemedText>
        )}
        <ThemedText size="extraSmall" style={styles.mutedText}>
          {post.votes} Votes • {post.comments} Comments
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const PostContent = ({
  id,
  content,
}: {
  id: string;
  content: Post["content"];
}) => {
  const { styles } = useStyles(stylesheet);
  const [position, setPosition] = useState(0);
  const currId = useRef(id);

  if (currId.current != id) {
    setPosition(0);
    currId.current = id;
  }
  const [preferedRes] = useMMKVNumber("prefs.prefered-resolution");
  const [minRes] = useMMKVNumber("prefs.prefered-resolution");
  const PREFERED_RESOLUTION = preferedRes || 480;
  const MIN_RESOLUTION = minRes || 128;

  if (content?.type === "images" && content.images.length === 1) {
    const image = content.images[0];
    let resolution = image.resolutions?.[0];

    if (resolution) {
      image.resolutions!.forEach((res) => {
        const prev = Math.abs(resolution!.width - PREFERED_RESOLUTION);
        const curr = Math.abs(res.width - PREFERED_RESOLUTION);

        if (res.width > MIN_RESOLUTION && curr < prev) {
          resolution = res;
        }
      });
    }

    return (
      <View
        style={styles.imageContainer(
          resolution?.width ?? image.original.width,
          resolution?.height ?? image.original.height
        )}
      >
        <Image
          recyclingKey={image.id}
          source={resolution?.url ?? image.original.url}
          style={styles.image}
        />
      </View>
    );
  }

  if (content?.type === "images") {
    const smallestAR = content.images.reduce(
      (prev, curr) =>
        curr.original.width / curr.original.height > prev
          ? curr.original.width / curr.original.height
          : prev,
      -Infinity
    );
    return (
      <TouchableWithoutFeedback>
        <View style={styles.pagerContainer}>
          <PagerView
            orientation={"horizontal"}
            style={styles.pager(smallestAR)}
            initialPage={0}
            onPageSelected={(ev) => setPosition(ev.nativeEvent.position)}
          >
            {content.images.map((image, index) => {
              let resolution = image.resolutions?.[0];
              if (resolution) {
                image.resolutions!.forEach((res) => {
                  const prev = Math.abs(
                    resolution!.width - PREFERED_RESOLUTION
                  );
                  const curr = Math.abs(res.width - PREFERED_RESOLUTION);
                  if (res.width > MIN_RESOLUTION && curr < prev) {
                    resolution = res;
                  }
                });
              }
              return (
                <View
                  collapsable={false}
                  key={index}
                  style={[styles.imageContainer(smallestAR, 1, 0)]}
                >
                  <Image
                    recyclingKey={image.id}
                    source={resolution?.url ?? image.original.url}
                    style={styles.image}
                  />
                </View>
              );
            })}
          </PagerView>
          <View style={styles.progress}>
            <ThemedText
              size="extraSmall"
              weight="bold"
              style={styles.progressText}
            >
              {position + 1} / {content.images.length}
            </ThemedText>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  // if(content?.type == "video")
  // TODO: Handles videos

  return null;
};

export default memo(PostCard);

const stylesheet = createStyleSheet((theme) => ({
  mutedText: {
    color: theme.colors.textMuted,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    gap: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: (width: number, height: number, border = 1) => ({
    width: "100%",
    overflow: "hidden",
    borderColor: theme.colors.border,
    borderWidth: border,
    borderRadius: border * 12,
    aspectRatio: width / height,
  }),
  pager: (aspectRatio: number) => ({
    aspectRatio,
  }),
  pagerContainer: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: "relative",
  },
  progress: {
    position: "absolute",
    alignSelf: "center",
    bottom: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 100,
  },
  progressText: {
    color: "white",
  },
}));
