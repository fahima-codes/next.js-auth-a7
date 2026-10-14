export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading BajarDor...</p>
      </div>
    </div>
  );
}
