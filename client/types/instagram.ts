export type Post = {
  id: string;
  user: { name: string; username: string; avatar: string };
  image: string; // data URL or remote URL
  liked: boolean;
  likes: number;
  caption: string;
  time: string; // e.g., "2h", "Just now"
};
