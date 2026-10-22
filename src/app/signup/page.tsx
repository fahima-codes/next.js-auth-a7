'use client';

import { useState } from 'react';
import { signUp, signIn } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে!');
        return;
      }

      toast.success('রেজিস্ট্রেশন সফল! সাইন ইন পেজে যাচ্ছে...');
      router.push('/signin');
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (error) {
      console.error('Google signup error:', error);
      toast.error('Google দিয়ে সাইন আপ করা যায়নি।');
    }
  };

  const handleGitHubSignUp = async () => {
    try {
      await signIn.social({
        provider: 'github',
        callbackURL: '/',
      });
    } catch (error) {
      console.error('GitHub signup error:', error);
      toast.error('GitHub দিয়ে সাইন আপ করা যায়নি।');
    }
  };

  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-100 px-4 py-12">
      {/* হালকা ব্যাকগ্রাউন্ড সাজসজ্জা */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-lime-200/40 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-3xl border border-green-100 bg-white/95 shadow-xl shadow-green-900/10 backdrop-blur">
          {/* কার্ডের উপরের অংশ */}
          <div className="border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-7 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
              🛒
            </div>

            <h1 className="text-2xl font-extrabold text-gray-800">
              অ্যাকাউন্ট তৈরি করুন
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              বাজার দর-এ আপনাকে স্বাগতম
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* সোশ্যাল সাইন আপ */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 font-medium text-gray-700 transition hover:border-green-300 hover:bg-green-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google দিয়ে সাইন আপ
              </button>

              <button
                type="button"
                onClick={handleGitHubSignUp}
                className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 font-medium text-gray-700 transition hover:border-green-300 hover:bg-green-50"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub দিয়ে সাইন আপ
              </button>
            </div>

            <div className="my-6 flex items-center gap-4 text-xs text-gray-400">
              <div className="h-px flex-1 bg-gray-200" />
              <span>অথবা ইমেইল দিয়ে</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* ইমেইল ফর্ম */}
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  নাম
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="আপনার নাম"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  ইমেইল
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  পাসওয়ার্ড
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <p className="mt-1.5 text-xs text-gray-400">
                  পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex min-h-12 w-full items-center justify-center rounded-xl bg-green-600 px-4 py-3 font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    রেজিস্টার হচ্ছে...
                  </>
                ) : (
                  'অ্যাকাউন্ট তৈরি করুন'
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              ইতোমধ্যে অ্যাকাউন্ট আছে?{' '}
              <Link
                href="/signin"
                className="font-semibold text-green-700 hover:text-green-800 hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>

            <div className="mt-6 border-t border-gray-100 pt-5 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50 hover:text-green-800"
              >
                <span aria-hidden="true">←</span>
                হোম পেজে ফিরে যান
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          নিরাপদে অ্যাকাউন্ট তৈরি করুন
        </p>
      </div>
    </main>
  );
}
