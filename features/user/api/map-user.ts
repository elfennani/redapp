import he from "he";
import User from "../types/User";
import { UserResponse } from "../types/User.response";

export default function mapUser(user: UserResponse): User {
  return {
    id: user.id,
    banner: user.subreddit.banner_img
      ? he.decode(user.subreddit.banner_img)
      : undefined,
    createdAt: user.created,
    description: user.subreddit.public_description
      ? he.decode(user.subreddit.public_description)
      : undefined,
    icon: user.icon_img ? he.decode(user.icon_img) : undefined,
    karma: { total: user.total_karma },
    name: user.name,
    title: user.subreddit.title ? he.decode(user.subreddit.title) : undefined,
  };
}
