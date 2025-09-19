import { Activity, type ActivityItem } from "@/lib/activity";
import { useEffect, useState } from "react";

export default function ActivityPage() {
  const [items, setItems] = useState<ActivityItem[]>([]);

  useEffect(() => {
    setItems(Activity.list());
  }, []);

  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-6">
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight">Activity</h1>
      <div className="space-y-3">
        {items.length === 0 && (
          <div className="rounded-xl border p-6 text-muted-foreground">No recent activity yet.</div>
        )}
        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-3 rounded-xl border p-4">
            <img src={it.actor.avatar} alt={it.actor.name} className="h-10 w-10 rounded-full object-cover" />
            <div className="text-sm">
              <span className="font-semibold mr-1">{it.actor.username}</span>
              <span className="text-muted-foreground">
                {it.type === "post" && "posted a new photo"}
                {it.type === "like" && "liked your photo"}
                {it.type === "comment" && `commented: "${String(it.meta?.text || "")}"`}
                {it.type === "follow" && "started following you"}
                {it.type === "message" && "sent you a message"}
                {it.type === "profile" && "updated their profile"}
              </span>
            </div>
            <span className="ml-auto text-xs text-muted-foreground">{timeAgo(it.time)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function timeAgo(ts: number) {
  const diff = Math.max(1, Math.round((Date.now() - ts) / 1000));
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}
