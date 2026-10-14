import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-500">
        Oops! Sylhet er bajare ei page ta khuje pawa jacche na.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-600 px-6 py-2.5 text-white hover:bg-green-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
