export interface UserResponse {
  id: string;
  icon_img?: string;
  created: number;
  name: string;
  total_karma: number;
  subreddit: {
    banner_img: string;
    title?: string;
    public_description?: string;
  };
}
