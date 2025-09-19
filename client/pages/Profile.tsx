import { getUserPosts } from "@/lib/posts";
import { useEffect, useState } from "react";
import type { Post } from "@/types/instagram";
import { getUserPosts } from "@/lib/posts";
import { getProfile, updateProfile, type Profile } from "@/lib/profile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { fileToDataUrl } from "@/lib/posts";
import { toast } from "sonner";
import { Activity } from "@/lib/activity";

export default function ProfilePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<Profile>(getProfile());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    setPosts(getUserPosts());
  }, []);

  const onFile = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Choose an image"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Max 5MB"); return; }
    const data = await fileToDataUrl(file);
    setAvatarPreview(data);
  };

  const onSave = async () => {
    const patch: Partial<Profile> = { name, bio };
    if (avatarPreview) patch.avatar = avatarPreview;
    const next = updateProfile(patch);
    setProfile(next);
    setOpen(false);
    Activity.add("profile");
    toast.success("Profile updated");
  };

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <header className="flex items-center gap-6">
        <img src={profile.avatar} alt="Profile" className="h-24 w-24 rounded-full object-cover" />
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold">{profile.username}</h1>
            <a href="/create" className="rounded-md border px-3 py-1 text-sm font-semibold">Create</a>
            <button onClick={() => { setName(profile.name); setBio(profile.bio); setAvatarPreview(null); setOpen(true); }} className="rounded-md border px-3 py-1 text-sm font-semibold">Edit profile</button>
          </div>
          <ul className="flex gap-6 text-sm">
            <li><span className="font-semibold">{posts.length}</span> posts</li>
            <li><span className="font-semibold">1,248</span> followers</li>
            <li><span className="font-semibold">506</span> following</li>
          </ul>
          <p className="text-sm text-muted-foreground">{profile.name} • {profile.bio}</p>
        </div>
      </header>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
            <label className="flex flex-col items-center gap-3">
              <span className="inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-full ring-1 ring-border">
                <img src={avatarPreview || profile.avatar} className="h-full w-full object-cover" />
              </span>
              <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
            </label>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium">Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1 h-24 w-full rounded-md border bg-background p-3 text-sm outline-none" maxLength={160} />
                <div className="mt-1 text-right text-xs text-muted-foreground">{bio.length}/160</div>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setOpen(false)} className="rounded-md border px-4 py-2 text-sm">Cancel</button>
                <button onClick={onSave} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save</button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <hr className="my-6" />

      {posts.length === 0 ? (
        <div className="rounded-xl border p-8 text-center text-muted-foreground">No posts yet. Create your first post!</div>
      ) : (
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          {posts.map((p) => (
            <div key={p.id} className="aspect-square overflow-hidden bg-muted">
              <img src={p.image} alt={p.caption} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
