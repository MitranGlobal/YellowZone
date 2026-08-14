import type { Metadata } from 'next';
import { Newsreader, Inter_Tight, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import StickyCta from '@/components/layout/StickyCta';
import Lightbox from '@/components/ui/Lightbox';
import { SITE } from '@/lib/site';

const display = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'YellowZone | Emotional Wellness Certification for Schools',
    template: '%s | YellowZone',
  },
  description:
    'YellowZone is a school-level accreditation for emotional wellness — 13 criteria across 5 pillars, independently verified. Become a YellowZone Certified School.',
  openGraph: {
    title: 'YellowZone | Emotional Wellness Certification for Schools',
    description:
      'A school-level accreditation for emotional wellness. 13 criteria, 5 pillars, independently verified.',
    type: 'website',
    siteName: 'YellowZone',
  },
  icons: { icon: '/logos/yellow-zone-classic.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-gold focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <StickyCta />
        <Lightbox />
      </body>
    </html>
  );
}
