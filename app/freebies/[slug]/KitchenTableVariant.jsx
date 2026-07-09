'use client';
import { useState } from 'react';
import HeroForm from './HeroForm';
import CaptureModal from './CaptureModal';

function withItalic(text, italicPhrase) {
  if (!italicPhrase || !text.includes(italicPhrase)) return text;
  const [before, after] = text.split(italicPhrase);
  return [before, <em key="i">{italicPhrase}</em>, after];
}

const VARIANT = 'kitchen-table';

// Outcome card fills, in order (4th card uses the default cream fill)
const OUTCOME_CARD_CLASSES = ['gmp-card-blush', 'gmp-card-clay', 'gmp-card-sage', ''];

export default function KitchenTableVariant({ freebie }) {
  const [modal, setModal] = useState({ open: false, done: false, name: '', email: '' });

  const openCapture = () => setModal({ open: true, done: false, name: '', email: '' });
  const openConfirmation = (name, email) => setModal({ open: true, done: true, name, email });
  const closeModal = () => setModal({ open: false, done: false, name: '', email: '' });

  return (
    <div className="fb-page">
      {/* ── Hero ── */}
      <section className="kt-hero">
        <div className="kt-hero-copy">
          <p className="gmp-eyebrow kt-hero-eyebrow">Free guide &middot; For parents of middle schoolers</p>
          <h1 className="kt-hero-h1">
            {withItalic(freebie.heroHeadline, freebie.heroHeadlineItalic)}
          </h1>
          <p className="kt-hero-subhead">{freebie.heroSubhead}</p>
          <HeroForm freebie={freebie} variant={VARIANT} onSuccess={openConfirmation} />
        </div>

        <div className="kt-hero-photo-wrap">
          <img
            src="/images/freebie-sean-hero.jpg"
            alt="Sean Kane"
            className="kt-hero-photo"
          />
          <div className="kt-hero-caption">Sean Kane &middot; Austin, TX</div>
        </div>
      </section>

      {/* ── "Is this you?" ── */}
      <section className="fb-section-tinted">
        <div className="fb-inner">
          <div className="fb-pain-heading">
            <p className="gmp-eyebrow">Is this you?</p>
            <h2>If any of these sound familiar&hellip;</h2>
          </div>
          <div className="kt-pain-grid">
            {freebie.painPoints.slice(0, 3).map((quote, i) => (
              <div key={i} className="fb-quote-card">{quote}</div>
            ))}
          </div>
          <p className="fb-pain-closer">
            {withItalic(freebie.painPointsCloser, freebie.painPointsCloserItalic)}
          </p>
          <div className="fb-cta">
            <button className="gmp-btn gmp-btn-primary" onClick={openCapture}>
              Get me my free guide &#8594;
            </button>
          </div>
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section className="fb-section">
        <div className="fb-inner">
          <p className="gmp-eyebrow fb-section-eyebrow">What you&apos;ll walk away with</p>
          <h2 className="fb-section-heading">
            {withItalic(freebie.outcomesHeading, freebie.outcomesHeadingItalic)}
          </h2>
          <div className="kt-outcomes-grid">
            {freebie.outcomes.map((outcome, i) => (
              <div key={i} className={`gmp-card ${OUTCOME_CARD_CLASSES[i]}`.trim()}>
                <div className="kt-outcome-title">{outcome.title}</div>
                <p className="kt-outcome-desc">{outcome.description}</p>
              </div>
            ))}
          </div>
          <div className="fb-cta">
            <button className="gmp-btn gmp-btn-primary" onClick={openCapture}>
              Get me my free guide &#8594;
            </button>
          </div>
        </div>
      </section>

      {/* ── Sean intro ── */}
      <section className="fb-section-tinted">
        <div className="fb-inner">
          <div className="fb-sean">
            <img
              src="/images/freebie-sean-square.jpg"
              alt="Sean Kane"
              className="fb-sean-photo"
              loading="lazy"
            />
            <div>
              <div className="fb-sean-eyebrow">
                <span className="fb-sean-dot" aria-hidden="true" />
                <span className="gmp-eyebrow">Hey, I&apos;m Sean</span>
              </div>
              <h2 className="fb-sean-heading">
                {withItalic(freebie.seanHeading, freebie.seanHeadingItalic)}
              </h2>
              <p className="fb-sean-bio">{freebie.seanBio}</p>
              <button className="gmp-btn gmp-btn-primary" onClick={openCapture}>
                Get me my free guide &#8594;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="fb-footer">
        <span className="fb-footer-brand">Growth Mindset Parenting</span>
        <span className="fb-footer-copy">&copy; {new Date().getFullYear()} Sean Kane &middot; Made on Saturdays</span>
      </footer>

      {/* ── Modal ── */}
      <CaptureModal
        freebie={freebie}
        variant={VARIANT}
        open={modal.open}
        done={modal.done}
        name={modal.name}
        email={modal.email}
        onClose={closeModal}
        onConfirmed={openConfirmation}
      />
    </div>
  );
}
