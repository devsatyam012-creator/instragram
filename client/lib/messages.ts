export type Message = { id: string; text: string; fromMe: boolean; time: number };
export type Thread = { id: string; user: { username: string; name: string; avatar: string }; messages: Message[] };

const PREFIX = "gram.thread.";

export function readThread(id: string): Thread {
  const fallback: Thread = {
    id,
    user: { username: id, name: id.charAt(0).toUpperCase() + id.slice(1), avatar: `https://i.pravatar.cc/128?u=${id}` },
    messages: [
      { id: "hello", text: "Hey there!", fromMe: false, time: Date.now() - 3600_000 },
    ],
  };
  try {
    const raw = localStorage.getItem(PREFIX + id);
    return raw ? (JSON.parse(raw) as Thread) : fallback;
  } catch {
    return fallback;
  }
}

export function writeThread(thread: Thread) {
  try { localStorage.setItem(PREFIX + thread.id, JSON.stringify(thread)); } catch {}
}

export function sendMessage(threadId: string, text: string): Thread {
  const t = readThread(threadId);
  const msg: Message = { id: String(Date.now()), text: text.slice(0, 2000), fromMe: true, time: Date.now() };
  t.messages.push(msg);
  writeThread(t);
  return t;
}

export function demoThreads(): Thread[] {
  return ["neha", "arjun", "kabir"].map((id) => readThread(id));
}
