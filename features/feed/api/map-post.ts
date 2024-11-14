import he from "he";
import Post from "../types/Post";
import PostResponse from "../types/Post.response";

export default function mapPost(post: PostResponse): Post {
  try {
    let icon: string | undefined = undefined;
    let content: Post["content"] = undefined;

    if (post.sr_detail.community_icon) {
      icon = he.decode(post.sr_detail.community_icon);
    }

    if (post.sr_detail.icon_img) {
      icon = he.decode(post.sr_detail.icon_img);
    }

    if (post.preview && post.preview.enabled) {
      const image = post.preview.images[0];
      content = {
        type: "images",
        images: [
          {
            id: image.id,
            original: {
              url: he.decode(image.source.url),
              width: image.source.width,
              height: image.source.height,
            },
            resolutions: image.resolutions.map((res) => ({
              ...res,
              url: he.decode(res.url),
            })),
          },
        ],
      };
    }
    type Defined<T> = T extends undefined ? never : T;
    type ValueType<T> = T extends Record<any, infer V> ? V : never;
    if (post.media_metadata) {
      content = {
        type: "images",
        images: Object.entries(post.media_metadata)
          .filter(([, value]) => value.status === "valid")
          .map(([key, value]) => {
            if (value.e === "Image")
              return {
                id: key,
                caption:
                  post.gallery_data?.items.find((item) => item.media_id === key)
                    ?.caption || undefined,
                original: {
                  url: he.decode(value.s.u ?? value.s.gif ?? ""),
                  width: value.s.x,
                  height: value.s.y,
                },
                resolutions: value.p.map((res) => ({
                  url: he.decode(res.u),
                  width: res.x,
                  height: res.y,
                })),
              };

            return null;
          })
          .filter((image) => image != null),
      };
    }

    if (post.is_video && "reddit_video" in post.secure_media!) {
      const { hls_url, width, has_audio, height, duration } =
        post.secure_media.reddit_video;
      content = {
        type: "video",
        url: he.decode(hls_url),
        height,
        width,
        duration: duration * 1000,
        thumbnail: post.thumbnail || undefined,
      };
    }

    if (
      post.media_metadata &&
      Object.entries(post.media_metadata).some(([, m]) => m.e === "RedditVideo")
    ) {
      const video = Object.values(post.media_metadata).find(
        (m) => m.e === "RedditVideo"
      )!;
      content = {
        type: "video",
        url: he.decode(video.hlsUrl),
        height: video.y,
        width: video.x,
      };
    }

    return {
      id: post.id,
      comments: post.num_comments,
      created: post.created * 1000,
      isSelf: post.is_self,
      locked: post.locked,
      nsfw: post.over_18,
      votes: post.score,
      spoiler: post.spoiler,
      title: he.decode(post.title),
      author:
        post.author !== "[deleted]"
          ? { id: post.author_fullname.split("_")[1], name: post.author }
          : undefined,
      subreddit: {
        id: post.sr_detail.name.split("_")[1],
        name: post.subreddit,
        nsfw: post.sr_detail.over_18,
        subs: post.sr_detail.subscribers,
        color:
          post.sr_detail.icon_color ||
          post.sr_detail.primary_color ||
          undefined,
        description: post.sr_detail.public_description || undefined,
        icon,
        title: post.sr_detail.title || undefined,
      },
      body: post.selftext ? he.decode(post.selftext) : undefined,
      content,
    };
  } catch (e) {
    console.error(e, post);
    throw e;
  }
}
