export type Comment = { id: string; postId: string; author: { username: string; name: string; avatar: string }; text: string; time: number };

const PREFIX = "gram.comments.";

function key(postId: string) { return PREFIX + postId; }

export function getComments(postId: string): Comment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key(postId));
    const arr = raw ? (JSON.parse(raw) as Comment[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}

export function addComment(postId: string, text: string): Comment {
  const author = { username: "satyam.dev", name: "Satyam Kumar", avatar: "https://i.pravatar.cc/96?img=15" };
  const c: Comment = { id: String(Date.now()), postId, author, text: text.slice(0, 500), time: Date.now() };
  const current = getComments(postId);
  const next = [...current, c];
  try { localStorage.setItem(key(postId), JSON.stringify(next)); } catch {}
  return c;
}
