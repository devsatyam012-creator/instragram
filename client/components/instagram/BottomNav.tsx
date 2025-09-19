import { Home, Search, PlusSquare, Film, User } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:hidden">
      <ul className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <li>
          <a href="/" className="p-2" aria-label="Home">
            <Home className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a href="/explore" className="p-2" aria-label="Explore">
            <Search className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a href="/reels" className="p-2" aria-label="Reels">
            <Film className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a href="/create" className="p-2" aria-label="Create">
            <PlusSquare className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a href="/profile" className="p-2" aria-label="Profile">
            <User className="h-6 w-6" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
