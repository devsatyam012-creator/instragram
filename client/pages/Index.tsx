import StoryBar from "@/components/instagram/StoryBar";
import PostCard from "@/components/instagram/PostCard";
import type { Post } from "@/types/instagram";
import { useEffect, useState } from "react";
import { getUserPosts } from "@/lib/posts";

const basePosts: Post[] = [
  {
    id: "1",
    user: {
      name: "Satyam Kumar",
      username: "satyam.dev",
      avatar: "https://i.pravatar.cc/128?img=15",
    },
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1600&auto=format&fit=crop",
    liked: true,
    likes: 1284,
    caption: "Sunset coding session hits different ✨",
    time: "2h",
  },
  {
    id: "2",
    user: {
      name: "Neha Sharma",
      username: "neha.sh",
      avatar: "https://i.pravatar.cc/128?img=32",
    },
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    liked: false,
    likes: 987,
    caption: "Weekend vibes in the hills 🌄",
    time: "5h",
  },
  {
    id: "3",
    user: {
      name: "Arjun Mehta",
      username: "arjun.me",
      avatar: "https://i.pravatar.cc/128?img=48",
    },
    image: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1600&auto=format&fit=crop",
    liked: false,
    likes: 543,
    caption: "Chai aur baarish – perfect combo ☕🌧️",
    time: "1d",
  },
];

export default function Index() {
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    setUserPosts(getUserPosts());
  }, []);

  const posts: Post[] = [...userPosts, ...basePosts];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-4 sm:py-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <main className="mx-auto w-full max-w-xl">
          <StoryBar />
          <div>
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </main>
        <aside className="sticky top-20 hidden self-start lg:block">
          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/96?img=15" alt="Me" className="h-12 w-12 rounded-full object-cover" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">satyam.dev</p>
                <p className="text-xs text-muted-foreground">Satyam Kumar</p>
              </div>
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-xs font-semibold text-muted-foreground">Suggested for you</p>
              <ul className="mt-2 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/64?img=${(i + 21) % 70}`} alt="User" className="h-8 w-8 rounded-full object-cover" />
                      <div className="leading-tight">
                        <p className="text-sm font-medium">user_{i + 1}</p>
                        <p className="text-xs text-muted-foreground">Follows you</p>
                      </div>
                    </div>
                    <button onClick={() => (window.localStorage.setItem(`follow.user_${i+1}`, "1"), location.reload(), undefined)} className="text-sm font-semibold text-primary">Follow</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
