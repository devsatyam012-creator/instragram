export type ActivityType = "like" | "comment" | "post" | "follow" | "message";
export type ActivityItem = {
  id: string;
  type: ActivityType;
  time: number; // timestamp
  actor: { username: string; name: string; avatar: string };
  meta?: Record<string, unknown>;
};

const KEY = "gram.activity";

function read(): ActivityItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? (JSON.parse(raw) as ActivityItem[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function write(items: ActivityItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
}

const currentUser = {
  username: "satyam.dev",
  name: "Satyam Kumar",
  avatar: "https://i.pravatar.cc/128?img=15",
};

export const Activity = {
  list(): ActivityItem[] {
    return read().sort((a, b) => b.time - a.time).slice(0, 100);
  },
  add(type: ActivityType, meta?: Record<string, unknown>) {
    const items = read();
    items.push({ id: String(Date.now() + Math.random()), type, time: Date.now(), actor: currentUser, meta });
    write(items);
  },
};
