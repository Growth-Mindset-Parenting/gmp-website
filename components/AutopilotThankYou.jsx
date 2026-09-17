'use client';

import { useEffect, useRef } from 'react';
import { Confirmation } from './AutopilotWaitlist';

// Landing page for people who join the waitlist by clicking a link in an email
// (Kit link trigger) instead of filling in the form on /autopilot/. Kit adds the
// tag on the click, so this page only confirms — it never submits anything.
export default function AutopilotThankYou() {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'waitlist_join', { list: 'autopilot', method: 'email_link' });
    }
  }, []);

  return <Confirmation />;
}
