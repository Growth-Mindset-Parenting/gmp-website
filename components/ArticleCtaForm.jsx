'use client';
import { getAttribution } from '../lib/attribution';
import { useState } from 'react';


export default function ArticleCtaForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const company = e.currentTarget.elements.hp_gmp_check?.value || '';
      const res = await fetch('/api/subscribe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), slug: 'newsletter', utms: getAttribution(), company }),
      });
      if (res.ok) { setStatus('success'); setEmail(''); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, color: 'var(--ink)' }}>
        You&rsquo;re in &mdash; see you Saturday.
      </p>
    );
  }

  return (
    <form className="v6-article-cta-form" onSubmit={handleSubmit} noValidate>
      {/* Bot trap: hidden from people; a filled value tags the signup as possible spam (never drops it). */}
      <input type="text" name="hp_gmp_check" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
      <input
        type="email"
        required
        placeholder="you@yourkitchen.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'submitting'}
      />
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)', marginTop: 8 }}>
          Something went wrong &mdash; try again in a moment.
        </p>
      )}
    </form>
  );
}
