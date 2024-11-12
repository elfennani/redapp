import storage from "@/utils/mmkv";
import { Session } from "../types/Session";

export function getSessions(): Session[] {
  const idSessions: string[] = JSON.parse(
    storage.getString("sessions") ?? "[]"
  );

  return idSessions
    .map((id) => {
      const data = storage.getString(`session-data-${id}`);
      if (!data) return null;

      return JSON.parse(data);
    })
    .filter(Boolean);
}

export function insertSession(session: Session) {
  storage.set(`session-data-${session.id}`, JSON.stringify(session));
  const ids: string[] = JSON.parse(storage.getString("sessions") ?? "[]");
  const set = new Set(...ids);
  set.add(session.id);
  storage.set("sessions", JSON.stringify([...set]));
}

export function setActiveSession(id: string) {
  storage.set("active-session", id);
}

export function getSession(id: string): Session | undefined {
  const data = storage.getString(`session-data-${id}`);

  if (data) {
    return JSON.parse(data);
  }
}
