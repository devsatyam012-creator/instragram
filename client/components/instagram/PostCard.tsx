import { useState } from "react";
import { Bookmark, Heart, MessageCircle, MoreHorizontal, SendHorizonal } from "lucide-react";
import type { Post } from "@/types/instagram";

export default function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((n) => (liked ? n - 1 : n + 1));
  };

  return (
    <article className="mb-6 rounded-lg border bg-card text-card-foreground">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={post.user.avatar} alt={post.user.name} className="h-9 w-9 rounded-full object-cover" />
          <div className="leading-tight">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span>{post.user.username}</span>
              <span className="text-xs text-muted-foreground">• {post.time}</span>
            </div>
            <p className="text-xs text-muted-foreground">{post.user.name}</p>
          </div>
        </div>
        <button className="p-1" aria-label="More">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </header>

      <div className="relative aspect-square w-full bg-muted/50">
        <img src={post.image} alt={post.caption} className="h-full w-full object-cover" onDoubleClick={toggleLike} />
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className={`p-1 transition-transform ${liked ? "animate-like" : ""}`} onClick={toggleLike} aria-label="Like">
              <Heart className={`h-6 w-6 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
            </button>
            <button className="p-1" aria-label="Comment">
              <MessageCircle className="h-6 w-6" />
            </button>
            <button className="p-1" aria-label="Share">
              <SendHorizonal className="h-6 w-6" />
            </button>
          </div>
          <button className="p-1" onClick={() => setSaved((s) => !s)} aria-label="Save">
            <Bookmark className={`h-6 w-6 ${saved ? "fill-foreground" : ""}`} />
          </button>
        </div>
        <p className="mt-2 text-sm font-semibold">{likes.toLocaleString()} likes</p>
        <p className="mt-1 text-sm">
          <span className="font-semibold mr-2">{post.user.username}</span>
          {post.caption}
        </p>
        <button className="mt-1 text-xs text-muted-foreground">View all comments</button>
        <div className="mt-2 flex items-center gap-2 border-t pt-2">
          <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Add a comment..." />
          <button className="text-sm font-semibold text-primary">Post</button>
        </div>
      </div>
    </article>
  );
}
