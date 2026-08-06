export default function FeaturedSkeleton() {
  return (
    <div className="mt-16 mx-4 mb-16 max-w-[120rem] sm:px-16 sm:mx-0 relative left-1/2 -translate-x-1/2">
      <div className="h-12 w-64 mb-6 rounded bg-gray-200 animate-pulse" />
      <div className="flex gap-16 overflow-hidden p-4 pb-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-72 rounded-3xl shadow-lg overflow-hidden"
          >
            <div className="h-60 bg-gray-200 animate-pulse" />
            <div className="p-6 space-y-3 border-t-4 border-greeny-50">
              <div className="h-5 w-40 rounded bg-gray-200 animate-pulse" />
              <div className="h-7 w-20 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
