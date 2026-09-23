'use client';
import { getAttribution } from '../lib/attribution';
import { useState } from 'react';


export default function SubscribeForm({
  inputPlaceholder = 'you@yourkitchen.com',
  buttonLabel = 'Subscribe →',
  variant = 'dark', // 'dark' (homepage) | 'light' (sidebar, about page)
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const textColor = variant === 'light' ? 'var(--ink)' : 'var(--paper)';
  const formClass = variant === 'light' ? 'v6-letters-side-form' : 'v6-sub-form';

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
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, color: textColor }}>
        You&rsquo;re in. See you Saturday.
      </p>
    );
  }

  if (status === 'error') {
    return (
      <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, color: textColor }}>
        Something went wrong. Try again or email Sean directly.
      </p>
    );
  }

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      {/* Bot trap: hidden from people; a filled value tags the signup as possible spam (never drops it). */}
      <input type="text" name="hp_gmp_check" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
      <input
        type="email"
        required
        placeholder={inputPlaceholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
        disabled={status === 'submitting'}
      />
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Subscribing…' : buttonLabel}
      </button>
    </form>
  );
}
