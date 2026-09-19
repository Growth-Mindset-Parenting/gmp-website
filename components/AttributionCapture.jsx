'use client';
import { useEffect } from 'react';
import { withAttribution } from '../lib/attribution';

// Hosts whose links should carry the visitor's saved tags along
// (Kajabi checkout/course pages, Zoom registration).
const CARRY_TO = /(^|\.)(courses\.growthmindsetparenting\.com|mykajabi\.com|zoom\.us)$/i;

// Mounted once in the root layout. Renders nothing. (The source itself is
// saved by middleware.js.)
export default function AttributionCapture() {
  useEffect(() => {
    const tagLink = (e) => {
      try {
        const a = e.target.closest?.('a[href]');
        if (!a) return;
        if (CARRY_TO.test(new URL(a.href).hostname)) a.href = withAttribution(a.href);
      } catch {
        // never block a click
      }
    };
    // mousedown/touchstart also cover new-tab and copy-link; click covers keyboard.
    const events = ['mousedown', 'touchstart', 'click'];
    events.forEach((t) => document.addEventListener(t, tagLink, { capture: true, passive: true }));
    return () => events.forEach((t) => document.removeEventListener(t, tagLink, { capture: true }));
  }, []);

  return null;
}
