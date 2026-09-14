'use client';

import { useEffect, useRef, useState } from 'react';
import { WAITLIST } from '../data/autopilot-waitlist';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Header() {
  return (
    <div className="apw-header">
      <img src="/images/autopilot/gmp-logo.png" alt="Growth Mindset Parenting" width="178" height="22" className="apw-logo" />
      <span className="apw-stamp">{WAITLIST.stamp}</span>
    </div>
  );
}

// Replaces a {token} in a copy string with styled emphasis.
function withEmphasis(text, token, value) {
  const [before, after] = text.split(token);
  return (
    <>
      {before}
      <strong className="apw-emph">{value}</strong>
      {after}
    </>
  );
}

function EmailForm({ id, onAccent, email, status, error, errorFormId, onEmail, onSubmit }) {
  const busy = status === 'submitting';
  const showError = status === 'error' && errorFormId === id;
  const invalid = showError && error === WAITLIST.form.errorInvalid;
  return (
    <>
      <form className={`apw-form${onAccent ? ' apw-form--on-accent' : ''}`} onSubmit={(e) => onSubmit(e, id)} noValidate>
        <label htmlFor={id} className="apw-sr-only">Email address</label>
        <input
          id={id}
          className="apw-input"
          type="email"
          name="email_address"
          autoComplete="email"
          inputMode="email"
          placeholder={WAITLIST.form.placeholder}
          value={email}
          onChange={onEmail}
          aria-invalid={invalid ? 'true' : undefined}
          aria-describedby={showError ? `${id}-error` : undefined}
        />
        {/* Bot trap: hidden from people, filled in by naive spam scripts. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="apw-trap" />
        <button type="submit" className="apw-button" disabled={busy}>
          {busy ? WAITLIST.form.buttonBusy : WAITLIST.form.button}
          {!busy && <span aria-hidden="true">→</span>}
        </button>
      </form>
      {showError && (
        <p id={`${id}-error`} role="alert" className="apw-error">{error}</p>
      )}
    </>
  );
}

function Confirmation({ email }) {
  const c = WAITLIST.confirmation;
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);
  return (
    <main className="apw-confirm">
      <Header />
      <div className="apw-confirm-body">
        <div className="apw-confirm-inner">
          <p className="gmp-eyebrow apw-confirm-eyebrow">{c.eyebrow}</p>
          <h1 ref={headingRef} tabIndex={-1} className="apw-h1 apw-h1--confirm">
            {c.headline} <em>{c.headlineAccent}</em>
          </h1>
          <p className="apw-confirm-text">{withEmphasis(c.body, '{email}', email)}</p>
          <ol className="apw-steps">
            {c.steps.map((step, i) => (
              <li key={i}>
                <span className="apw-step-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </li>
            ))}
            <li>
              <span className="apw-step-num">{String(c.steps.length + 1).padStart(2, '0')}</span>
              <span>
                {c.instagramStep}{' '}
                <a href={WAITLIST.instagramUrl} className="apw-step-link">{c.instagramLink}</a>
              </span>
            </li>
          </ol>
        </div>
      </div>
      <p className="apw-footer-line">{WAITLIST.copyright}</p>
    </main>
  );
}

function QuoteCard({ q }) {
  return (
    <figure className="apw-quote">
      <figcaption className="apw-quote-by">
        <span className="apw-quote-handle">{q.handle}</span>
        <span className="apw-quote-note">{q.note}</span>
      </figcaption>
      <blockquote className="apw-quote-text">{`“${q.text}”`}</blockquote>
    </figure>
  );
}

function MarqueeRow({ quotes, reverse }) {
  // The list renders twice so translating by -50% loops seamlessly; the
  // second copy is hidden from screen readers.
  return (
    <div className={`apw-marquee-track${reverse ? ' apw-marquee-track--rev' : ''}`} tabIndex={0} role="region" aria-label="Parent testimonials">
      {quotes.map((q, i) => <QuoteCard key={`a${i}`} q={q} />)}
      {quotes.map((q, i) => (
        <div key={`b${i}`} aria-hidden="true" className="apw-marquee-dup">
          <QuoteCard q={q} />
        </div>
      ))}
    </div>
  );
}

export default function AutopilotWaitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | error | success
  const [error, setError] = useState('');
  const [errorFormId, setErrorFormId] = useState(null);
  const utms = useRef({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const [k, v] of params) if (/^utm_/i.test(k)) utms.current[k.toLowerCase()] = v;
  }, []);

  const onEmail = (e) => {
    setEmail(e.target.value);
    if (status === 'error') {
      setStatus('idle');
      setError('');
    }
  };

  const onSubmit = async (e, formId) => {
    e.preventDefault();
    if (status === 'submitting') return;
    const value = email.trim();
    const company = e.currentTarget.elements.company?.value || '';
    setErrorFormId(formId);
    if (!EMAIL_RE.test(value)) {
      setStatus('error');
      setError(WAITLIST.form.errorInvalid);
      return;
    }
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/waitlist/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, list: 'autopilot', utms: utms.current, company }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'waitlist_join', { list: 'autopilot' });
      }
      setEmail(value);
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch {
      setStatus('error');
      setError(WAITLIST.form.errorServer);
    }
  };

  if (status === 'success') return <Confirmation email={email} />;

  const formProps = { email, status, error, errorFormId, onEmail, onSubmit };
  const { hero, what, testimonials, closing } = WAITLIST;
  const half = Math.ceil(testimonials.quotes.length / 2);

  return (
    <div className="apw">
      {/* 1. Hero */}
      <section className="apw-section apw-hero">
        <Header />
        <div className="apw-hero-grid">
          <div>
            <p className="gmp-eyebrow apw-hero-eyebrow">{hero.eyebrow}</p>
            <h1 className="apw-h1">
              {hero.headline} <em>{hero.headlineAccent}</em>
            </h1>
            <p className="apw-hero-sub">{hero.subtitle}</p>
            <div className="apw-form-wrap">
              <EmailForm id="apw-email-hero" {...formProps} />
            </div>
          </div>
          <div className="apw-photo-wrap">
            <img
              src="/images/autopilot/sean-hero.jpg"
              alt="Sean Kane on the front porch, looking at the camera"
              width="1200"
              height="1800"
              className="apw-photo"
              fetchPriority="high"
            />
            <span className="apw-photo-caption">{hero.photoCaption}</span>
          </div>
        </div>
      </section>

      {/* 2. What Autopilot does */}
      <section className="apw-section">
        <div className="apw-what-intro">
          <div>
            <p className="gmp-eyebrow apw-eyebrow-gap">{what.eyebrow}</p>
            <h2 className="apw-h2">
              {what.headline} <em>{what.headlineAccent}</em>
            </h2>
          </div>
          <div className="apw-what-copy">
            {what.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
        <div className="apw-benefits">
          {what.benefits.map((b, i) => (
            <div key={i} className="apw-benefit">
              <span className="apw-numeral">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="apw-h3">{b.title}</h3>
              <p className="apw-benefit-body">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Testimonials */}
      <section className="apw-testimonials">
        <div className="apw-section apw-testimonials-head">
          <p className="gmp-eyebrow apw-eyebrow-gap">{testimonials.eyebrow}</p>
          <h2 className="apw-h2 apw-h2--sm">
            {testimonials.headline} <em>{testimonials.headlineAccent}</em>
          </h2>
          <p className="apw-testimonials-sub">
            {withEmphasis(testimonials.subhead, '{count}', WAITLIST.followerCount)}
          </p>
        </div>
        <div className="apw-marquee">
          <MarqueeRow quotes={testimonials.quotes.slice(0, half)} />
          <MarqueeRow quotes={testimonials.quotes.slice(half)} reverse />
        </div>
      </section>

      {/* 4. Closing CTA */}
      <section className="apw-section">
        <div className="apw-closing">
          <div>
            <p className="gmp-eyebrow apw-closing-eyebrow">{closing.eyebrow}</p>
            <h2 className="apw-h2 apw-h2--sm apw-h2--on-accent">
              {closing.headline} <em>{closing.headlineAccent}</em>
            </h2>
          </div>
          <div>
            <EmailForm id="apw-email-closing" onAccent {...formProps} />
            <p className="apw-closing-note">{closing.note}</p>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="apw-footer">
        <span>{WAITLIST.copyright}</span>
        <a href={`mailto:${WAITLIST.contactEmail}`} className="apw-footer-link">Contact</a>
      </footer>
    </div>
  );
}
