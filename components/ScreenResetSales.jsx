import {
  SCREEN_RESET,
  ITEM_NAME,
  checkoutFor,
  forPhase,
} from '../data/screen-reset-sales';
import { SCREEN_RESET_SALE_ENDS } from '../data/launch-schedule';
import CheckoutLink from './CheckoutLink';
import SalesCountdown from './SalesCountdown';
import { Arrow, Check, Heading, NumberedRows } from './SalesPageParts';

// The Screen Reset sales page. Standalone: no site Nav/Footer. Every buy
// button goes to Kajabi checkout. Copy, prices and links live in
// data/screen-reset-sales.js. It uses the Autopilot sales page's visual
// system (styles/autopilot-sales.css, classes prefixed aps-); the few extras
// this page needs are in styles/screen-reset-sales.css (prefixed srs-).
//
// `phase` is 'sale' ($67, countdown) or 'full' ($99, no countdown). It is
// worked out once per render in app/screen-reset/page.jsx and passed down, so
// the price, the links and the copy always agree with each other.

function Mailto({ before, email, after }) {
  return (
    <>
      {before}
      <a href={`mailto:${email}`} className="aps-inline-link">{email}</a>
      {after}
    </>
  );
}

export default function ScreenResetSales({ phase = 'sale' }) {
  const s = SCREEN_RESET;
  const onSale = phase !== 'full';
  const checkout = checkoutFor(phase);
  const t = (value) => forPhase(value, phase);

  // A buy button. `location` says where on the page it was clicked.
  const Buy = ({ location, className = 'aps-btn aps-btn-primary', children }) => (
    <CheckoutLink
      href={checkout.url}
      checkout={onSale ? 'sale' : 'full'}
      value={checkout.value}
      itemName={ITEM_NAME}
      location={`screen-reset-sales:${location}`}
      className={className}
    >
      {children || s.cta} <Arrow />
    </CheckoutLink>
  );

  const faqItems = s.faq.items.filter((f) => onSale || !f.saleOnly);
  const anchor = t(s.pricing.anchor);

  return (
    <div className="aps srs">
      {/* Nav */}
      <header className="aps-nav">
        <img src="/images/autopilot/gmp-logo.png" alt={s.logoAlt} width="600" height="74" className="aps-logo" />
        <Buy location="nav" className="aps-btn aps-btn-primary aps-btn-sm" />
      </header>

      <main>
        {/* 1. Top of page */}
        <section className="aps-wrap aps-hero">
          <div>
            <p className="aps-eyebrow aps-mb-20">{s.hero.eyebrow}</p>
            <Heading as="h1" text={s.hero.headline} accent={s.hero.headlineAccent} className="aps-h1" />
            <p className="aps-hero-sub">{s.hero.subtitle}</p>
            <p className="aps-hero-support srs-hero-support">{s.hero.support}</p>
            <p className="srs-price-line">{t(s.hero.priceLine)}</p>
            <div className="aps-hero-ctas">
              <Buy location="hero" />
            </div>
            <p className="aps-hero-recorded">{s.hero.fine}</p>
          </div>
          <div>
            {onSale && <SalesCountdown deadline={SCREEN_RESET_SALE_ENDS} labels={s.hero.countdown} />}
            <div className="aps-hero-photo-wrap">
              <img
                src="/images/autopilot/sean-studio.jpg"
                alt={s.hero.photoAlt}
                width="1000"
                height="1500"
                className="aps-photo aps-hero-photo"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        {/* 2. If this is your house */}
        <section className="aps-band">
          <div className="aps-wrap aps-band-inner">
            <div className="aps-split aps-pain-head">
              <div>
                <p className="aps-eyebrow aps-mb-18">{s.house.eyebrow}</p>
                <Heading text={s.house.headline} />
              </div>
              <div className="aps-copy">
                {s.house.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <p className="srs-lead">{s.house.rowsLead}</p>
            <NumberedRows rows={s.house.rows} titleClass="aps-row-title aps-row-title--lg" />
            <p className="aps-pain-closing srs-closing">{s.house.closing}</p>
          </div>
        </section>

        {/* 3. What's actually happening */}
        <section className="aps-wrap aps-section">
          <div className="aps-split">
            <Heading text={s.happening.headline} accent={s.happening.headlineAccent} />
            <div className="aps-copy">
              {s.happening.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>

        {/* 4. Introducing The Screen Reset */}
        <section className="aps-wrap aps-section">
          <div className="aps-intro">
            <span className="aps-intro-stamp">{s.intro.stamp}</span>
            <p className="aps-intro-name srs-intro-name">{s.intro.name}</p>
            <div className="aps-split aps-intro-body">
              <p className="aps-intro-tagline">{s.intro.tagline}</p>
              <div className="srs-intro-copy">
                {s.intro.paragraphs.map((p, i) => <p key={i} className="aps-intro-text">{p}</p>)}
              </div>
            </div>
            <p className="srs-walls-lead">{s.intro.wallsLead}</p>
            <div className="srs-walls">
              {s.intro.walls.map((w) => (
                <div key={w.title} className="srs-wall">
                  <h3 className="srs-wall-title">{w.title}</h3>
                  <p className="srs-wall-text">{w.body}</p>
                </div>
              ))}
            </div>
            <p className="aps-intro-note srs-intro-note">{s.intro.note}</p>
          </div>
        </section>

        {/* 5. What's inside */}
        <section id="inside" className="aps-wrap aps-section">
          <p className="aps-eyebrow aps-mb-18">{s.inside.eyebrow}</p>
          <Heading text={s.inside.headline} accent={s.inside.headlineAccent} />
          {s.inside.parts.map((part) => (
            <div key={part.label} className="aps-part">
              <div className="aps-part-head srs-part-head">
                <div>
                  <p className="aps-eyebrow aps-mb-14">{part.label}</p>
                  <h3 className="aps-part-title">{part.title}</h3>
                </div>
                <p className="aps-body-17">{part.intro}</p>
              </div>
              <NumberedRows rows={part.rows} titleClass="aps-row-title" />
            </div>
          ))}
          <div className="aps-split srs-also">
            <h3 className="aps-part-title">{s.inside.also.title}</h3>
            <ul className="aps-checklist">
              {s.inside.also.items.map((c) => <Check key={c}>{c}</Check>)}
            </ul>
          </div>
        </section>

        {/* 6. How the weekend goes */}
        <section className="aps-band aps-band--gap">
          <div className="aps-wrap aps-band-inner">
            <p className="aps-eyebrow aps-mb-18">{s.weekend.eyebrow}</p>
            <Heading text={s.weekend.headline} accent={s.weekend.headlineAccent} className="aps-h2 aps-bonus-h2" />
            <div className="aps-bonuses">
              {s.weekend.steps.map((step, i) => (
                <div key={step.title} className="aps-card aps-card--paper">
                  <div className="aps-bonus-top">
                    <span className="aps-numeral aps-bonus-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="aps-card-title">{step.title}</h3>
                  <p className="aps-card-text">{step.body}</p>
                </div>
              ))}
            </div>
            <p className="srs-weekend-closing">{s.weekend.closing}</p>
          </div>
        </section>

        {/* 7. Is this for you? */}
        <section className="aps-wrap aps-section">
          <div className="aps-split">
            <div>
              <p className="aps-eyebrow aps-mb-18">{s.fit.eyebrow}</p>
              <Heading text={s.fit.headline} className="aps-h2 srs-fit-h2" />
              <ul className="aps-checklist aps-checklist--roomy">
                {s.fit.items.map((c) => <Check key={c}>{c}</Check>)}
              </ul>
            </div>
            <div className="srs-not">
              <h3 className="srs-not-title">{s.fit.notHeadline}</h3>
              <ul className="srs-not-list">
                {s.fit.notItems.map((c) => (
                  <li key={c} className="srs-not-item">
                    <span className="srs-not-mark" aria-hidden="true">×</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 8. What changes */}
        <section className="aps-ink-band aps-band--gap">
          <div className="aps-wrap aps-band-inner aps-split">
            <Heading text={s.changes.headline} className="aps-h2 aps-h2--on-ink" />
            <div className="srs-ink-copy">
              {s.changes.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>

        {/* 9. About Sean */}
        <section className="aps-wrap aps-section aps-split aps-split--center">
          <div className="aps-hero-photo-wrap">
            <img
              src="/images/autopilot/sean-teaching.jpg"
              alt={s.about.photoAlt}
              width="1200"
              height="1500"
              loading="lazy"
              className="aps-photo aps-why-photo"
            />
            <span className="aps-photo-chip">{s.about.photoCaption}</span>
          </div>
          <div>
            <p className="aps-eyebrow aps-mb-18">{s.about.eyebrow}</p>
            <Heading text={s.about.headline} className="aps-h2 aps-mb-22" />
            <div className="aps-copy">
              {s.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>

        {/* 10. Price and guarantee */}
        <section id="enroll" className="aps-wrap aps-section">
          <div className="aps-split aps-split--center aps-split-mb-price">
            <div>
              <p className="aps-eyebrow aps-mb-18">{s.pricing.eyebrow}</p>
              <Heading text={s.pricing.headline} />
            </div>
            <ul className="aps-checklist">
              {s.pricing.checklist.map((c) => <Check key={c}>{c}</Check>)}
            </ul>
          </div>
          <div className="aps-prices srs-prices">
            <div className="aps-price-card aps-price-card--ink">
              <div className="aps-price-row">
                <span className="aps-num aps-price">{t(s.pricing.price)}</span>
                {anchor && (
                  <s className="aps-num aps-price-anchor">
                    <span className="aps-sr-only">Regular price </span>{anchor}
                  </s>
                )}
              </div>
              <p className="aps-price-note">{t(s.pricing.note)}</p>
              <Buy location="pricing" className="aps-btn aps-btn-block aps-btn-accent" />
            </div>
            <p className="aps-price-fine">{s.pricing.fine}</p>
          </div>
          <div className="aps-guarantee srs-guarantee">
            <div className="aps-guarantee-body">
              <h3 className="aps-guarantee-title">{s.guarantee.heading}</h3>
              <p><Mailto {...s.guarantee} /></p>
            </div>
          </div>
        </section>

        {/* 11. Questions */}
        <section className="aps-wrap aps-section">
          <Heading text={s.faq.headline} accent={s.faq.headlineAccent} className="aps-h2 srs-faq-h2" />
          <div className="aps-faq srs-faq">
            {faqItems.map((f, i) => (
              <details key={f.q} className="aps-faq-item" open={i === 0}>
                <summary className="aps-faq-q">
                  <h3>{f.q}</h3>
                  <span className="aps-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="aps-faq-a">{typeof f.a === 'string' ? f.a : <Mailto {...f.a} />}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 12. Bottom of page */}
        <section className="aps-ink-band aps-final aps-band--gap">
          <div className="aps-wrap aps-band-inner aps-final-inner">
            <Heading text={s.final.headline} accent={s.final.headlineAccent} className="aps-h2 aps-h2--on-ink aps-center-h2" />
            <p className="aps-center-lede aps-center-lede--on-ink srs-final-lede">{s.final.body}</p>
            <Buy location="final" className="aps-btn aps-btn-accent aps-btn-17" />
            <p className="aps-price-fine aps-price-fine--on-ink">{t(s.final.fine)}</p>
          </div>
        </section>
      </main>

      <footer className="aps-footer">
        <div className="aps-footer-inner">
          <span>{s.footer.copyright}</span>
          <div className="aps-footer-links">
            {s.footer.links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
}
