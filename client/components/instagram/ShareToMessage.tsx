import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { demoThreads, sendMessage, type Thread } from "@/lib/messages";
import { useEffect, useState } from "react";
import { Activity } from "@/lib/activity";

export default function ShareToMessage({
  open,
  onOpenChange,
  text,
  image,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  text?: string;
  image?: string;
}) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setThreads(demoThreads());
  }, [open]);

  const onSend = () => {
    if (!selected) return;
    sendMessage(selected, text || "", image);
    Activity.add("message", { to: selected });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share in message</DialogTitle>
        </DialogHeader>
        <div className="max-h-72 space-y-2 overflow-y-auto">
          {threads.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`flex w-full items-center gap-3 rounded-md border p-2 text-left ${selected === t.id ? "border-primary" : ""}`}
            >
              <img
                src={t.user.avatar}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-medium">{t.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  @{t.user.username}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onSend}
            disabled={!selected}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
