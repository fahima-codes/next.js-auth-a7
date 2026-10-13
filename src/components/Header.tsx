import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  const date = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="navbar bg-white border-b border-gray-100 px-6 py-3 justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#008A43] rounded-2xl flex items-center justify-center p-2 shadow-sm">
          <Image
            src="/logo-icon.png"
            alt=""
            width={32}
            height={32}
            className="object-contain inverted-color-if-needed"
          />
        </div>

        <div className="flex flex-col">
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 leading-tight"
          >
            বাজার দর
          </Link>
          <div className="text-[11px] text-gray-500 mt-1">{date}</div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/signin"
          className="text-sm font-semibold text-gray-750 hover:text-gray-900 transition-colors"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="btn bg-[#008A43] hover:bg-[#007337] text-white font-medium border-none px-6 rounded-xl min-h-0 h-10 shadow-sm"
        >
          সাইন আপ
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
