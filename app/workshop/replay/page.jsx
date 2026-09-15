import { REPLAY } from '../../../data/autopilot-replay';

// Autopilot workshop replay page. Standalone: no site Nav/Footer. One video,
// one button to the sales page. Copy and links live in data/autopilot-replay.js.
export const metadata = {
  title: { absolute: 'Workshop replay: Stop being your kid’s prefrontal cortex · Growth Mindset Parenting' },
  description:
    'Watch the replay of Sean Kane’s free 60-minute workshop for parents of middle schoolers: the classroom method for handing mornings, homework and chores back to your kid.',
  alternates: { canonical: '/workshop/replay/' },
  // Sent by email only: no nav link, not in sitemap, not indexable.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: 'Stop being your kid’s prefrontal cortex. | Workshop replay',
    description: 'Watch the replay of Sean Kane’s free workshop for parents of middle schoolers.',
    url: '/workshop/replay/',
    images: [{ url: '/images/autopilot/workshop-hero.jpg', width: 1200, height: 1800, alt: 'Sean Kane' }],
  },
};

export default function WorkshopReplayPage() {
  const videoUrl = REPLAY.videoUrl.trim();
  const salesUrl = REPLAY.salesUrl.trim() || '#';

  return (
    <div className="aprp">
      <header className="aprp-header">
        <a href="/" aria-label="Growth Mindset Parenting home">
          <img src="/images/autopilot/gmp-logo.png" alt="Growth Mindset Parenting" width="242" height="30" className="aprp-logo" />
        </a>
      </header>

      <main>
        <section className="aprp-hero">
          <p className="aprp-eyebrow">{REPLAY.eyebrow}</p>
          <h1 className="aprp-h1">
            {REPLAY.headline} <em>{REPLAY.headlineAccent}</em>
          </h1>
          <p className="aprp-subhead">{REPLAY.subhead}</p>
        </section>

        <section className="aprp-stage">
          <div className="aprp-band" aria-hidden="true" />
          <div className="aprp-video">
            {videoUrl ? (
              <iframe
                src={videoUrl}
                title={REPLAY.videoTitle}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="aprp-placeholder">
                <div className="aprp-play" aria-hidden="true">→</div>
                <p>{REPLAY.videoPlaceholder}</p>
              </div>
            )}
          </div>
          <div className="aprp-cta">
            <a className="aprp-button" href={salesUrl}>
              {REPLAY.cta} <span aria-hidden="true">→</span>
            </a>
            <p className="aprp-note">{REPLAY.ctaNote}</p>
          </div>
        </section>
      </main>

      <footer className="aprp-footer">
        <span>{REPLAY.copyright}</span>
        <a href="/">{REPLAY.siteLabel}</a>
      </footer>
    </div>
  );
}
