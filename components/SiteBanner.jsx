'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BANNER, HIDDEN_PATHS } from '../data/site-banner';
import { BANNER_COOKIE, trackPromotion } from '../lib/analytics';

// Site-wide announcement bar. Copy and on/off live in data/site-banner.js.
//
// Why the markup renders even on pages that hide it: the banner is part of
// the first HTML the browser paints, so nothing on the page jumps. The inline
// script at the top of <body> (app/layout.jsx) decides BEFORE paint whether
// this visitor sees it — dismissed already, or a page that hides it — and
// sets data-banner="hidden" on <html>, which the CSS reads.
//
// This component owns the same decision after that first paint: the dismiss
// click, and re-deciding on client-side navigation. It must apply BOTH
// reasons every time. (It once only re-applied the path reason, which quietly
// un-hid the banner for anyone who had dismissed it and then clicked a link.)

function isHiddenPath(pathname) {
  const p = pathname?.endsWith('/') ? pathname : `${pathname || ''}/`;
  return HIDDEN_PATHS.includes(p);
}

function cookieSaysDismissed() {
  try {
    const hit = document.cookie
      .split('; ')
      .find((c) => c.startsWith(`${BANNER_COOKIE}=`));
    return Boolean(hit) && decodeURIComponent(hit.slice(BANNER_COOKIE.length + 1)) === BANNER.version;
  } catch {
    // a blocked cookie just means the banner shows again
    return false;
  }
}

export default function SiteBanner() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const seen = useRef(false);

  const hiddenHere = !BANNER || isHiddenPath(pathname);

  useEffect(() => {
    if (!BANNER) return;
    const alreadyDismissed = dismissed || cookieSaysDismissed();
    if (alreadyDismissed && !dismissed) setDismissed(true);

    const root = document.documentElement;
    if (hiddenHere || alreadyDismissed) root.setAttribute('data-banner', 'hidden');
    else root.removeAttribute('data-banner');

    // One view event per page, and only when it is really on screen.
    if (!hiddenHere && !alreadyDismissed && !seen.current) {
      seen.current = true;
      trackPromotion('view_promotion', BANNER);
    }
  }, [hiddenHere, dismissed]);

  if (!BANNER) return null;

  const dismiss = () => {
    try {
      document.cookie = `${BANNER_COOKIE}=${encodeURIComponent(BANNER.version)}; max-age=${60 * 60 * 24 * 30}; path=/; samesite=lax`;
    } catch {
      // never block the click
    }
    document.documentElement.setAttribute('data-banner', 'hidden');
    setDismissed(true);
  };

  return (
    <aside className="gmp-banner" aria-label="Announcement">
      <Link
        href={BANNER.href}
        className="gmp-banner-link"
        onClick={() => trackPromotion('select_promotion', BANNER)}
      >
        <span className="gmp-banner-text">{BANNER.text}</span>
        <span className="gmp-banner-text-short">{BANNER.textShort}</span>
        <span className="gmp-banner-cta">
          {BANNER.cta} <span aria-hidden="true">&rarr;</span>
        </span>
      </Link>
      <button
        type="button"
        className="gmp-banner-close"
        aria-label="Dismiss announcement"
        onClick={dismiss}
      >
        &times;
      </button>
    </aside>
  );
}
