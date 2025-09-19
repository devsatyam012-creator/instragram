import { Post } from "@/types/instagram";

const STORAGE_KEY = "gram.user_posts";

export function getUserPosts(): Post[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? (JSON.parse(raw) as Post[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function addUserPost(partial: { imageDataUrl: string; caption: string }): Post {
  const newPost: Post = {
    id: String(Date.now()),
    user: {
      name: "Satyam Kumar",
      username: "satyam.dev",
      avatar: "https://i.pravatar.cc/128?img=15",
    },
    image: partial.imageDataUrl,
    liked: false,
    likes: 0,
    caption: partial.caption?.slice(0, 2000) || "",
    time: "Just now",
  };
  const current = getUserPosts();
  const next = [newPost, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  return newPost;
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
