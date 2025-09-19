import { useEffect, useMemo, useRef, useState } from "react";
import { addStory, getStories, type Story as LiveStory } from "@/lib/stories";
import StoryViewer from "@/components/instagram/StoryViewer";
import { fileToDataUrl } from "@/lib/posts";

// Demo friends (static), real stories come from local storage
const friends = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: ["Aarav", "Neha", "Riya", "Kabir", "Ishaan", "Anika", "Vihaan", "Aisha", "Dev", "Tara"][i % 10],
  avatar: `https://i.pravatar.cc/96?img=${(i + 8) % 70}`,
}));

export default function StoryBar() {
  const [stories, setStories] = useState<LiveStory[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setStories(getStories());
  }, []);

  const combined = useMemo(() => {
    const me = {
      id: "me",
      name: "Your story",
      avatar: "https://i.pravatar.cc/96?img=15",
      hasNew: stories.some((s) => !s.viewed),
    };
    const others = friends.map((f) => ({ id: String(f.id), name: f.name, avatar: f.avatar, hasNew: true }));
    return [me, ...others];
  }, [stories]);

  const openViewer = (idx: number) => {
    if (idx === 0 && stories.length === 0) {
      fileRef.current?.click();
      return;
    }
    setStartIndex(0); // always start at first real story
    setViewerOpen(true);
  };

  const onAdd = async (file?: File | null) => {
    if (!file) return;
    const data = await fileToDataUrl(file);
    addStory(data);
    setStories(getStories());
  };

  return (
    <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 py-3 sm:-mx-0 sm:px-0">
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onAdd(e.target.files?.[0] ?? null)} />
      {combined.map((s, i) => (
        <button key={s.id} onClick={() => openViewer(i)} className="flex w-16 flex-col items-center gap-1">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-500 via-pink-500 to-amber-400 p-[2px]">
            <span className="h-full w-full rounded-full bg-background p-[2px]">
              <img src={s.avatar} alt={s.name} className="h-full w-full rounded-full object-cover" />
            </span>
          </span>
          <span className="truncate text-xs text-foreground/80">{s.name}</span>
        </button>
      ))}
      {viewerOpen && stories.length > 0 && (
        <StoryViewer stories={stories} startIndex={startIndex} onClose={() => { setViewerOpen(false); setStories(getStories()); }} />
      )}
    </div>
  );
}
