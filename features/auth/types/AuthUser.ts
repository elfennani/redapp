export default interface AuthUser {
  icon_img?: string;
  name: string;
  id: string;
  subreddit?: {
    title?: string;
  };
}
