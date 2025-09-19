export default function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-6">
      <div className="rounded-xl border p-8 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
        <p className="mt-2 text-muted-foreground">
          {description || "This page is coming next. Continue prompting to fill this screen with production features."}
        </p>
      </div>
    </div>
  );
}
