'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { HIDDEN_PATHS, POPUPS, TRIGGER, phaseAt } from '../data/site-popup';
import { trackPromotion } from '../lib/analytics';
import PaperPlane from './PaperPlane';

// Site-wide promotional popup. Copy, links and dates: data/site-popup.js
//
// It renders nothing at all until it opens, so unlike the banner there is no
// pre-paint guard to worry about — nothing can flash if nothing is there.
//
// Which popup shows is worked out from the clock on every mount, so a visitor
// who leaves a tab open across the hand-over gets the right one on their next
// page view.

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function isHiddenPath(pathname) {
  const p = pathname?.endsWith('/') ? pathname : `${pathname || ''}/`;
  return HIDDEN_PATHS.includes(p);
}

function alreadySeen(key) {
  try {
    return localStorage.getItem(key) === '1';
  } catch {
    // Private mode or blocked storage: show it. Better than never showing it.
    return false;
  }
}

function markSeen(key) {
  try {
    localStorage.setItem(key, '1');
  } catch {
    // never block a close or a click
  }
}

export default function SitePopup() {
  const pathname = usePathname();
  const [phase, setPhase] = useState(null);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const tracked = useRef(false);

  const popup = phase ? POPUPS[phase] : null;

  // Decide whether this page could ever show a popup, then arm the triggers.
  useEffect(() => {
    if (isHiddenPath(pathname)) return undefined;
    const current = phaseAt();
    if (!current) return undefined;
    const config = POPUPS[current];
    if (!config || alreadySeen(config.seenKey)) return undefined;

    setPhase(current);

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      cleanup();
      openerRef.current = document.activeElement;
      setOpen(true);
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // A page too short to scroll can never hit a scroll depth — the timer
      // is what covers those.
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      if (percent >= TRIGGER.scrollPercent) fire();
    };

    const timer = setTimeout(fire, TRIGGER.afterSeconds * 1000);
    window.addEventListener('scroll', onScroll, { passive: true });
    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    }
    return cleanup;
  }, [pathname]);

  const close = useCallback(
    (reason) => {
      setOpen(false);
      if (popup) markSeen(popup.seenKey);
      // Put the visitor back where they were reading.
      try {
        openerRef.current?.focus?.();
      } catch {
        // ignore
      }
      if (popup && reason) {
        trackPromotion('close_promotion', { version: `${phase}-popup`, cta: reason }, 'site-popup');
      }
    },
    [popup, phase],
  );

  // Esc, focus trap, scroll lock — only while it is open.
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close('esc');
        return;
      }
      if (e.key !== 'Tab') return;
      const items = dialogRef.current?.querySelectorAll(FOCUSABLE);
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  useEffect(() => {
    if (!open || !popup || tracked.current) return;
    tracked.current = true;
    trackPromotion('view_promotion', { version: `${phase}-popup`, cta: popup.cta }, 'site-popup');
  }, [open, popup, phase]);

  if (!open || !popup) return null;

  const headingId = 'gmp-popup-title';
  const body = popup.body;

  return (
    <div
      className="gmp-popup-scrim"
      onMouseDown={(e) => {
        // mousedown, not click: a drag that starts inside the dialog and ends
        // on the scrim should not count as clicking away.
        if (e.target === e.currentTarget) close('scrim');
      }}
    >
      <div
        className={`gmp-popup gmp-popup-${popup.variant}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        ref={dialogRef}
      >
        <PaperPlane variant={popup.variant} />

        <button
          type="button"
          className="gmp-popup-close"
          aria-label="Close"
          onClick={() => close('x')}
        >
          &times;
        </button>

        <div className="gmp-popup-content">
          <p className="gmp-popup-eyebrow">
            <span className="gmp-popup-dot" aria-hidden="true" />
            {popup.eyebrow}
          </p>

          <h2 className="gmp-popup-title" id={headingId}>
            {popup.headline}
            {popup.headlineAccent && (
              <>
                {' '}
                <em>{popup.headlineAccent}</em>
              </>
            )}
          </h2>

          <p className="gmp-popup-body">
            {typeof body === 'string' ? (
              body
            ) : (
              <>
                {body.before}
                <em>{body.accent}</em>
                {body.after}
              </>
            )}
          </p>

          <div className="gmp-popup-cta-block">
            <a
              className="gmp-popup-cta"
              href={popup.href}
              onClick={() => {
                markSeen(popup.seenKey);
                trackPromotion(
                  'select_promotion',
                  { version: `${phase}-popup`, cta: popup.cta },
                  'site-popup',
                );
              }}
            >
              {popup.cta} <span aria-hidden="true">&rarr;</span>
            </a>
            <button
              type="button"
              className="gmp-popup-dismiss"
              onClick={() => close('dismiss')}
            >
              {popup.dismiss}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
