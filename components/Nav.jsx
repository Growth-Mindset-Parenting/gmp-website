'use client';
import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/writing', label: 'Writing' },
  { href: '/autopilot', label: 'Autopilot' },
  { href: '/about', label: 'About' },
  { href: '/work-with-me', label: 'Work with me' },
];

export default function Nav({ active }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="v6-nav">
        <Link href="/" className="v6-nav-mark">
          <span className="v6-nav-mark-g">GMP</span>
          <span className="v6-nav-mark-text">Growth Mindset Parenting</span>
        </Link>
        <div className="v6-nav-links">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? 'page' : undefined}
              style={active === l.href ? { color: 'var(--accent)', fontWeight: 700 } : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="/#subscribe" className="v6-nav-cta">
          Subscribe &rarr;
        </Link>
        <button
          className="v6-nav-hamburger"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`v6-nav-drawer${open ? ' is-open' : ''}`}
        aria-hidden={!open}
      >
        <button
          className="v6-nav-drawer-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        <nav className="v6-nav-drawer-links">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#subscribe"
          className="v6-nav-drawer-cta"
          onClick={() => setOpen(false)}
        >
          Subscribe free &rarr;
        </Link>
      </div>
    </>
  );
}
