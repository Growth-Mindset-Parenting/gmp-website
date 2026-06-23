import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import ArticleCtaForm from '../../../components/ArticleCtaForm';
import JsonLd from '../../../components/JsonLd';
import { getLetterBySlug, getAllSlugs, getAllLetters } from '../../../lib/letters';
import { SITE } from '../../../data/site';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const letter = getLetterBySlug(params.slug);
  if (!letter) return {};
  return {
    title: letter.title,
    description: letter.excerpt || letter.dek,
    openGraph: {
      title: letter.title,
      description: letter.excerpt || letter.dek,
      type: 'article',
      publishedTime: letter.date,
      authors: ['Sean Kane'],
      images: letter.img ? [{ url: letter.img }] : [{ url: '/images/sean-square.jpg' }],
    },
  };
}

export default function WritingPiecePage({ params }) {
  const letter = getLetterBySlug(params.slug);
  if (!letter) notFound();

  const isEssay = letter.type === 'essay';
  const allLetters = getAllLetters();
  const related = (letter.related || [])
    .map((s) => allLetters.find((l) => l.slug === s))
    .filter(Boolean)
    .slice(0, 3);

  const ARTICLE_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: letter.title,
    description: letter.excerpt || letter.dek,
    datePublished: `${letter.date}T00:00:00Z`,
    dateModified: `${letter.date}T00:00:00Z`,
    author: {
      '@type': 'Person',
      name: 'Sean Kane',
      url: `${SITE.url}/about/`,
      jobTitle: '14-year middle school English teacher and parenting educator',
      sameAs: [SITE.author.tiktok, SITE.author.instagram],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Growth Mindset Parenting',
      url: SITE.url,
    },
    mainEntityOfPage: `${SITE.url}/writing/${letter.slug}/`,
    image: letter.img ? `${SITE.url}${letter.img}` : `${SITE.url}/images/sean-square.jpg`,
    keywords: ['parenting', 'middle school', 'growth mindset', letter.tag],
  };

  return (
    <article className="v6-page theme-terracotta">
      <JsonLd data={ARTICLE_SCHEMA} />
      <Nav active="/writing" />

      <header className="v6-article-head">
        <Link href="/writing/" className="v6-article-back">&larr; All writing</Link>
        <div className={`v6-letter-tag ${isEssay ? 'is-essay' : 'is-note'}`}>
          <span className="v6-letter-tag-dot" aria-hidden="true" />
          {letter.tag} &middot;{' '}
          <time dateTime={letter.date}>
            {new Date(letter.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </time>
        </div>
        <h1 className="v6-article-h1">{letter.title}</h1>
        {letter.dek && <p className="v6-article-dek">{letter.dek}</p>}
        <Link href="/about/" className="v6-article-byline" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img
            className="v6-article-byline-avatar"
            src="/images/sean-square.jpg"
            alt="Sean Kane"
            width={48}
            height={48}
            loading="lazy"
          />
          <div>
            <div className="v6-article-byline-name">Sean Kane</div>
            <div className="v6-article-byline-meta">Fourteen years in the classroom. Three sons at the kitchen table.</div>
          </div>
        </Link>
      </header>

      {letter.img && (
        <figure className="v6-article-hero">
          <img
            src={letter.img}
            alt={letter.title}
            width={1200}
            height={480}
            loading="lazy"
            style={{ width: '100%', maxHeight: 480, objectFit: 'cover' }}
          />
        </figure>
      )}

      <div className="v6-article-layout">
        <div className="v6-article-body">
          {(letter.body || []).map((para, i) => {
            const parts = para.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={i}>
                {parts.map((p, j) =>
                  p.startsWith('**') && p.endsWith('**') ? (
                    <strong key={j}>{p.slice(2, -2)}</strong>
                  ) : (
                    p
                  )
                )}
              </p>
            );
          })}

          <div className="v6-article-end" aria-hidden="true">
            <span>&mdash;</span>
            <div>See you Saturday.<br /><em>Sean</em></div>
          </div>

          <section className="v6-article-cta" aria-label="Subscribe">
            <h3>Get the next letter on Saturday.</h3>
            <p>One classroom-tested practice in your inbox, every week. Free, plainspoken, unsubscribe in one click.</p>
            <ArticleCtaForm />
          </section>
        </div>

        <aside className="v6-article-side">
          <div className="v6-article-side-card">
            <h3>About the newsletter</h3>
            <p>The Saturday newsletter is a weekly note from Sean Kane — a former middle-school teacher raising three sons. Practical, plainspoken, free.</p>
          </div>

          {related.length > 0 && (
            <div>
              <div className="v6-article-side-eyebrow">Read next</div>
              <ul className="v6-article-related">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/writing/${r.slug}/`}>
                      <div className={`v6-letter-tag ${r.type === 'essay' ? 'is-essay' : 'is-note'}`}>
                        <span className="v6-letter-tag-dot" aria-hidden="true" />
                        {r.tag}
                      </div>
                      <h4>{r.title}</h4>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <Footer />
    </article>
  );
}
