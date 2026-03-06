import type {Metadata} from 'next';
import { Inter } from 'next/font/google'
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { getFirebase } from '@/firebase';
import { CommunityAuthProvider } from '@/hooks/use-community-auth';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Willer Poole – Notes on Creativity, Music, and Process',
  description: 'A personal space where Hong Kong DJ and curator Willer Poole shares concise reflections on creativity, music, and the artistic process—offering honest insights, experiments, and ideas behind his work.',
  openGraph: {
    title: 'Willer Poole – Notes on Creativity, Music, and Process',
    description: 'A personal space where Hong Kong DJ and curator Willer Poole shares concise reflections on creativity, music, and the artistic process—offering honest insights, experiments, and ideas behind his work.',
    images: [
      {
        url: '/willer-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Willer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Willer - Welcome to the Willer Universe',
    description: 'A living journal of ideas, process, and creative evolution. Home to MODAL - Creativity, Music and the Mind.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body antialiased">
        <FirebaseClientProvider firebase={getFirebase()}>
          <CommunityAuthProvider>
            {children}
          </CommunityAuthProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
