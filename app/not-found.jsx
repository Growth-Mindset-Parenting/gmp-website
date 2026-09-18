import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <article className="v6-page theme-terracotta">
      <Nav />
      <section style={{ textAlign: 'center', padding: '80px 0 120px' }}>
        <span className="v6-page-head-eyebrow">404</span>
        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 800,
          fontSize: 'clamp(40px, 8vw, 72px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          margin: '16px 0 24px',
        }}>
          This page doesn&rsquo;t exist.
        </h1>
        <p style={{
          fontFamily: 'var(--serif-text)',
          fontSize: 18,
          color: 'var(--ink-soft)',
          maxWidth: 480,
          margin: '0 auto 40px',
          lineHeight: 1.6,
        }}>
          It may have moved, or the link was wrong. Here&rsquo;s where to go instead:
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="v6-cta v6-cta-primary">
            Home <span className="v6-cta-arrow">&rarr;</span>
          </Link>
          <Link href="/autopilot" className="v6-cta v6-cta-ghost">The course</Link>
          <Link href="/writing" className="v6-cta v6-cta-ghost">Writing</Link>
        </div>
      </section>
      <Footer />
    </article>
  );
}
