import type {Metadata} from 'next';
import { Inter } from 'next/font/google'
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { getFirebase } from '@/firebase';
import { CommunityAuthProvider } from '@/hooks/use-community-auth';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: 'Willer - Welcome to the Willer.fm community',
    description: 'A living journal of ideas, process, and creative evolution. Home to MODAL - Creativity, Music and the Mind.',
  openGraph: {
    title: 'Willer - Welcome to the Willer.fm community',
    description: 'A living journal of ideas, process, and creative evolution. Home to MODAL - Creativity, Music and the Mind.',
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
    title: 'Willer - Welcome to the Willer.fm community',
    description: 'A living journal of ideas, process, and creative evolution. Home to MODAL - Creativity, Music and the Mind.',
    images: ['/og-image.png'],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Willer',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
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
