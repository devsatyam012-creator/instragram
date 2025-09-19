import { demoThreads, readThread, sendMessage, type Thread } from "@/lib/messages";
import { useEffect, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Activity } from "@/lib/activity";

export default function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [current, setCurrent] = useState<Thread | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const list = demoThreads();
    setThreads(list);
    setCurrent(list[0] ?? null);
  }, []);

  const open = (id: string) => setCurrent(readThread(id));

  const onSend = () => {
    if (!current || !text.trim()) return;
    const t = sendMessage(current.id, text);
    setCurrent({ ...t });
    setThreads((prev) => prev.map((p) => (p.id === t.id ? t : p)));
    setText("");
    Activity.add("message", { to: current.user.username });
  };

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 p-4 sm:grid-cols-[320px_1fr] sm:p-6">
      <aside className="rounded-xl border">
        <h2 className="border-b p-4 text-sm font-semibold">Chats</h2>
        <ul>
          {threads.map((t) => (
            <li key={t.id}>
              <button onClick={() => open(t.id)} className={`flex w-full items-center gap-3 p-3 text-left hover:bg-muted/40 ${current?.id === t.id ? "bg-muted/60" : ""}`}>
                <img src={t.user.avatar} alt={t.user.name} className="h-10 w-10 rounded-full object-cover" />
                <div className="leading-tight">
                  <p className="text-sm font-medium">{t.user.name}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[160px]">{t.messages.at(-1)?.text}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="flex min-h-[420px] flex-col rounded-xl border">
        {!current ? (
          <div className="m-auto p-6 text-muted-foreground">Select a chat</div>
        ) : (
          <>
            <header className="flex items-center gap-3 border-b p-3">
              <img src={current.user.avatar} className="h-8 w-8 rounded-full object-cover" />
              <div className="text-sm font-semibold">{current.user.name}</div>
            </header>
            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {current.messages.map((m) => (
                <div key={m.id} className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${m.fromMe ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {m.image ? (
                    <img src={m.image} alt="shared" className="rounded-md" />
                  ) : (
                    m.text
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t p-3">
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Message..." className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none" />
              <button onClick={onSend} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                <SendHorizonal className="h-4 w-4" /> Send
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
