export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="h-16 bg-card border-b flex items-center px-6 gap-4">
        <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
        <div className="w-24 h-4 rounded bg-muted animate-pulse" />
        <div className="ml-auto flex gap-3">
          <div className="w-16 h-8 rounded bg-muted animate-pulse" />
          <div className="w-20 h-8 rounded bg-muted animate-pulse" />
        </div>
      </div>
      {/* Content skeletons */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <div className="w-64 h-8 rounded bg-muted animate-pulse" />
        <div className="w-full h-4 rounded bg-muted animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border bg-card p-6 space-y-3">
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
              <div className="w-full h-4 rounded bg-muted animate-pulse" />
              <div className="w-3/4 h-3 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
