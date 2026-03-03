
'use client';

import React, { useState } from 'react';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { getFirebase } from '@/firebase';
import { Toaster } from "@/components/ui/toaster";
import { AuthWithVerificationProvider } from '@/hooks/use-auth-with-verification';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <FirebaseClientProvider firebase={getFirebase()}>
      <AuthWithVerificationProvider>
        <div 
          className="min-h-screen flex flex-col" 
        >
          {/* Main content */}
          <main className="flex-grow">
            {children}
          </main>       
        </div>
        <Toaster />
      </AuthWithVerificationProvider>
    </FirebaseClientProvider>
  );
}
