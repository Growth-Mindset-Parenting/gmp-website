'use client';
import { useEffect, useState } from 'react';
import { CART_CLOSES } from '../data/launch-schedule';
import { SALES } from '../data/autopilot-sales';
import { pad2, timeLeft } from '../lib/countdown';

// "Enrollment closes in" timer in the sales page hero, above Sean's photo.
// Built from the countdown design handoff (Katie, 2026-10-09). Counts down to
// CART_CLOSES and removes itself once the cart has closed.
//
// The page is regenerated on the server about every 60 seconds, so the
// numbers in the HTML can be a minute old. The browser takes over on its
// first tick; suppressHydrationWarning stops React complaining about that
// difference.
export default function AutopilotCountdown() {
  const [left, setLeft] = useState(() => timeLeft(CART_CLOSES));

  useEffect(() => {
    const tick = () => {
      const next = timeLeft(CART_CLOSES);
      setLeft(next);
      if (!next) clearInterval(id);
    };
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, []);

  if (!left) return null;

  const t = SALES.hero.countdown;
  const boxes = [
    [left.d, t.days],
    [pad2(left.h), t.hours],
    [pad2(left.m), t.minutes],
    [pad2(left.s), t.seconds],
  ];

  return (
    <div className="aps-timer" role="timer">
      <div className="aps-timer-head">
        <span className="aps-timer-title">{t.title}</span>
        <span className="aps-timer-date">{t.date}</span>
      </div>
      <div className="aps-timer-boxes">
        {boxes.map(([value, label], i) => (
          <div key={label} className="aps-timer-box-group">
            {i > 0 && <span className="aps-timer-sep" aria-hidden="true">:</span>}
            <div className="aps-timer-box">
              <span className="aps-timer-num aps-num" suppressHydrationWarning>{value}</span>
              <span className="aps-timer-label">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
