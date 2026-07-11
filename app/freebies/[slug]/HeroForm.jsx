'use client';
import { useState } from 'react';

export default function HeroForm({ freebie, variant, onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const emailVal = email.trim();
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
          firstName: name.trim(),
          slug: freebie.slug,
          variant,
        }),
      });
      if (!res.ok) throw new Error('subscribe failed');
      setSubmitting(false);
      onSuccess(name.trim(), emailVal);
    } catch {
      setError('Something went wrong — try again in a moment.');
      setSubmitting(false);
    }
  }

  const microParts = freebie.microCopy.split(freebie.microCopyBold);

  return (
    <form className="fb-hero-form" onSubmit={handleSubmit} noValidate>
      <div className="fb-hero-form-row">
        <input
          className="fb-input fb-input-name"
          type="text"
          autoComplete="given-name"
          placeholder="First name"
          aria-label="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
        />
        <input
          className={'fb-input fb-input-email' + (error ? ' is-error' : '')}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          aria-label="Email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
          disabled={submitting}
        />
      </div>
      <button type="submit" className="gmp-btn gmp-btn-primary fb-btn-full" disabled={submitting}>
        {submitting ? 'One moment…' : 'Get me my free guide →'}
      </button>
      {error && <div className="fb-form-error">{error}</div>}
      <p className="fb-microcopy">
        {microParts[0]}
        <strong>{freebie.microCopyBold}</strong>
        {microParts[1]}
      </p>
    </form>
  );
}
