export type Story = {
  id: string;
  user: { username: string; name: string; avatar: string };
  image: string; // data URL
  time: number; // ms
  viewed?: boolean;
};

const KEY = "gram.stories";
const EXPIRY_MS = 24 * 60 * 60 * 1000;

const currentUser = {
  username: "satyam.dev",
  name: "Satyam Kumar",
  avatar: "https://i.pravatar.cc/96?img=15",
};

export function getStories(): Story[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    let arr = raw ? (JSON.parse(raw) as Story[]) : [];
    const now = Date.now();
    arr = arr.filter((s) => now - s.time < EXPIRY_MS);
    arr.sort((a, b) => b.time - a.time);
    return arr;
  } catch {
    return [];
  }
}

export function addStory(imageDataUrl: string): Story {
  const story: Story = {
    id: String(Date.now()),
    user: currentUser,
    image: imageDataUrl,
    time: Date.now(),
  };
  const list = getStories();
  list.unshift(story);
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
  return story;
}

export function markViewed(id: string) {
  const list = getStories();
  const idx = list.findIndex((s) => s.id === id);
  if (idx >= 0) {
    list[idx].viewed = true;
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch {}
  }
}
