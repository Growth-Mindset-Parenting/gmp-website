import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CAPABLE_ESSAY } from '../../../../content/essays/capable';
import { COLLAPSING_CRUELTY_ESSAY } from '../../../../content/essays/collapsing-cruelty';
import '../../../../styles/essay.css';

// Web versions of freebie essays, keyed by the freebie slug.
// Add more here as they're built.
const ESSAYS = {
  capable: CAPABLE_ESSAY,
  'collapsing-cruelty': COLLAPSING_CRUELTY_ESSAY,
};

// Only the slugs above get a /read/ page; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(ESSAYS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const essay = ESSAYS[params.slug];
  if (!essay) return {};
  return {
    title: { absolute: essay.metaTitle },
    description: essay.metaDescription,
    openGraph: {
      title: essay.metaTitle,
      description: essay.metaDescription,
      type: 'article',
      images: [{ url: '/images/freebie-sean-square.jpg' }],
    },
    // Shared by DM link, not meant to be found in search.
    robots: { index: false, follow: true },
  };
}

// ==text== becomes an orange highlight; **text** becomes bold.
function inline(text) {
  return text.split(/(==[^=]+==|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('==')) return <mark key={i}>{part.slice(2, -2)}</mark>;
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    return part;
  });
}

function Block({ b }) {
  switch (b.type) {
    case 'strong':
      return <p className="es-strong">{inline(b.text)}</p>;
    case 'lines':
      return (
        <div className="es-lines">
          {b.items.map((t) => <p key={t}>{inline(t)}</p>)}
        </div>
      );
    case 'quotes':
      return (
        <div className="es-quotes">
          {b.items.map((t) => <p key={t}>{t}</p>)}
        </div>
      );
    case 'dashes':
      return (
        <ul className="es-dashes">
          {b.items.map((t) => <li key={t}>{t}</li>)}
        </ul>
      );
    case 'asks':
      return (
        <ul className="es-asks">
          {b.items.map((t) => <li key={t}>{t}</li>)}
        </ul>
      );
    case 'h3':
      return <h3 className="es-h3">{b.text}</h3>;
    case 'tips':
      return (
        <ul className="es-tips">
          {b.items.map((t) => (
            <li key={t.text} className={t.wide ? 'es-tip-wide' : undefined}>{t.text}</li>
          ))}
        </ul>
      );
    case 'phrases':
      return (
        <ul className="es-phrases">
          {b.items.map((t) => <li key={t}>{t}</li>)}
        </ul>
      );
    case 'exchange':
      return (
        <div className="es-exchange">
          {b.items.map((x) => (
            <div key={x.kid} className="es-pair">
              <p className="es-kid"><span>Kid</span>{x.kid}</p>
              <p className="es-you"><span>You</span>{x.you}</p>
            </div>
          ))}
        </div>
      );
    case 'followup':
      return (
        <ol className="es-followup">
          {b.items.map((t) => <li key={t}>{t}</li>)}
        </ol>
      );
    default:
      return <p>{inline(b.text)}</p>;
  }
}

function Heading({ s }) {
  if (!s.headingLead) return null;
  return (
    <h2 className="es-h2">
      {s.headingLead}
      {s.headingBreak ? <br /> : ' '}
      <em>{s.headingItalic}</em>
      {s.headingTail ? ` ${s.headingTail}` : ''}
    </h2>
  );
}

function Section({ s, className = '' }) {
  return (
    <section className={`es-section ${className}`}>
      <div className="es-wrap">
        <p className="es-label">
          <span className="es-num">{s.num}</span>
          {s.label}
        </p>
        <Heading s={s} />
        {s.blocks.map((b, i) => <Block key={i} b={b} />)}
      </div>
    </section>
  );
}

function Author({ byline }) {
  return (
    <div className="es-author">
      <img src="/images/sean-headshot.jpg" alt="Sean Kane" width="52" height="52" />
      <div>
        <p className="es-author-name">
          <Link href="/about/">Sean Kane</Link>
        </p>
        <p className="es-author-meta">{byline}</p>
      </div>
    </div>
  );
}

export default function EssayPage({ params }) {
  const e = ESSAYS[params.slug];
  if (!e) notFound();
  const n = e.next;

  return (
    <main className="essay">
      <div className="es-progress" aria-hidden="true" />

      <header className="es-hero">
        <div className="es-wrap">
          <div className="es-top">
            <Link href="/" className="es-brand">
              <span className="es-logo">GMP</span>
              Growth Mindset Parenting
            </Link>
            <span className="es-kind">an essay</span>
          </div>
          <p className="es-eyebrow">{e.eyebrow}</p>
          <h1 className="es-h1">
            {e.titleLead} <em>{e.titleItalic}</em>
          </h1>
          <p className="es-dek">{e.dek}</p>
          {e.inside && (
            <ul className="es-inside">
              {e.inside.map((t) => <li key={t}>{t}</li>)}
            </ul>
          )}
          {e.showTopCta !== false && (
            <div className="es-top-cta">
              <Link href={n.ctaHref} className="gmp-btn gmp-btn-primary es-cta">
                {n.ctaLabel} <span aria-hidden="true">→</span>
              </Link>
              <p>{e.topCtaNote}</p>
            </div>
          )}
          <Author byline={e.byline} />
        </div>
      </header>

      <article>
        {e.sections.map((s) => <Section key={s.num} s={s} className={s.className} />)}

        <section className="es-section es-next">
          <div className="es-wrap">
            <p className="es-label">
              <span className="es-num">{n.num}</span>
              {n.label}
            </p>
            <Heading s={n} />
            {n.blocks.map((b, i) => <Block key={i} b={b} />)}
            <p className="es-cta-lead">{n.ctaLead}</p>
            <Link href={n.ctaHref} className="gmp-btn gmp-btn-primary es-cta">
              {n.ctaLabel} <span aria-hidden="true">→</span>
            </Link>
            <hr className="es-rule" />
            <Author byline={n.signoffByline} />
            <p className="es-colophon">{n.colophon}</p>
          </div>
        </section>
      </article>
    </main>
  );
}
