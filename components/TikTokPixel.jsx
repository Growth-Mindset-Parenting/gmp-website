'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

// TikTok pixel. Renders nothing until NEXT_PUBLIC_TIKTOK_PIXEL_ID is set in Vercel,
// so the site is safe to deploy before the ID exists. TikTok IDs are alphanumeric;
// anything else is treated as unset rather than breaking the inline script.
const raw = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID?.trim();
const PIXEL_ID = /^[A-Za-z0-9]{5,40}$/.test(raw || '') ? raw : null;

export default function TikTokPixel() {
  const pathname = usePathname();
  // ttq.page() below covers the first load; this covers client-side navigations.
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!PIXEL_ID) return;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    window.ttq?.page?.();
  }, [pathname]);

  if (!PIXEL_ID) return null;

  // lazyOnload (not afterInteractive): TikTok is the secondary pixel and its SDK is
  // ~100KB. Loading it at idle keeps the hydration window clear for organic readers.
  return (
    <Script id="tiktok-pixel" strategy="lazyOnload">
      {`!function (w, d, t) {
w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

ttq.load('${PIXEL_ID}');
ttq.page();
}(window, document, 'ttq');`}
    </Script>
  );
}
