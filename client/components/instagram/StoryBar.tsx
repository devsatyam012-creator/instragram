type Story = { id: number; name: string; avatar: string; hasNew?: boolean };

const stories: Story[] = Array.from({ length: 14 }).map((_, i) => ({
  id: i + 1,
  name: ["Satyam", "Aarav", "Neha", "Riya", "Kabir", "Ishaan", "Anika", "Vihaan", "Aisha", "Dev", "Tara", "Arjun", "Maya", "Reyansh"][i % 14],
  avatar: `https://i.pravatar.cc/96?img=${(i + 4) % 70}`,
  hasNew: i % 3 !== 0,
}));

export default function StoryBar() {
  return (
    <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 py-3 sm:-mx-0 sm:px-0">
      {stories.map((story) => (
        <button key={story.id} className="flex w-16 flex-col items-center gap-1">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-500 via-pink-500 to-amber-400 p-[2px]">
            <span className="h-full w-full rounded-full bg-background p-[2px]">
              <img
                src={story.avatar}
                alt={story.name}
                className="h-full w-full rounded-full object-cover"
              />
            </span>
          </span>
          <span className="truncate text-xs text-foreground/80">{story.name}</span>
        </button>
      ))}
    </div>
  );
}
