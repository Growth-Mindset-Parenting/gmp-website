import {
  SALES,
  PRICES,
  CHECKOUT_ONCE_URL,
  CHECKOUT_PLAN_URL,
  STICKY_ENROLL_BAR,
} from '../data/autopilot-sales';
import CheckoutLink from './AutopilotCheckoutLink';

// Autopilot course sales page. Standalone: no site Nav/Footer. Every enroll
// button goes to Kajabi checkout. Copy lives in data/autopilot-sales.js;
// styles in styles/autopilot-sales.css (all classes prefixed aps-).
// Built from Plans/2026-09-29-autopilot-sales-page-design-handoff/.
// Sections carry the design's data-screen-label so they can be compared
// one-to-one against the design file.

const Arrow = () => <span aria-hidden="true">→</span>;

function Enroll({ location, className = 'aps-btn aps-btn-primary', children }) {
  return (
    <CheckoutLink href={CHECKOUT_ONCE_URL} plan="once" value={PRICES.onceValue} location={location} className={className}>
      {children || SALES.enrollCta} <Arrow />
    </CheckoutLink>
  );
}

function Heading({ as: Tag = 'h2', text, accent, after, className = 'aps-h2' }) {
  return (
    <Tag className={className}>
      {text} <em>{accent}</em>{after}
    </Tag>
  );
}

function Check({ children }) {
  return (
    <li className="aps-check">
      <span className="aps-check-mark" aria-hidden="true">✓</span>
      <span>{children}</span>
    </li>
  );
}

// The pair of price cards. `variant` is 'light' (dark card first, on paper)
// or 'dark' (the final block on the ink band).
function PriceCards({ location, variant = 'light' }) {
  const { once, plan, fine } = SALES.cards;
  const dark = variant === 'dark';
  return (
    <div className="aps-prices">
      <div className={`aps-price-card ${dark ? 'aps-price-card--paper' : 'aps-price-card--ink'}`}>
        <p className="aps-eyebrow aps-price-label">{once.label}</p>
        <div className="aps-price-row">
          <span className="aps-num aps-price">{PRICES.once}</span>
          <s className="aps-num aps-price-anchor">
            <span className="aps-sr-only">Regular price </span>{PRICES.anchor}
          </s>
        </div>
        <p className="aps-price-note">{once.note}</p>
        <CheckoutLink
          href={CHECKOUT_ONCE_URL}
          plan="once"
          value={PRICES.onceValue}
          location={`${location}-once`}
          className={`aps-btn aps-btn-block ${dark ? 'aps-btn-primary' : 'aps-btn-accent'}`}
        >
          {once.cta} <Arrow />
        </CheckoutLink>
      </div>
      <div className={`aps-price-card ${dark ? 'aps-price-card--outline' : 'aps-price-card--light'}`}>
        <p className="aps-eyebrow aps-price-label">{plan.label}</p>
        <div className="aps-num aps-price">{PRICES.plan}</div>
        <p className="aps-price-note">{plan.note}</p>
        <CheckoutLink
          href={CHECKOUT_PLAN_URL}
          plan="plan"
          value={PRICES.planValue}
          location={`${location}-plan`}
          className={`aps-btn aps-btn-block ${dark ? 'aps-btn-outline-light' : 'aps-btn-ghost'}`}
        >
          {plan.cta} <Arrow />
        </CheckoutLink>
      </div>
      {!dark && <p className="aps-price-fine">{fine}</p>}
    </div>
  );
}

function Stars({ className = 'aps-stars' }) {
  return (
    <span className={className} role="img" aria-label="5 out of 5 stars">
      ★★★★★
    </span>
  );
}

