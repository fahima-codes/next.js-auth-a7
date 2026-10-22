'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-gray-800">
        দুঃখিত, পেজটি লোড করা যায়নি
      </h1>
      <p className="mt-2 text-gray-500">
        ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
      </p>
      <div className="mt-6 flex gap-3">
        <button onClick={retry} className="btn btn-success text-white">
          আবার চেষ্টা করুন
        </button>
        <Link href="/" className="btn btn-outline">
          হোম পেজ
        </Link>
      </div>
    </main>
  );
}
