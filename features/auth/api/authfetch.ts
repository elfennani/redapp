import he from "he";
import AuthUser from "../types/AuthUser";
import RefreshedToken from "../types/RefreshedToken";
import { getActiveSession, insertSession } from "./sessions";
import { Header } from "react-native/Libraries/NewAppScreen";

export default async function authfetch<T>(
  callback: (headers: Headers) => T
): Promise<T> {
  let session = getActiveSession();

  if (!session) throw new Error("No session found");

  if (session.expiration < Date.now()) {
    const client_id = process.env.EXPO_PUBLIC_CLIENT_ID;
    if (!client_id)
      throw new Error(
        "Client ID and/or redirect URI were not provided in .env"
      );

    const credentials = btoa(`${client_id}:`);

    const res = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: session.token.refresh_token,
      }).toString(),
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-type": "application/x-www-form-urlencoded",
      },
    });

    if (res.status != 200) {
      throw new Error(await res.json());
    }

    const token: RefreshedToken = await res.json();

    const userResponse = await fetch("https://oauth.reddit.com/api/v1/me", {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    const userData: AuthUser = await userResponse.json();
    session = {
      id: userData.name,
      token: {
        ...token,
        refresh_token: session.token.refresh_token,
      },
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
  }

  return callback(
    new Headers({
      Authorization: `Bearer ${session.token.access_token}`,
    })
  );
}
