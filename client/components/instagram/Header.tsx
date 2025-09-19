import { Camera, Heart, Home, Search, SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16">
        <div className="flex items-center gap-3">
          <Camera className="h-6 w-6 text-foreground/80 sm:hidden" />
          <a href="/" className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 bg-clip-text text-transparent">
            Gram
          </a>
        </div>
        <div className="hidden sm:flex items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
            <input
              className="h-10 w-72 rounded-full border bg-muted/40 pl-9 pr-4 text-sm outline-none ring-0 placeholder:text-foreground/40 focus:border-ring"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <a href="/" aria-label="Home" className="p-2 hover:text-primary">
            <Home className="h-6 w-6" />
          </a>
          <a href="/messages" aria-label="Messages" className="p-2 hover:text-primary hidden sm:inline-flex">
            <SendHorizonal className="h-6 w-6" />
          </a>
          <a href="/activity" aria-label="Activity" className="p-2 hover:text-primary hidden sm:inline-flex">
            <Heart className="h-6 w-6" />
          </a>
          <a href="/profile" aria-label="Profile" className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-1 ring-border">
            <img src={(() => { try { const p = JSON.parse(localStorage.getItem("gram.profile") || "{}"); return p.avatar || "https://i.pravatar.cc/64?img=15"; } catch { return "https://i.pravatar.cc/64?img=15"; } })()} alt="Me" className="h-full w-full object-cover" />
          </a>
        </nav>
      </div>
    </header>
  );
}
