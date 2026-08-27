import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import LettersFeed from '../../components/LettersFeed';
import JsonLd from '../../components/JsonLd';
import { getAllLetters } from '../../lib/letters';
import { SITE } from '../../data/site';

export const metadata = {
  title: 'Writing',
  description:
    'Weekly notes and longer essays on the six Middle Skills. Plainspoken parenting, written by a teacher. Free.',
  openGraph: {
    title: 'Writing | Growth Mindset Parenting',
    description: 'Weekly notes and longer essays on the six Middle Skills. Plainspoken parenting, written by a teacher.',
    images: [{ url: '/images/sean-wide.jpg' }],
  },
  alternates: { canonical: '/writing/' },
};

const BLOG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Growth Mindset Parenting Writing',
  url: `${SITE.url}/writing/`,
  description: 'Weekly notes and longer essays on classroom-tested parenting skills.',
  author: { '@type': 'Person', name: 'Sean Kane', url: SITE.url },
};

export default function WritingPage() {
  const letters = getAllLetters();
  const totalPages = Math.ceil(letters.length / 20);

  return (
    <article className="v6-page theme-terracotta">
      <JsonLd data={BLOG_SCHEMA} />
      <Nav active="/writing" />

      <header className="v6-page-head">
        <div>
          <span className="v6-page-head-eyebrow">Writing</span>
        </div>
        <h1 className="v6-page-head-h1">
          Weekly notes and longer essays.{' '}
          <em>Plainspoken parenting, written by a teacher.</em>
        </h1>
        <div className="v6-page-head-meta">
          <div><b>{letters.length}</b> Pieces in archive</div>
          <div><b>Weekly</b> Since 2024</div>
          <div><b>Free</b> Always</div>
        </div>
      </header>

      <span id="subscribe" style={{ display: 'block' }} />
      <LettersFeed letters={letters} totalPages={totalPages} />

      <Footer />
    </article>
  );
}
