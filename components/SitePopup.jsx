'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { HIDDEN_PATHS, POPUPS, TRIGGER, VISIT_GAP_MINUTES, phaseAt } from '../data/site-popup';
import { trackPromotion } from '../lib/analytics';
import PaperPlane from './PaperPlane';
import { pad2, timeLeft } from '../lib/countdown';

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

// Which pages hide it depends on the phase (see data/site-popup.js).
function isHiddenPath(pathname, phase) {
  const p = pathname?.endsWith('/') ? pathname : `${pathname || ''}/`;
  return (HIDDEN_PATHS[phase] || []).includes(p);
}

// Once per visit, not once ever (Katie, 2026-09-30). A visit ends after
// VISIT_GAP_MINUTES with no page views — the same way GA4 counts a session —
// so clicking around shows it once, and coming back later shows it again.
// Each page view stamps the time; the "seen" flag stores which visit it was
// seen in, so a new visit makes every old flag stale by itself.
const VISIT_ID = 'gmp_visit_id';
const VISIT_LAST = 'gmp_visit_last';

function currentVisit() {
  try {
    const now = Date.now();
    const last = Number(localStorage.getItem(VISIT_LAST)) || 0;
    let id = localStorage.getItem(VISIT_ID);
    if (!id || now - last > VISIT_GAP_MINUTES * 60 * 1000) {
      id = String(now);
      localStorage.setItem(VISIT_ID, id);
    }
    localStorage.setItem(VISIT_LAST, String(now));
    return id;
  } catch {
    // Private mode or blocked storage: every page is its own visit.
    return null;
  }
}

function readVisit() {
  try {
    return localStorage.getItem(VISIT_ID);
  } catch {
    return null;
  }
}

function alreadySeen(key, visit) {
  try {
    return visit !== null && localStorage.getItem(key) === visit;
  } catch {
    return false;
  }
}

function markSeen(key) {
  try {
    const visit = localStorage.getItem(VISIT_ID);
    if (visit) localStorage.setItem(key, visit);
  } catch {
    // never block a close or a click
  }
}

// Days / hours / min / sec boxes for a popup with `countdownTo`. The popup
// only ever renders in the browser, so it can read the clock straight away.
function PopupCountdown({ to }) {
  const [left, setLeft] = useState(() => timeLeft(to));
  useEffect(() => {
    const id = setInterval(() => setLeft(timeLeft(to)), 1000);
    return () => clearInterval(id);
  }, [to]);
  if (!left) return null;
  const boxes = [
    [left.d, 'Days'],
    [pad2(left.h), 'Hours'],
    [pad2(left.m), 'Min'],
    [pad2(left.s), 'Sec'],
  ];
  return (
    <div className="gmp-popup-timer" role="timer">
      {boxes.map(([value, label]) => (
        <div key={label} className="gmp-popup-timer-box">
          <span className="gmp-popup-timer-num">{value}</span>
          <span className="gmp-popup-timer-label">{label}</span>
        </div>
      ))}
    </div>
  );
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
    // Every page view counts toward the visit, popup page or not.
    const visit = currentVisit();
    const current = phaseAt();
    if (!current || isHiddenPath(pathname, current)) return undefined;
    const config = POPUPS[current];
    if (!config || alreadySeen(config.seenKey, visit)) return undefined;

    setPhase(current);

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      cleanup();
      // The clock crossed a switch time while it waited: skip it. The next
      // page view arms the new phase.
      if (phaseAt() !== current) return;
      // Closed (or clicked) since this timer was armed — e.g. it was open
      // when they moved to another page, then they closed it. Stay closed.
      if (alreadySeen(config.seenKey, readVisit())) return;
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
      // It can show again next visit in this same open tab; count that view.
      tracked.current = false;
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

          {popup.countdownTo && <PopupCountdown to={popup.countdownTo} />}

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
