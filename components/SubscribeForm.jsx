'use client';
import { appendKitFields } from '../lib/attribution';
import { useState } from 'react';

const KIT_FORM_ID = process.env.NEXT_PUBLIC_KIT_FORM_ID || '9228951';

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
      const body = appendKitFields(new URLSearchParams({ email_address: email }));
      const res = await fetch(
        `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        }
      );
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
