'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

// Meta (Facebook/Instagram) pixel. Renders nothing until NEXT_PUBLIC_META_PIXEL_ID
// is set in Vercel, so the site is safe to deploy before the ID exists.
// IDs are all digits; anything else is treated as unset so a bad paste fails
// loudly here instead of silently breaking the inline script.
const raw = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
const PIXEL_ID = /^\d{5,20}$/.test(raw || '') ? raw : null;

export default function MetaPixel() {
  const pathname = usePathname();
  // The base snippet below already fires PageView for the first load. This
  // effect covers client-side <Link> navigations, which next/script does not
  // re-run — without it, only landing pages would ever be tracked.
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!PIXEL_ID) return;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    window.fbq?.('track', 'PageView');
  }, [pathname]);

  if (!PIXEL_ID) return null;

  // No <noscript> image fallback: React re-creates nodes inside <noscript> in the
  // client DOM, where the browser DOES load them — verified firing a second
  // PageView on every load with JS enabled. Double-counting is worse than
  // missing the vanishingly small JS-disabled audience.
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
    </Script>
  );
}
