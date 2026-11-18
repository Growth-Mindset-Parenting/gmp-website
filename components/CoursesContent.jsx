import { COURSES } from '../data/courses';
import { PRICES, forPhase } from '../data/screen-reset-sales';
import { Arrow, Check, Heading } from './SalesPageParts';

// Everything on /courses/ between the site Nav and Footer. All copy and
// links: data/courses.js. Type, buttons, lists and the question accordion are
// the sales pages' (styles/autopilot-sales.css, aps-); the page's own layout
// is in styles/courses.css (crs-).
//
// `phase` is The Screen Reset's price state, 'sale' ($67 with $99 crossed
// out) or 'full' ($99). It is worked out from the clock in
// app/courses/page.jsx, the same way as on the sales page.
//
// Links are plain <a>, not next/link: they land on pages with their own
// layout, and a full page load lets the link's utm tags be saved.

// An answer is a plain string, or { before, email, after } with a linked
// email address in the middle.
function Answer({ a }) {
  if (typeof a === 'string') return a;
  return (
    <>
      {a.before}
      <a href={`mailto:${a.email}`} className="aps-inline-link">{a.email}</a>
      {a.after}
    </>
  );
}

// The Screen Reset's price. Sale: $99 crossed out, then $67. Full: $99.
function Price({ phase, note }) {
  const onSale = phase !== 'full';
  return (
    <div className="crs-price">
      <p className="crs-price-row">
        {onSale && (
          <s className="aps-num crs-price-was">
            <span className="aps-sr-only">Regular price </span>{PRICES.full}
          </s>
        )}
        <strong className="aps-num crs-price-now">{onSale ? PRICES.sale : PRICES.full}</strong>
      </p>
      <p className="crs-price-note">{forPhase(note, phase)}</p>
    </div>
  );
}

export default function CoursesContent({ phase = 'sale' }) {
  const c = COURSES;
  return (
    <main className="aps crs-main">
      {/* Top of page */}
      <section className="crs-wrap crs-hero">
        <div>
          <p className="aps-eyebrow aps-mb-20">{c.hero.eyebrow}</p>
          <Heading as="h1" text={c.hero.headline} accent={c.hero.headlineAccent} className="aps-h1 crs-h1" />
        </div>
        <div className="crs-hero-copy">
          {c.hero.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      {/* The two courses */}
      <section className="aps-band">
        <div className="crs-wrap aps-band-inner">
          <Heading text={c.listHeadline} accent={c.listHeadlineAccent} className="aps-h2 crs-list-h2" />
          <div className="crs-courses">
            {c.courses.map((course) => (
              <article key={course.id} id={course.id} className={`crs-course crs-course--${course.tone}`}>
                <div className="crs-course-main">
                  <p className="crs-course-meta">
                    <span className="crs-pill">
                      <span className="crs-pill-dot" aria-hidden="true" />
                      {course.status}
                    </span>
                    <span className="crs-format">{course.format}</span>
                  </p>
                  <h3 className="crs-course-title">{course.title}</h3>
                  <p className="crs-course-tagline">{course.tagline}</p>
                  <div className="aps-copy">
                    {course.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
                <div className="crs-course-side">
                  <div>
                    <h4 className="crs-list-title">{course.forTitle}</h4>
                    <ul className="aps-checklist">
                      {course.forItems.map((item) => <Check key={item}>{item}</Check>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="crs-list-title">{course.getTitle}</h4>
                    <ul className="aps-checklist">
                      {course.getItems.map((item) => <Check key={item}>{item}</Check>)}
                    </ul>
                  </div>
                </div>
                <div className="crs-course-foot">
                  {course.showPrice && <Price phase={phase} note={course.priceNote} />}
                  <div className="crs-course-action">
                    <a href={course.href} className="aps-btn aps-btn-primary">
                      {course.cta} <Arrow />
                    </a>
                    <p className="crs-course-fine">{course.fine}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Which one first? */}
      <section className="crs-wrap aps-section">
        <p className="aps-eyebrow aps-mb-18">{c.choose.eyebrow}</p>
        <Heading text={c.choose.headline} accent={c.choose.headlineAccent} className="aps-h2 crs-section-h2" />
        <div className="crs-choose">
          {c.choose.rows.map((row, i) => (
            <div key={row.title} className="crs-choose-row">
              <span className="aps-numeral crs-choose-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="crs-choose-title">{row.title}</h3>
              <p className="crs-choose-text">{row.body}</p>
              <a href={row.href} className="crs-text-link">
                {row.cta} <Arrow />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* How I teach */}
      <section className="aps-ink-band aps-band--gap">
        <div className="crs-wrap aps-band-inner">
          <div className="aps-split crs-approach-head">
            <div>
              <p className="aps-eyebrow aps-eyebrow--soft aps-mb-18">{c.approach.eyebrow}</p>
              <Heading text={c.approach.headline} accent={c.approach.headlineAccent} className="aps-h2 aps-h2--on-ink" />
            </div>
            <p className="crs-approach-intro">{c.approach.intro}</p>
          </div>
          <div className="crs-points">
            {c.approach.points.map((point, i) => (
              <div key={point.title} className="crs-point">
                <span className="aps-numeral crs-point-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="crs-point-title">{point.title}</h3>
                <p className="crs-point-text">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Sean */}
      <section className="crs-wrap aps-section aps-split aps-split--center crs-about">
        <div className="aps-hero-photo-wrap">
          <img
            src="/images/autopilot/sean-teaching.jpg"
            alt={c.about.photoAlt}
            width="1200"
            height="1500"
            loading="lazy"
            className="aps-photo aps-why-photo"
          />
        </div>
        <div>
          <p className="aps-eyebrow aps-mb-18">{c.about.eyebrow}</p>
          <Heading text={c.about.headline} className="aps-h2 aps-mb-22" />
          <div className="aps-copy">
            {c.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <a href={c.about.link.href} className="crs-text-link crs-about-link">
            {c.about.link.label} <Arrow />
          </a>
        </div>
      </section>

      {/* Questions. <details>, so every answer is in the page's HTML. */}
      <section className="aps-band aps-band--gap">
        <div className="crs-wrap aps-band-inner aps-split crs-faq-split">
          <Heading text={c.faq.headline} accent={c.faq.headlineAccent} />
          <div className="aps-faq crs-faq">
            {c.faq.items.map((f, i) => (
              <details key={f.q} className="aps-faq-item" open={i === 0}>
                <summary className="aps-faq-q">
                  <h3>{f.q}</h3>
                  <span className="aps-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="aps-faq-a">
                  <Answer a={f.a} />
                  {f.link && (
                    <>
                      {' '}
                      <a href={f.link.href} className="aps-inline-link">{f.link.label}</a>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom of page */}
      <section className="aps-ink-band crs-final">
        <div className="crs-wrap aps-band-inner aps-final-inner">
          <Heading text={c.final.headline} accent={c.final.headlineAccent} className="aps-h2 aps-h2--on-ink aps-center-h2" />
          <p className="aps-center-lede aps-center-lede--on-ink crs-final-lede">{c.final.body}</p>
          <a href={c.final.href} className="aps-btn aps-btn-accent aps-btn-17">
            {c.final.cta} <Arrow />
          </a>
        </div>
      </section>
    </main>
  );
}
