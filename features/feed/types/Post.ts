export default interface Post {
  id: string;
  title: string;
  votes: number;
  comments: number;
  spoiler: boolean;
  nsfw: boolean;
  locked: boolean;
  isSelf: boolean;
  created: number;
  author?: {
    id: string;
    name: string;
  };
  subreddit: {
    id: string;
    name: string;
    subs: number;
    nsfw: boolean;
    title?: string;
    icon?: string;
    color?: string;
    description?: string;
  };
  body?: string;
  content?:
    | {
        type: "images";
        images: {
          id: string;
          caption?: string;
          original: {
            width: number;
            height: number;
            url: string;
          };
          resolutions?: {
            width: number;
            height: number;
            url: string;
          }[];
        }[];
      }
    | {
        type: "video";
        thumbnail?: string;
        url: string;
        width: number;
        height: number;
        duration?: number;
      };
}
