import Link from 'next/link';
import { SITE } from '../data/site';

export default function Footer() {
  return (
    <footer className="v6-foot">
      <div className="v6-foot-mark">
        <span className="v6-nav-mark-g" style={{ fontSize: 18 }}>GMP</span>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14 }}>
          {SITE.author.name} &middot; {SITE.author.location}
        </span>
      </div>
      <nav className="v6-foot-links">
        <Link href="/writing">Writing</Link>
        <Link href="/autopilot">Course</Link>
        <Link href="/about">About</Link>
        <Link href="/work-with-me">Work with me</Link>
        <Link href="/privacy" style={{ color: 'var(--ink-mute)', fontSize: 13 }}>Privacy</Link>
        <Link href="/terms" style={{ color: 'var(--ink-mute)', fontSize: 13 }}>Terms</Link>
        <a href="/feed.xml" style={{ color: 'var(--ink-mute)', fontSize: 13 }}>RSS</a>
      </nav>
      <div className="v6-foot-meta">
        <span>&copy; {new Date().getFullYear()} Growth Mindset Parenting</span>
      </div>
    </footer>
  );
}
