import ThemedActivityIndicator from "@/components/ThemedActivityIndicator";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { insertSession, setActiveSession } from "@/features/auth/api/sessions";
import AuthUser from "@/features/auth/types/AuthUser";
import { Token } from "@/features/auth/types/Token";
import storage from "@/utils/mmkv";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import he from "he";
import { useEffect } from "react";
import { ToastAndroid } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { v4 } from "uuid";

type Params = {
  code?: string;
};

const AuthPage = () => {
  const { code } = useLocalSearchParams<Params>();
  const { styles } = useStyles(stylesheet);

  const { mutate, isError } = useMutation({
    mutationKey: ["auth", "validation"],
    mutationFn: async () => {
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
      const session = {
        id: userData.name,
        token,
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

  useEffect(() => {
    mutate();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedActivityIndicator />
      <ThemedText weight="bold" style={styles.info}>
        Authenticating...
      </ThemedText>
    </ThemedView>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  info: {
    color: theme.colors.primary,
  },
}));

export default AuthPage;
