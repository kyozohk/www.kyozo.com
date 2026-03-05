"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/willer');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#926b7f] mx-auto mb-4"></div>
        <p className="text-[#504c4c]">Redirecting to Willer...</p>
      </div>
    </div>
  );
}
