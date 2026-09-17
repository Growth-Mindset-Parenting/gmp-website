'use client';
import { appendKitFields } from '../lib/attribution';
import { useState } from 'react';

const KIT_FORM_ID = process.env.NEXT_PUBLIC_KIT_FORM_ID || '9228951';

export default function ArticleCtaForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const body = appendKitFields(new URLSearchParams({ email_address: email }));
      const res = await fetch(
        `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`,
        { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() }
      );
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
