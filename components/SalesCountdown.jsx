'use client';
import { useEffect, useState } from 'react';
import { pad2, timeLeft } from '../lib/countdown';

// The days / hours / min / sec timer card on the standalone sales pages.
// Counts down to `deadline` (a UTC moment from data/launch-schedule.js) and
// removes itself once it has passed. `labels` is the copy: title, optional
// date, days, hours, minutes, seconds.
//
// The page is regenerated on the server about every 60 seconds, so the
// numbers in the HTML can be a minute old. The browser takes over on its
// first tick; suppressHydrationWarning stops React complaining about that
// difference.
//
// The card is ALWAYS in the server HTML and in the browser's first render,
// even right at the deadline: whether it shows can't depend on whose clock
// is read, or React's hydration fails and the whole page re-renders. Only
// after mounting does the browser remove it if the deadline has passed.
const ZERO = { d: 0, h: 0, m: 0, s: 0 };

export default function SalesCountdown({ deadline, labels }) {
  const [mounted, setMounted] = useState(false);
  const [left, setLeft] = useState(() => timeLeft(deadline) || ZERO);

  useEffect(() => {
    const tick = () => {
      const next = timeLeft(deadline);
      setLeft(next);
      if (!next) clearInterval(id);
    };
    const id = setInterval(tick, 1000);
    tick();
    setMounted(true);
    return () => clearInterval(id);
  }, [deadline]);

  if (mounted && !left) return null;

  const t = labels;
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
        {t.date && <span className="aps-timer-date">{t.date}</span>}
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
