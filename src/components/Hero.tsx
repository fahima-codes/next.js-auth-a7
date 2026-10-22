'use client';

import { getBanglaDate } from '@/lib/utils';
import Image from 'next/image';

export default function Hero() {
  const banglaDate = getBanglaDate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-100">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-lime-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 md:min-h-[500px] md:grid-cols-2 md:py-20">
        <div className="text-center md:text-left">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-sm font-semibold text-green-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {banglaDate}
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-800 sm:text-5xl lg:text-6xl">
            বাজারের দাম জানুন
            <span className="mt-2 block text-green-700">এক নজরেই</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারভিত্তিক দাম— গড়,
            সর্বনিম্ন ও সর্বোচ্চ দরসহ সব তথ্য এক জায়গায়।
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
            <a
              href="#সব-পণ্য"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-bold text-white shadow-lg shadow-green-700/15 transition hover:-translate-y-0.5 hover:bg-green-700"
            >
              সব পণ্যের দাম দেখুন
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </a>

            <span className="text-sm text-gray-500">
              প্রতিদিনের বাজারদর, সহজে
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-4 rounded-[2rem] bg-green-200/50 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-white p-2 shadow-xl shadow-green-900/10">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের তাজা পণ্য"
              width={600}
              height={500}
              priority
              className="h-[300px] w-full rounded-[1.5rem] object-cover sm:h-[380px]"
            />

            <div className="absolute bottom-6 left-6 rounded-2xl border border-green-100 bg-white/95 px-4 py-3 shadow-lg">
              <p className="text-xs font-medium text-gray-500">
                আপনার নিত্যদিনের
              </p>
              <p className="font-bold text-green-800">বিশ্বস্ত বাজারদর</p>
            </div>

            <div className="absolute right-6 top-6 rounded-full border border-green-100 bg-white/95 px-4 py-2 text-sm font-bold text-green-700 shadow-md">
              🥬 টাটকা আপডেট
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
