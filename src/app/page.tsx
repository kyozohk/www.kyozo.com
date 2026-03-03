"use client";

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center p-4">
      {/* Kyozo Logo */}
      <div className="mb-8">
        <h1 className="text-6xl md:text-8xl font-bold text-[#4f4949] tracking-tight">
          KYOZO
        </h1>
      </div>
      
      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-[#504c4c] mb-12 text-center max-w-2xl">
        The Universe of Communities
      </p>
      
      {/* Quick Links */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/willer"
          className="px-8 py-4 bg-[#926b7f] text-white font-semibold rounded-full hover:bg-[#7d5a6b] transition-colors uppercase tracking-wide text-sm"
        >
          Explore Willer
        </Link>
        <Link
          href="/community"
          className="px-8 py-4 bg-transparent border-2 border-[#926b7f] text-[#926b7f] font-semibold rounded-full hover:bg-[#926b7f] hover:text-white transition-colors uppercase tracking-wide text-sm"
        >
          Browse Communities
        </Link>
      </div>
    </div>
  );
}
