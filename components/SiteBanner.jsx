'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BANNERS, DISMISS_DAYS, HIDDEN_PATHS, SCHEDULED_PHASES, phaseAt } from '../data/site-banner';
import { BANNER_COOKIE, trackPromotion } from '../lib/analytics';
import { pad2, timeLeft } from '../lib/countdown';

// Site-wide announcement bar. Copy, links and switch dates: data/site-banner.js
//
// The banner switches itself off the clock, but the site is static HTML — so
// EVERY banner on the schedule is in the page, and only the current one is
// shown. The before-paint script (lib/banner-script.js, run from
// app/layout.jsx) picks it before anything is drawn, by setting
// data-banner-phase on <html>; it also sets data-banner="hidden" when this
// visitor should see none (dismissed, a page that hides it, or cart closed).
// styles/site-banner.css reads both, so nothing flashes or jumps.
//
// This component owns the same decision after that first paint: the dismiss
// click, and re-deciding on client-side navigation — which is also how a tab
// left open across a switch time gets the new banner on its next page. It
// must apply every reason every time. (It once only re-applied the path
// reason, which quietly un-hid the banner for anyone who had dismissed it and
// then clicked a link.) It never works out the phase while rendering: server
// and browser clocks differ, and React would complain the HTML doesn't match.

function isHiddenPath(pathname) {
  const p = pathname?.endsWith('/') ? pathname : `${pathname || ''}/`;
  return HIDDEN_PATHS.includes(p);
}

function cookieSaysDismissed(version) {
  try {
    const hit = document.cookie
      .split('; ')
      .find((c) => c.startsWith(`${BANNER_COOKIE}=`));
    return Boolean(hit) && decodeURIComponent(hit.slice(BANNER_COOKIE.length + 1)) === version;
  } catch {
    // a blocked cookie just means the banner shows again
    return false;
  }
}

// Live "2d 14h 05m 33s left" for a banner with `countdownTo`. The site is
// static HTML built days earlier, so it draws nothing until the browser has
// its own clock — no stale numbers flash on first paint.
function BannerCountdown({ to, suffix }) {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    const tick = () => setLeft(timeLeft(to));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [to]);
  if (!left) return null;
  return (
    <span className="gmp-banner-countdown">
      {left.d}d {pad2(left.h)}h {pad2(left.m)}m {pad2(left.s)}s {suffix}
    </span>
  );
}

export default function SiteBanner() {
  const pathname = usePathname();
  // The version the visitor closed this session (the cookie covers later ones).
  const [dismissed, setDismissed] = useState(null);
  // One view event per banner version, even across a switch in an open tab.
  const viewed = useRef(new Set());

  useEffect(() => {
    const root = document.documentElement;
    const phase = phaseAt();
    const banner = phase ? BANNERS[phase] : null;

    if (phase) root.setAttribute('data-banner-phase', phase);
    else root.removeAttribute('data-banner-phase');

    const hidden =
      !banner ||
      isHiddenPath(pathname) ||
      dismissed === banner.version ||
      cookieSaysDismissed(banner.version);

    if (hidden) root.setAttribute('data-banner', 'hidden');
    else root.removeAttribute('data-banner');

    if (!hidden && !viewed.current.has(banner.version)) {
      viewed.current.add(banner.version);
      trackPromotion('view_promotion', banner);
    }
  }, [pathname, dismissed]);

  if (SCHEDULED_PHASES.length === 0) return null;

  const dismiss = (banner) => {
    try {
      document.cookie = `${BANNER_COOKIE}=${encodeURIComponent(banner.version)}; max-age=${60 * 60 * 24 * DISMISS_DAYS}; path=/; samesite=lax`;
    } catch {
      // never block the click
    }
    document.documentElement.setAttribute('data-banner', 'hidden');
    setDismissed(banner.version);
  };

  return SCHEDULED_PHASES.map((phase) => {
    const banner = BANNERS[phase];
    return (
      <aside
        key={phase}
        data-phase={phase}
        className={`gmp-banner${banner.textShort ? '' : ' gmp-banner-single'}`}
        aria-label="Announcement"
      >
        <Link
          href={banner.href}
          className="gmp-banner-link"
          onClick={() => trackPromotion('select_promotion', banner)}
        >
          <span className="gmp-banner-text">{banner.text}</span>
          {banner.textShort && (
            <span className="gmp-banner-text-short">{banner.textShort}</span>
          )}
          {banner.countdownTo && (
            <BannerCountdown to={banner.countdownTo} suffix={banner.countdownSuffix} />
          )}
          <span className="gmp-banner-cta">
            {banner.cta} <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
        <button
          type="button"
          className="gmp-banner-close"
          aria-label="Dismiss announcement"
          onClick={() => dismiss(banner)}
        >
          &times;
        </button>
      </aside>
    );
  });
}
