export default function ProductDetailLoading() {
  return (
    <div className="min-h-[70vh] bg-[#f1f6f1]">
      <div className="mx-auto max-w-3xl px-4 py-5 sm:py-8">
        <div className="skeleton mb-4 h-4 w-48"></div>

        <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:mb-4 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="skeleton h-12 w-12 rounded-xl"></div>
            <div className="space-y-2">
              <div className="skeleton h-5 w-36"></div>
              <div className="skeleton h-3 w-28"></div>
              <div className="skeleton h-3 w-44"></div>
            </div>
          </div>
          <div className="skeleton h-20 w-20 rounded-xl"></div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="skeleton mb-3 h-4 w-32"></div>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="space-y-2 rounded-lg border border-gray-200 p-2 sm:p-3"
              >
                <div className="skeleton h-3 w-16"></div>
                <div className="skeleton h-5 w-20"></div>
                <div className="skeleton h-2 w-24"></div>
              </div>
            ))}
          </div>

          <div className="skeleton mb-3 h-4 w-44"></div>
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="skeleton h-8 w-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
