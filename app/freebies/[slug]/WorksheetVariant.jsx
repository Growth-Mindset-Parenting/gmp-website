'use client';
import { useState, useEffect } from 'react';
import HeroForm from './HeroForm';
import CaptureModal from './CaptureModal';
import { trackFreebieView, trackFreebieSubscribe } from '../../../lib/freebie-analytics';

// Wraps the italic phrase of a heading in a Lora-italic <em>.
function withItalic(text, italicPhrase) {
  if (!italicPhrase || !text.includes(italicPhrase)) return text;
  const [before, after] = text.split(italicPhrase);
  return [before, <em key="i">{italicPhrase}</em>, after];
}

const VARIANT = 'worksheet';

export default function WorksheetVariant({ freebie }) {
  const [modal, setModal] = useState({ open: false, done: false, name: '', email: '' });

  const openCapture = () => setModal({ open: true, done: false, name: '', email: '' });
  const openConfirmation = (name, email) => {
    trackFreebieSubscribe(VARIANT, freebie.slug);
    setModal({ open: true, done: true, name, email });
  };
  const closeModal = () => setModal({ open: false, done: false, name: '', email: '' });

  useEffect(() => { trackFreebieView(VARIANT, freebie.slug); }, []);

  return (
    <div className="fb-page">
      {/* ── Hero ── */}
      <section className="ws-hero">
        <div>
          <p className="gmp-eyebrow ws-hero-eyebrow">
            {freebie.heroEyebrow || 'Free guide · For parents of middle schoolers'}
          </p>
          <h1 className="ws-hero-h1">
            {withItalic(freebie.heroHeadline, freebie.heroHeadlineItalic)}
          </h1>
          <p className="ws-hero-subhead">{freebie.heroSubhead}</p>
          <HeroForm freebie={freebie} variant={VARIANT} onSuccess={openConfirmation} />
        </div>

        {/* Guide cover mockup */}
        <div className="ws-cover" aria-hidden="true">
          <div className="ws-cover-top">
            <span className="ws-cover-top-label">The guide</span>
            <span className="ws-cover-top-label">No. 01</span>
          </div>
          <div className="ws-cover-mid">
            <span className="ws-cover-eyebrow">Growth Mindset Parenting</span>
            <div className="ws-cover-title">
              {withItalic(freebie.coverTitle, freebie.coverTitleItalic)}
            </div>
            <p className="ws-cover-descriptor">{freebie.coverDescriptor}</p>
          </div>
          <div className="ws-cover-bottom">
            <span className="ws-cover-author">Sean Kane</span>
            <span className="ws-cover-pages">{freebie.pageCount}</span>
          </div>
        </div>
      </section>

      {/* ── "Is this you?" ── */}
      <section className="fb-section-tinted">
        <div className="fb-inner">
          <div className="fb-pain-heading">
            <p className="gmp-eyebrow">Is this you?</p>
            <h2>If any of these sound familiar&hellip;</h2>
          </div>
          <div className="ws-pain-grid">
            {freebie.painPoints.map((quote, i) => (
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
          <ul className="ws-outcomes-list">
            {freebie.outcomes.map((outcome, i) => (
              <li key={i}>
                <div className="ws-outcome-row">
                  <div className="ws-outcome-badge" aria-hidden="true">&#10003;</div>
                  <div>
                    <div className="ws-outcome-title">{outcome.title}</div>
                    <p className="ws-outcome-desc">{outcome.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
