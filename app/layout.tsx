import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coy • Discover & Matches',
  description: 'Swipe, discover mutual crushes, and find matches on Coy.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F0EFF4] text-[#111111] antialiased flex flex-col justify-center items-center py-0 sm:py-6 selection:bg-[#FF2E7E] selection:text-white">
        {children}
      </body>
    </html>
  );
}
