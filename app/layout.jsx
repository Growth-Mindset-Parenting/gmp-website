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
import '../styles/autopilot-waitlist.css';
import '../styles/autopilot-workshop.css';
import '../styles/autopilot-replay.css';
import '../styles/autopilot-thank-you.css';
import '../styles/site-banner.css';
import '../styles/site-popup.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import AttributionCapture from '../components/AttributionCapture';
import SiteBanner from '../components/SiteBanner';
import SitePopup from '../components/SitePopup';
import { BANNER, HIDDEN_PATHS } from '../data/site-banner';
import { BANNER_COOKIE } from '../lib/analytics';
import MetaPixel from '../components/MetaPixel';
import TikTokPixel from '../components/TikTokPixel';
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

// Decides, before the page paints, whether this visitor sees the announcement
// bar — so a dismissed banner (or a page that hides it) never flashes and
// nothing on the page jumps. Kept tiny and dependency-free on purpose.
const BANNER_SCRIPT = BANNER
  ? `(function(){try{var h=document.documentElement;var p=location.pathname;
if(p.slice(-1)!=='/')p+='/';
var hide=${JSON.stringify(HIDDEN_PATHS)}.indexOf(p)>-1;
if(!hide)hide=(document.cookie.split('; ').filter(function(c){return c.indexOf('${BANNER_COOKIE}=')===0;})[0]||'').split('=')[1]===encodeURIComponent('${BANNER.version}');
if(hide)h.setAttribute('data-banner','hidden');}catch(e){}})();`
  : null;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`theme-terracotta ${inter.variable} ${lora.variable} ${sourceSerif4.variable}`}>
      <body>
        {/* Must stay the first thing in <body>: the browser runs it while
            parsing, before the banner below is painted. (A <script> in the
            layout's <head>, or next/script's beforeInteractive, does not
            reach the HTML in Next 14's App Router — checked, 2026-09-21.) */}
        {BANNER_SCRIPT && (
          <script dangerouslySetInnerHTML={{ __html: BANNER_SCRIPT }} />
        )}
        <AttributionCapture />
        <SiteBanner />
        <SitePopup />
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <MetaPixel />
        <TikTokPixel />
      </body>
    </html>
  );
}
