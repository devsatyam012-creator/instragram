import { useEffect, useState } from "react";
import { X, SendHorizonal, ChevronLeft, ChevronRight } from "lucide-react";
import type { Story } from "@/lib/stories";
import { markViewed } from "@/lib/stories";
import ShareToMessage from "@/components/instagram/ShareToMessage";

export default function StoryViewer({ stories, startIndex = 0, onClose }: { stories: Story[]; startIndex?: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);
  const story = stories[index];
  const [progress, setProgress] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          next();
          return 0;
        }
        return p + 2.5; // ~4s
      });
    }, 100);
    markViewed(story.id);
    return () => clearInterval(id);
  }, [index]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => (i + 1 < stories.length ? i + 1 : (onClose(), i)));

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/90">
      <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
        <X className="h-5 w-5" />
      </button>

      <div className="absolute left-1/2 top-6 w-[92%] max-w-md -translate-x-1/2">
        <div className="mb-3 flex gap-1">
          {stories.map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded bg-white/30">
              <div className="h-full rounded bg-white transition-all" style={{ width: `${i < index ? 100 : i === index ? progress : 0}%` }} />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 text-white">
          <img src={story.user.avatar} className="h-8 w-8 rounded-full object-cover" />
          <div className="text-sm font-medium">{story.user.username}</div>
          <button onClick={() => setShareOpen(true)} className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            <SendHorizonal className="h-3 w-3" /> Share
          </button>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2">
        <img src={story.image} className="max-h-[70vh] w-full rounded-xl object-contain" />
        <button onClick={prev} className="absolute left-1 -translate-x-full top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"><ChevronLeft /></button>
        <button onClick={next} className="absolute right-1 translate-x-full top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"><ChevronRight /></button>
      </div>

      <ShareToMessage open={shareOpen} onOpenChange={setShareOpen} image={story.image} text="Shared a story" />
    </div>
  );
}
