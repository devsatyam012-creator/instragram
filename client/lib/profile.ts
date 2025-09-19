export type Profile = {
  username: string;
  name: string;
  bio: string;
  avatar: string; // data URL or remote URL
};

const KEY = "gram.profile";

const DEFAULT_PROFILE: Profile = {
  username: "satyam.dev",
  name: "Satyam Kumar",
  bio: "Developer • Photo enthusiast",
  avatar: "https://i.pravatar.cc/160?img=15",
};

export function getProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(KEY);
    return raw
      ? { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<Profile>) }
      : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function setProfile(profile: Profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(profile));
  } catch {}
}

export function updateProfile(patch: Partial<Profile>): Profile {
  const next = { ...getProfile(), ...patch } as Profile;
  setProfile(next);
  return next;
}