function NumberedRows({ rows, titleClass }) {
  return (
    <div className="aps-rows">
      {rows.map((r, i) => (
        <div key={i} className="aps-row">
          <span className="aps-numeral aps-row-num">{String(i + 1).padStart(2, '0')}</span>
          <div className="aps-row-body">
            <h3 className={titleClass}>{r.title}</h3>
            <p className="aps-row-text">{r.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CenterQuote({ label, quote, source, accent }) {
  return (
    <section data-screen-label={label} className="aps-center-quote">
      {accent ? (
        <p className="aps-eyebrow aps-center-quote-eyebrow">{accent}</p>
      ) : (
        <Stars className="aps-stars aps-stars--lg" />
      )}
      <p className={`aps-center-quote-text${accent ? ' aps-center-quote-text--accent' : ''}`}>{quote}</p>
      <span className="aps-eyebrow">{source}</span>
    </section>
  );
}

export default function AutopilotSales() {
  const s = SALES;
  return (
    <div className="aps">
      {/* 01 Nav */}
      <header className="aps-nav">
        <img src="/images/autopilot/gmp-logo.png" alt={s.logoAlt} width="600" height="74" className="aps-logo" />
        <Enroll location="nav" className="aps-btn aps-btn-primary aps-btn-sm">{s.navCta}</Enroll>
      </header>

      <main>
        {/* 02 Hero */}
        <section data-screen-label="02 Hero" className="aps-wrap aps-hero">
          <div>
            <p className="aps-eyebrow aps-mb-20">{s.hero.eyebrow}</p>
            <h1 className="aps-h1">
              {s.hero.headline} <em>{s.hero.headlineAccent}</em>
            </h1>
            <p className="aps-hero-sub">{s.hero.subtitle}</p>
            <p className="aps-hero-support">{s.hero.support}</p>
            <Enroll location="hero" />
            <div className="aps-hero-proof">
              <Stars />
              <span>{s.hero.quote}</span>
            </div>
          </div>
          <div className="aps-hero-photo-wrap">
            <img
              src="/images/autopilot/sean-studio.jpg"
              alt={s.hero.photoAlt}
              width="1000"
              height="1500"
              className="aps-photo aps-hero-photo"
              fetchPriority="high"
            />
            <span className="aps-photo-chip">{s.hero.photoCaption}</span>
          </div>
        </section>

        {/* 03 Pain points */}
        <section data-screen-label="03 Pain points" className="aps-band">
          <div className="aps-wrap aps-band-inner">
            <div className="aps-split aps-split--end aps-pain-head">
              <div>
                <p className="aps-eyebrow aps-mb-18">{s.pain.eyebrow}</p>
                <Heading text={s.pain.headline} accent={s.pain.headlineAccent} />
              </div>
              <div className="aps-pain-aside">
                <p>
                  {s.pain.asideLead}
                  <span className="aps-accent">{s.pain.asideAccent}</span>
                </p>
              </div>
            </div>
            <NumberedRows rows={s.pain.rows} titleClass="aps-row-title aps-row-title--lg" />
            <p className="aps-pain-closing">{s.pain.closing}</p>
          </div>
        </section>

        {/* 04 Introducing Autopilot */}
        <section data-screen-label="04 Introducing Autopilot" className="aps-wrap aps-section">
          <div className="aps-intro">
            <span className="aps-intro-stamp">{s.intro.stamp}</span>
            <p className="aps-intro-name">{s.intro.name}</p>
            <div className="aps-split aps-intro-body">
              <p className="aps-intro-tagline">{s.intro.tagline}</p>
              <div>
                <p className="aps-intro-text">
                  {s.intro.body.before}
                  <strong>{s.intro.body.strong}</strong>
                  {s.intro.body.after}
                </p>
                <div className="aps-intro-cta">
                  <Enroll location="intro" className="aps-btn aps-btn-accent aps-btn-17" />
                  <span className="aps-intro-note">{s.intro.note}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 Testimonial */}
        <CenterQuote label="05 Testimonial" quote={s.testimonial1.quote} source={s.testimonial1.source} />

        {/* 06 What Autopilot does */}
        <section data-screen-label="06 What Autopilot does" className="aps-wrap aps-section">
          <div className="aps-split aps-split-mb">
            <div>
              <p className="aps-eyebrow aps-mb-18">{s.what.eyebrow}</p>
              <Heading text={s.what.headline} accent={s.what.headlineAccent} />
            </div>
            <div className="aps-copy">
              {s.what.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <NumberedRows rows={s.what.rows} titleClass="aps-row-title" />
        </section>

        {/* 07 Right for you */}
        <section data-screen-label="07 Right for you" className="aps-wrap aps-section">
          <p className="aps-eyebrow aps-mb-18">{s.fit.eyebrow}</p>
          <Heading text={s.fit.headline} accent={s.fit.headlineAccent} className="aps-h2 aps-fit-h2" />
          <div className="aps-personas">
            {s.fit.personas.map((p) => (
              <div key={p.title} className={`aps-card aps-card--${p.tone}`}>
                <h3 className="aps-card-title">{p.title}</h3>
                <p className="aps-card-text">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="aps-fit-body">{s.fit.body}</p>
          <p className="aps-fit-accent">{s.fit.accent}</p>
          <Enroll location="fit" />
        </section>

        {/* 07b A Tuesday */}
        <section data-screen-label="07b A Tuesday" className="aps-band aps-band--gap">
          <div className="aps-wrap aps-band-inner aps-split aps-tuesday">
            <div>
              <p className="aps-eyebrow aps-mb-18">{s.tuesday.eyebrow}</p>
              <Heading text={s.tuesday.headline} accent={s.tuesday.headlineAccent} className="aps-h2 aps-mb-22" />
              {s.tuesday.paragraphs.map((p, i) => <p key={i} className="aps-tuesday-text">{p}</p>)}
            </div>
            <ol className="aps-timeline">
              {s.tuesday.timeline.map((t) => (
                <li key={t.time} className="aps-timeline-row">
                  <span className="aps-num aps-timeline-time">{t.time}</span>
                  <span className="aps-timeline-text">
                    {t.lines.map((line, i) => (
                      <span key={i}>{i > 0 && <br />}{line}</span>
                    ))}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 08 Five weeks from now */}
        <section data-screen-label="08 Five weeks from now" className="aps-ink-band">
          <div className="aps-wrap aps-band-inner">
            <p className="aps-eyebrow aps-eyebrow--soft aps-mb-18">{s.future.eyebrow}</p>
            <Heading text={s.future.headline} accent={s.future.headlineAccent} className="aps-h2 aps-h2--on-ink aps-future-h2" />
            <div className="aps-future-cols">
              {s.future.columns.map((c) => (
                <div key={c.label} className="aps-future-col">
                  <p className="aps-eyebrow aps-eyebrow--soft aps-mb-16">{c.label}</p>
                  {c.items.map((item, i) => <p key={i} className="aps-future-item">{item}</p>)}
                </div>
              ))}
            </div>
            <p className="aps-future-closing">
              {s.future.closing}
              <span className="aps-accent-soft">{s.future.closingAccent}</span>
            </p>
          </div>
        </section>

        {/* 09 Testimonial */}
        <CenterQuote label="09 Testimonial" quote={s.testimonial2.quote} source={s.testimonial2.source} />

        {/* 10 Pricing */}
        <section id="enroll" data-screen-label="10 Pricing" className="aps-wrap aps-section">
          <div className="aps-split aps-split--center aps-split-mb-price">
            <div>
              <p className="aps-eyebrow aps-mb-18">{s.pricing1.eyebrow}</p>
              <Heading text={s.pricing1.headline} accent={s.pricing1.headlineAccent} className="aps-h2 aps-mb-20" />
              <p className="aps-soft-text">{s.pricing1.body}</p>
            </div>
            <ul className="aps-checklist">
              {s.pricing1.checklist.map((c) => <Check key={c}>{c}</Check>)}
            </ul>
          </div>
          <PriceCards location="pricing-1" />
        </section>

        {/* 11 Pull quote */}
        <CenterQuote label="11 Pull quote" accent={s.pullQuote.eyebrow} quote={s.pullQuote.quote} source={s.pullQuote.source} />

        {/* 12 What's inside */}
        <section id="curriculum" data-screen-label="12 What's inside" className="aps-wrap aps-section">
          <div className="aps-split aps-split--end">
            <div>
              <p className="aps-eyebrow aps-mb-18">{s.curriculum.eyebrow}</p>
              <Heading text={s.curriculum.headline} accent={s.curriculum.headlineAccent} />
            </div>
            <p className="aps-body-17">{s.curriculum.intro}</p>
          </div>
          {s.curriculum.parts.map((part, pi) => (
            <div key={part.label} className="aps-part">
              <div className="aps-part-head">
                <p className="aps-eyebrow aps-mb-14">{part.label}</p>
                <h3 className="aps-part-title">
                  {part.title} <em>{part.titleAccent}</em>
                </h3>
              </div>
              {part.lessons.map((l, li) => (
                <div
                  key={l.num}
                  className={`aps-lesson${li === 0 ? ' aps-lesson--first' : ''}${pi === s.curriculum.parts.length - 1 && li === part.lessons.length - 1 ? ' aps-lesson--last' : ''}`}
                >
                  <div className="aps-lesson-head">
                    <span className="aps-numeral aps-row-num">{l.num}</span>
                    <div className="aps-lesson-q">
                      <p className="aps-eyebrow aps-mb-10">{l.tag}</p>
                      <h4 className="aps-lesson-title">{l.question}</h4>
                    </div>
                  </div>
                  <div>
                    <p className="aps-eyebrow aps-eyebrow--mute aps-mb-4">{s.curriculum.outcomesLabel}</p>
                    <ul className="aps-outcomes">
                      {l.outcomes.map((o) => <li key={o}>{o}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* 13 Bonuses */}
        <section data-screen-label="13 Bonuses" className="aps-band aps-band--gap">
          <div className="aps-wrap aps-band-inner">
            <p className="aps-eyebrow aps-mb-18">{s.bonuses.eyebrow}</p>
            <Heading text={s.bonuses.headline} accent={s.bonuses.headlineAccent} className="aps-h2 aps-bonus-h2" />
            <div className="aps-bonuses">
              {s.bonuses.items.map((b) => (
                <div key={b.num} className="aps-card aps-card--paper">
                  <div className="aps-bonus-top">
                    <span className="aps-numeral aps-bonus-num">{b.num}</span>
                    <span className="aps-num aps-bonus-value">{b.value}</span>
                  </div>
                  <h3 className="aps-card-title">{b.title}</h3>
                  <p className="aps-card-text">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 14 The details */}
        <section data-screen-label="14 The details" className="aps-wrap aps-section">
          <div className="aps-split aps-split--center aps-split-mb-price">
            <div>
              <p className="aps-eyebrow aps-mb-18">{s.details.eyebrow}</p>
              <h2 className="aps-h2 aps-mb-20">
                {s.details.headline} <em>{s.details.headlineAccent}</em>{s.details.headlineAfter}
              </h2>
              <p className="aps-details-value">
                {s.details.valueBefore}
                <strong>{s.details.valueStrong}</strong>
                {s.details.valueAfter}
              </p>
            </div>
            <ul className="aps-checklist aps-checklist--roomy">
              {s.details.checklist.map((c) => <Check key={c}>{c}</Check>)}
            </ul>
          </div>
          <PriceCards location="details" />
        </section>

        {/* 15 Guarantee */}
        <section data-screen-label="15 Guarantee" className="aps-wrap aps-section">
          <div className="aps-guarantee">
            <div className="aps-guarantee-badge">
              <span className="aps-num aps-guarantee-days">{s.guarantee.days}</span>
              <span className="aps-eyebrow">{s.guarantee.label}</span>
            </div>
            <div className="aps-guarantee-body">
              <h3 className="aps-guarantee-title">{s.guarantee.heading}</h3>
              <p>{s.guarantee.body}</p>
              <p>
                {s.guarantee.refundBefore}
                <a href={`mailto:${s.guarantee.email}`} className="aps-inline-link">{s.guarantee.email}</a>
                {s.guarantee.refundAfter}
                <em>{s.guarantee.refundAccent}</em>
              </p>
            </div>
          </div>
        </section>

        {/* 16 FAQ */}
        <section data-screen-label="16 FAQ" className="aps-wrap aps-section">
          <p className="aps-eyebrow aps-mb-18">{s.faq.eyebrow}</p>
          <Heading text={s.faq.headline} accent={s.faq.headlineAccent} className="aps-h2 aps-mb-12" />
          <p className="aps-faq-ask">
            {s.faq.askBefore}
            <a href={`mailto:${s.faq.askEmail}`} className="aps-inline-link">{s.faq.askLink}</a>
            {s.faq.askAfter}
          </p>
          <div className="aps-faq">
            {s.faq.items.map((f, i) => (
              <details key={f.q} className="aps-faq-item" open={i === 0}>
                <summary className="aps-faq-q">
                  <h3>{f.q}</h3>
                  <span className="aps-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="aps-faq-a">{f.a}</p>
              </details>
            ))}
          </div>
          <Enroll location="faq" />
        </section>

        {/* 17 Pricing */}
        <section data-screen-label="17 Pricing" className="aps-band aps-band--gap">
          <div className="aps-wrap aps-band-inner">
            <Heading text={s.pricing2.headline} accent={s.pricing2.headlineAccent} className="aps-h2 aps-center-h2" />
            <p className="aps-center-lede">{s.pricing2.body}</p>
            <PriceCards location="pricing-2" />
          </div>
        </section>

        {/* 19 Undecided */}
        <section data-screen-label="19 Undecided" className="aps-wrap aps-section">
          <div className="aps-split">
            <div>
              <p className="aps-eyebrow aps-mb-18">{s.undecided.eyebrow}</p>
              <Heading text={s.undecided.headline} accent={s.undecided.headlineAccent} />
            </div>
            <div className="aps-copy">
              {s.undecided.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <p className="aps-serif-close">{s.undecided.closing}</p>
            </div>
          </div>
        </section>

        {/* 21 Why I built this */}
        <section data-screen-label="21 Why" className="aps-wrap aps-section aps-split aps-split--center">
          <img
            src="/images/autopilot/sean-teaching.jpg"
            alt={s.why.photoAlt}
            width="800"
            height="1000"
            loading="lazy"
            className="aps-photo aps-why-photo"
          />
          <div>
            <p className="aps-eyebrow aps-mb-18">{s.why.eyebrow}</p>
            <Heading text={s.why.headline} accent={s.why.headlineAccent} className="aps-h2 aps-mb-22" />
            <div className="aps-why-copy">
              {s.why.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <p className="aps-why-sig">{s.why.signature}</p>
          </div>
        </section>

        {/* 21b Testimonials */}
        <section data-screen-label="21b Testimonials" className="aps-wrap aps-section">
          <p className="aps-eyebrow aps-mb-18">{s.wall.eyebrow}</p>
          <Heading text={s.wall.headline} accent={s.wall.headlineAccent} className="aps-h2 aps-wall-h2" />
          <div className="aps-wall">
            {s.wall.quotes.map((q) => (
              <figure key={q.handle} className="aps-card aps-card--paper-2 aps-wall-card">
                <blockquote className="aps-wall-text">{`"${q.text}"`}</blockquote>
                <figcaption className="aps-wall-by">
                  <span className="aps-wall-handle">{q.handle}</span>
                  <span className="aps-wall-note">{q.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 22 The last word */}
        <section data-screen-label="22 The last word" className="aps-last">
          <div className="aps-last-inner">
            <p className="aps-eyebrow aps-mb-18">{s.lastWord.eyebrow}</p>
            <h2 className="aps-h2 aps-mb-22">{s.lastWord.headline}</h2>
            <div className="aps-last-copy">
              {s.lastWord.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <a href="#curriculum" className="aps-btn aps-btn-ghost">{s.lastWord.cta}</a>
          </div>
        </section>

        {/* 23 Pricing (dark) */}
        <section data-screen-label="23 Pricing" className="aps-ink-band aps-final">
          <div className="aps-wrap aps-band-inner aps-final-inner">
            <Heading text={s.pricing3.headline} accent={s.pricing3.headlineAccent} className="aps-h2 aps-h2--on-ink aps-center-h2" />
            <p className="aps-center-lede aps-center-lede--on-ink">{s.pricing3.body}</p>
            <PriceCards location="final" variant="dark" />
            <p className="aps-price-fine aps-price-fine--on-ink">{s.cards.fine}</p>
          </div>
        </section>
      </main>

      {/* 24 Footer */}
      <footer className="aps-footer">
        <div className="aps-footer-inner">
          <span>{s.footer.copyright}</span>
          <div className="aps-footer-links">
            {s.footer.links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </div>
        </div>
      </footer>

      {STICKY_ENROLL_BAR && (
        <>
          <div className="aps-sticky">
            <strong>{s.sticky.label}</strong>
            <Enroll location="sticky" className="aps-btn aps-btn-primary aps-btn-sticky">{s.sticky.cta}</Enroll>
          </div>
          <div className="aps-sticky-spacer" />
        </>
      )}
    </div>
  );
}
