// Time left until a deadline, split into days / hours / minutes / seconds.
// Worked out from the visitor's own clock against a fixed UTC moment, so it
// is right in every time zone. Returns null once the deadline has passed.
export function timeLeft(deadline, now = Date.now()) {
  const left = deadline - now;
  if (left <= 0) return null;
  const s = Math.floor(left / 1000);
  const m = Math.floor(s / 60);
  return {
    d: Math.floor(m / 1440),
    h: Math.floor(m / 60) % 24,
    m: m % 60,
    s: s % 60,
  };
}

export const pad2 = (n) => String(n).padStart(2, '0');
