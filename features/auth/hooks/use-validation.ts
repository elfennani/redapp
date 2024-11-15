import { useMutation } from "@tanstack/react-query";
import { Token } from "../types/Token";
import AuthUser from "../types/AuthUser";
import { insertSession, setActiveSession } from "../api/sessions";
import { ToastAndroid } from "react-native";
import { router } from "expo-router";
import he from "he";
import { Session } from "../types/Session";

const useValidation = () =>
  useMutation({
    mutationKey: ["auth", "validation"],
    mutationFn: async (code?: string) => {
      if (!code) throw new Error("No 'code' parameter was provided");
      const client_id = process.env.EXPO_PUBLIC_CLIENT_ID;
      const redirect_uri = process.env.EXPO_PUBLIC_REDIRECT_URI;

      if (!client_id || !redirect_uri)
        throw new Error(
          "Client ID and/or redirect URI were not provided in .env"
        );

      const credentials = btoa(`${client_id}:`);

      const res = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri,
        }).toString(),
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-type": "application/x-www-form-urlencoded",
        },
      });

      if (res.status != 200) {
        throw new Error(await res.json());
      }

      const token: Token = await res.json();
      const userResponse = await fetch("https://oauth.reddit.com/api/v1/me", {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const userData: AuthUser = await userResponse.json();
      const session: Session = {
        id: userData.name,
        token,
        expiration: Date.now() + token.expires_in * 1000,
        user: {
          fullname:
            userData?.subreddit?.title && he.decode(userData.subreddit.title),
          icon: userData.icon_img && he.decode(userData.icon_img),
          id: userData.id,
          username: userData.name,
        },
      };

      insertSession(session);
      setActiveSession(session.id);
    },
    onSuccess: () => {
      ToastAndroid.show("Signed in successfully", ToastAndroid.SHORT);
      router.dismissAll();
    },
    onError: (err) => {
      ToastAndroid.show("Failed to sign in", ToastAndroid.SHORT);
      console.error(err);
    },
  });

export default useValidation;
