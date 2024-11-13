import authfetch from "@/features/auth/api/authfetch";
import useActiveSession from "@/features/auth/hooks/use-active-session";
import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "../types/User.response";
import mapUser from "../api/map-user";

const useActiveUser = () => {
  const session = useActiveSession();

  return useQuery({
    queryKey: [session!.id, "user", "active"],
    queryFn: async () => {
      const res = await authfetch((headers) =>
        fetch("https://oauth.reddit.com/api/v1/me", { headers })
      );

      const data: UserResponse = await res.json();
      return mapUser(data);
    },
    enabled: !!session,
  });
};

export default useActiveUser;
