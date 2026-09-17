'use client';
import { appendKitFields } from '../lib/attribution';
import { useState, useRef, useEffect, Fragment } from 'react';
import { createPortal } from 'react-dom';

const KIT_FORM_ID = process.env.NEXT_PUBLIC_KIT_FIELD_GUIDE_FORM_ID;

const FGM_SKILLS = [
  'Emotional Literacy',
  'Resilience',
  'Reflection',
  'Relationship',
  'Autonomy',
  'Adaptation',
];

export default function FieldGuideModal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setSent(false);
    setError('');
    setConsent(false);
    setSubmitting(false);
    const id = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key === 'Tab' && dialogRef.current) {
        const f = Array.from(dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ));
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault(); f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault(); f[0].focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Enter a valid email so I know where to send it.');
      inputRef.current?.focus();
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const body = appendKitFields(new URLSearchParams({ email_address: value }));
      const res = await fetch(
        `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        }
      );
      if (!res.ok) throw new Error('Subscribe failed');
      setSent(true);
    } catch {
      setError('Something went wrong — try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  }

  function onBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return createPortal(
    <div className="fgm-overlay" onMouseDown={onBackdrop}>
      <div
        className="fgm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fgm-title"
        ref={dialogRef}
      >
        <button className="fgm-close" onClick={onClose} aria-label="Close">&times;</button>

        <aside className="fgm-cover" aria-hidden="true">
          <div className="fgm-cover-kicker">A teacher&rsquo;s field guide</div>
          <div className="fgm-cover-title">
            The Six Skills
            <em>your middle schooler is building</em>
          </div>
          <div className="fgm-cover-rule" />
          <ol className="fgm-skills">
            {FGM_SKILLS.map((s, i) => (
              <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>
            ))}
          </ol>
          <div className="fgm-cover-meta">Free &middot; 5-minute read &middot; PDF</div>
        </aside>

        <div className="fgm-panel">
          {!sent ? (
            <Fragment>
              <span className="fgm-eyebrow">Free field guide</span>
              <h2 className="fgm-h2" id="fgm-title">
                What looks like attitude is a skill that isn&rsquo;t online yet.
              </h2>
              <p className="fgm-sub">
                From fourteen years in middle school classrooms &mdash; the six skills your
                kid is still building, what each one looks like when it hasn&rsquo;t come
                online, and the move that&rsquo;s yours to make. Read it on your phone tonight.
              </p>
              <form className="fgm-form" onSubmit={handleSubmit} noValidate>
                <div className="fgm-field">
                  <input
                    ref={inputRef}
                    className={'fgm-input' + (error ? ' is-error' : '')}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@yourkitchen.com"
                    aria-label="Your email address"
                    aria-invalid={!!error}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                  />
                </div>
                {error && <div className="fgm-error">{error}</div>}
                <label className="fgm-consent">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span>
                    Yes, send me the free field guide and the{' '}
                    <a href="#subscribe" onClick={onClose}>Saturday Letter</a>.
                    I can unsubscribe anytime &mdash; no awkward breakups.
                  </span>
                </label>
                <button className="fgm-submit" type="submit" disabled={submitting || !consent}>
                  {submitting ? 'Sending…' : 'Send me the guide'}
                  {!submitting && <span className="fgm-submit-arrow">&rarr;</span>}
                </button>
              </form>
              <p className="fgm-fine">
                Free, always. You&rsquo;ll also get the Saturday Letter &mdash; the developmental
                science your kids&rsquo; teachers know, explained in plain language. Every
                Saturday. Unsubscribe in one click.
              </p>
            </Fragment>
          ) : (
            <div className="fgm-success">
              <div className="fgm-check" aria-hidden="true">&#10003;</div>
              <span className="fgm-eyebrow">Check your inbox</span>
              <h2 className="fgm-h2" id="fgm-title">It&rsquo;s on its way.</h2>
              <p className="fgm-sub">
                I just sent the field guide to <strong>{email.trim()}</strong>. It should land
                in a minute &mdash; peek in spam if it&rsquo;s shy, and drag it to your inbox so
                the Saturday Letter finds you too.
              </p>
              <button className="fgm-done" onClick={onClose}>Back to the site</button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
