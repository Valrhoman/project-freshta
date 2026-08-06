export default function UploadLoading() {
  return (
    <div>
      <div className="h-40" />
      <div className="mx-4 h-8 w-48 rounded bg-gray-200 animate-pulse" />
      <div className="max-w-xs mt-48 mx-auto space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 rounded bg-gray-200 animate-pulse" />
        ))}
        <div className="h-10 w-32 rounded bg-gray-200 animate-pulse" />
      </div>
      <div className="mx-4 mt-16 space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="h-24 w-24 rounded bg-gray-200 animate-pulse" />
            <div className="space-y-2 flex-1 max-w-xs">
              <div className="h-5 w-40 rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
