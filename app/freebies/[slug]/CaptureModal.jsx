'use client';
import { useState, useEffect } from 'react';

export default function CaptureModal({ freebie, variant, open, done, name, email, onClose, onConfirmed }) {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fresh form fields each time the modal opens in capture mode
  useEffect(() => {
    if (open && !done) {
      setFormName('');
      setFormEmail('');
      setError('');
      setSubmitting(false);
    }
  }, [open, done]);

  // Close on Escape
  useEffect(() => {
    if (!open) return undefined;
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    const emailVal = formEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      setError('Enter a valid email so I know where to send it.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailVal,
          firstName: formName.trim(),
          slug: freebie.slug,
          variant,
        }),
      });
      if (!res.ok) throw new Error('subscribe failed');
      setSubmitting(false);
      onConfirmed(formName.trim(), emailVal);
    } catch {
      setError('Something went wrong — try again in a moment.');
      setSubmitting(false);
    }
  }

  if (!open) return null;

  const firstName = (name || '').split(' ')[0] || 'there';
  const emailShown = (email || '').trim() || 'your inbox';

  return (
    <div
      className="fb-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="fb-modal" role="dialog" aria-modal="true">
        <button className="fb-modal-close" onClick={onClose} aria-label="Close">&times;</button>

        {done ? (
          <div className="fb-modal-confirm">
            <div className="fb-modal-check" aria-hidden="true">&#10003;</div>
            <h2 className="fb-modal-confirm-heading">
              You&rsquo;re in, <em>{firstName}</em>.
            </h2>
            <p className="fb-modal-confirm-body">
              Here&rsquo;s {freebie.title} — grab it right now. I&rsquo;ve also sent a
              copy to <strong>{emailShown}</strong> so it&rsquo;s always a click away.
            </p>
            {freebie.pdfUrl && (
              <a
                className="gmp-btn gmp-btn-primary fb-btn-full"
                href={freebie.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download the guide &#8594;
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ink-mute)',
                cursor: 'pointer',
                marginTop: '14px',
                fontFamily: 'var(--sans)',
                fontSize: '13px',
              }}
            >
              I&rsquo;ve got it
            </button>
          </div>
        ) : (
          <>
            <p className="gmp-eyebrow fb-modal-eyebrow">{freebie.modalEyebrow}</p>
            <h2 className="fb-modal-heading">Where should I send it?</h2>
            <p className="fb-modal-sub">Free. No spam. I read every reply.</p>
            <form className="fb-modal-form" onSubmit={handleSubmit} noValidate>
              <input
                className="fb-input"
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                aria-label="First name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                disabled={submitting}
              />
              <input
                className={'fb-input' + (error ? ' is-error' : '')}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Email address"
                aria-label="Email address"
                value={formEmail}
                onChange={(e) => { setFormEmail(e.target.value); if (error) setError(''); }}
                disabled={submitting}
              />
              <button type="submit" className="gmp-btn gmp-btn-primary fb-btn-full" disabled={submitting}>
                {submitting ? 'One moment…' : 'Get me my free guide →'}
              </button>
              {error && <div className="fb-form-error">{error}</div>}
            </form>
            <p className="fb-modal-reassurance">Free, always. Unsubscribe in one click.</p>
          </>
        )}
      </div>
    </div>
  );
}
