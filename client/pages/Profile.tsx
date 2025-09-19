import { getUserPosts } from "@/lib/posts";
import { useEffect, useState } from "react";
import type { Post } from "@/types/instagram";

export default function ProfilePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(getUserPosts());
  }, []);

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <header className="flex items-center gap-6">
        <img src="https://i.pravatar.cc/160?img=15" alt="Profile" className="h-24 w-24 rounded-full object-cover" />
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold">satyam.dev</h1>
            <a href="/create" className="rounded-md border px-3 py-1 text-sm font-semibold">Create</a>
          </div>
          <ul className="flex gap-6 text-sm">
            <li><span className="font-semibold">{posts.length}</span> posts</li>
            <li><span className="font-semibold">1,248</span> followers</li>
            <li><span className="font-semibold">506</span> following</li>
          </ul>
          <p className="text-sm text-muted-foreground">Satyam Kumar • Developer • Photo enthusiast</p>
        </div>
      </header>

      <hr className="my-6" />

      {posts.length === 0 ? (
        <div className="rounded-xl border p-8 text-center text-muted-foreground">No posts yet. Create your first post!</div>
      ) : (
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          {posts.map((p) => (
            <div key={p.id} className="aspect-square overflow-hidden bg-muted">
              <img src={p.image} alt={p.caption} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
