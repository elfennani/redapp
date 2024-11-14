export default interface PostResponse {
  id: string;
  subreddit: string;
  title: string;
  score: number;
  is_self: boolean;
  created: number;
  over_18: boolean;
  spoiler: boolean;
  locked: boolean;
  author: string;
  author_fullname: string;
  num_comments: number;
  send_replies: boolean;

  selftext_html: string | null;
  selftext: string | null;
  media_metadata?: Record<
    string,
    | {
        id: string;
        status: string;
        /** Mime type. eg. image/jpg */
        m: string;
        e: "Image";
        p: { x: number; y: number; u: string }[];
        s: { x: number; y: number; u?: string; gif?: string };
      }
    | {
        id: string;
        e: "RedditVideo";
        hlsUrl: string;
        status: string;
        x: number;
        y: number;
      }
  >;
  gallery_data?: {
    items: { caption: string; media_id: string; id: number }[];
  };

  is_reddit_media_domain: boolean;
  url_overridden_by_dest?: string;

  is_video: boolean;
  secure_media:
    | {
        reddit_video: {
          width: number;
          height: number;
          hls_url: string;
          duration: number;
          has_audio: boolean;
        };
      }
    | {
        type: string;
        oembed: {
          provider_url: string;
          title: string;
          width: number;
          height: number;
          thumbnail_url: string;
          html: string;
        };
      }
    | null;

  thumbnail?: string;
  preview?: {
    enabled: boolean;
    images: [
      {
        id: string;
        // TODO: Add variants
        source: {
          url: string;
          width: number;
          height: number;
        };
        resolutions: {
          url: string;
          width: number;
          height: number;
        }[];
      }
    ];
  };

  sr_detail: {
    community_icon?: string;
    title?: string;
    over_18: boolean;
    primary_color?: string;
    icon_img?: string;
    icon_color?: string;
    subscribers: number;
    name: string;
    public_description?: string;
    user_is_subscriber: boolean;
  };
}
