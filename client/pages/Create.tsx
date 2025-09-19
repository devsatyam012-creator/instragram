import { useState, DragEvent } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { addUserPost, fileToDataUrl } from "@/lib/posts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Create() {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const onFiles = async (files: FileList | null) => {
    if (!files || !files[0]) return;
    const f = files[0];
    if (!f.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      toast.error("Image too large (max 8MB)");
      return;
    }
    const dataUrl = await fileToDataUrl(f);
    setPreview(dataUrl);
  };

  const onDrop = async (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    await onFiles(e.dataTransfer.files);
  };

  const onSubmit = async () => {
    if (!preview) return;
    setBusy(true);
    addUserPost({ imageDataUrl: preview, caption });
    toast.success("Posted to your feed");
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      {!preview ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-2xl border text-center ${dragOver ? "border-primary bg-primary/5" : "bg-card"}`}
          >
            <ImagePlus className="mb-3 h-10 w-10 text-primary" />
            <p className="text-sm font-semibold">Drag & drop image</p>
            <p className="text-xs text-muted-foreground">or click to browse (JPG, PNG)</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onFiles(e.target.files)}
              className="hidden"
            />
          </label>
          <div className="rounded-2xl border p-6">
            <h2 className="text-lg font-bold">Post details</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Share a photo with a caption. You can edit later.
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>High quality images look best</li>
              <li>Max size 8MB</li>
              <li>Be respectful; no spam</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="overflow-hidden rounded-2xl border bg-black/5">
            <img src={preview} alt="Selected" className="mx-auto block w-full object-contain" />
          </div>
          <div className="rounded-2xl border p-4 sm:p-6">
            <h2 className="text-lg font-bold">Write a caption</h2>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Tell something about this photo..."
              maxLength={2000}
              className="mt-3 h-40 w-full resize-none rounded-md border bg-background p-3 text-sm outline-none"
            />
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{caption.length}/2000</span>
              <button className="hover:underline" onClick={() => setPreview(null)}>Choose different image</button>
            </div>
            <button
              onClick={onSubmit}
              disabled={!preview || busy}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground disabled:opacity-50"
            >
              <Upload className="h-4 w-4" /> Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
