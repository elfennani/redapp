import authfetch from "@/features/auth/api/authfetch";
import useActiveSession from "@/features/auth/hooks/use-active-session";
import DataResponse from "@/types/DataKind.response";
import { ListingResponse } from "@/types/Listing.response";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import PostResponse from "../types/Post.response";
import mapPost from "../api/map-post";
import Post from "../types/Post";

type Page = {
  after: string;
  data: Post[];
};

const usePostList = () => {
  const session = useActiveSession();

  return useInfiniteQuery({
    queryKey: [session!.id, "feed", "best"],
    initialPageParam: "",
    getNextPageParam: (lastPage: Page) => lastPage.after!!,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        after: pageParam,
        sr_detail: "1",
      }).toString();

      const res = await authfetch((headers) =>
        fetch(`https://oauth.reddit.com/best?${params}`, { headers })
      );

      type Response = DataResponse<ListingResponse<DataResponse<PostResponse>>>;
      const data: Response = await res.json();
      const mapped = data.data.children.map((post) => mapPost(post.data));

      return {
        after: data.data.after!!,
        data: mapped,
      };
    },
    retry: false,
    select: (data) => data.pages.flatMap((page) => page.data),
  });
};

export default usePostList;
