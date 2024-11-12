import storage from "@/utils/mmkv";
import { useEffect, useState } from "react";
import { getSession } from "../api/sessions";

function getActiveSession() {
  const activeSessionId = storage.getString("active-session");

  if (activeSessionId) return getSession(activeSessionId);
}

export default function useActiveSession() {
  const [session, setSession] = useState(getActiveSession());

  useEffect(() => {
    const subscribe = storage.addOnValueChangedListener((key) => {
      if (key.includes("session")) {
        setSession(getActiveSession());
      }
    });

    return subscribe.remove;
  }, []);

  return session;
}
