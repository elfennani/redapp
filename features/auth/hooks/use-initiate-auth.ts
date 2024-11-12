import { useMutation } from "@tanstack/react-query";
import * as WebBrowser from "expo-web-browser";

const useInitiateAuth = () =>
  useMutation({
    mutationKey: ["auth", "initiate"],
    mutationFn: async () => initiateAuth(),
    onError: (err) => console.error(err),
  });

export default useInitiateAuth;

const initiateAuth = async () => {
  const client_id = process.env.EXPO_PUBLIC_CLIENT_ID;
  const redirect_uri = process.env.EXPO_PUBLIC_REDIRECT_URI;

  if (!client_id || !redirect_uri)
    throw new Error("Client ID and/or redirect URI were not provided in .env");

  const baseUrl = "https://www.reddit.com/api/v1/authorize";
  const params = new URLSearchParams({
    client_id,
    response_type: "code",
    state: "VERY_RANDOM_STATE",
    redirect_uri,
    duration: "permanent",
    scope: [
      "identity",
      "edit",
      "flair",
      "history",
      "modconfig",
      "modflair",
      "modlog",
      "modposts",
      "modwiki",
      "mysubreddits",
      "privatemessages",
      "read",
      "report",
      "save",
      "submit",
      "subscribe",
      "vote",
      "wikiedit",
      "wikiread",
    ].join(","),
  });

  await WebBrowser.openBrowserAsync(`${baseUrl}?${params.toString()}`);
};
