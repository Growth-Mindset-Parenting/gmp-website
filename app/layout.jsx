import './globals.css';
import '../styles/themes.css';
import '../styles/v6.css';
import '../styles/v6-pages.css';
import '../styles/v6-mobile.css';
import '../styles/v6-work-with-me.css';
import '../styles/field-guide-modal.css';
import '../styles/course-sales.css';
import '../styles/freebies.css';
import '../styles/v7-home.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter, Lora, Source_Serif_4 } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://growthmindsetparenting.com'),
  title: {
    default: 'Growth Mindset Parenting | Sean Kane',
    template: '%s | Growth Mindset Parenting',
  },
  description:
    'Practical, plainspoken parenting advice from a 14-year middle school teacher and father of three. Evidence-based skills for parents of kids ages 9–15.',
  openGraph: {
    siteName: 'Growth Mindset Parenting',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: {
    types: {
      'application/rss+xml': 'https://growthmindsetparenting.com/feed.xml',
    },
  },
  // Add verification only after connecting Search Console:
  // verification: { google: 'YOUR_CODE_HERE' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`theme-terracotta ${inter.variable} ${lora.variable} ${sourceSerif4.variable}`}>
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
