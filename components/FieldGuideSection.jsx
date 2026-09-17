'use client';
import { appendKitFields } from '../lib/attribution';
import { useState } from 'react';

const KIT_FORM_ID = process.env.NEXT_PUBLIC_KIT_FIELD_GUIDE_FORM_ID;

const SKILLS = [
  { n: '01', name: 'Emotional literacy' },
  { n: '02', name: 'Resilience' },
  { n: '03', name: 'Reflection' },
  { n: '04', name: 'Relationship' },
  { n: '05', name: 'Autonomy' },
  { n: '06', name: 'Adaptation' },
];

export default function FieldGuideSection() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!consent) return;
    setStatus('submitting');
    try {
      const body = appendKitFields(new URLSearchParams({ email_address: email }));
      const res = await fetch(
        `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`,
        { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() }
      );
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="v7-lead" id="guide" aria-label="Free field guide">
      <div className="v7-lead-card">
        <div className="v7-lead-mock" aria-hidden="true">
          <div className="v7-gc">
            <p className="v7-gc-eyebrow">A Teacher&rsquo;s Field Guide</p>
            <h3 className="v7-gc-title">The Six Skills</h3>
            <p className="v7-gc-sub">your middle schooler is building</p>
            <div className="v7-gc-rule" />
            <ul className="v7-gc-list">
              {SKILLS.map((s) => (
                <li key={s.n}><span className="n">{s.n}</span>{s.name}</li>
              ))}
            </ul>
            <div className="v7-gc-foot">Free &middot; 5-minute read &middot; PDF</div>
          </div>
        </div>

        <div className="v7-lead-cap">
          <p className="v7-lead-eyebrow">The free field guide</p>
          <h2 className="v7-lead-h">
            What looks like attitude is almost always <em>a skill</em> that hasn&rsquo;t
            come online yet.
          </h2>
          <p className="v7-lead-say">
            Name all six Middle Skills, see what each looks like before it&rsquo;s built and
            as it&rsquo;s developing, and get a new way to read what&rsquo;s really going on
            &mdash; so you can respond instead of react.
          </p>

          {status === 'success' ? (
            <div className="v7-lead-success" role="status" aria-live="polite">
              <div className="v7-lead-check" aria-hidden="true">&#10003;</div>
              <div className="v7-lead-success-body">
                <p className="v7-lead-success-eyebrow">Check your inbox</p>
                <h3 className="v7-lead-success-h">It&rsquo;s on its way.</h3>
                <p className="v7-lead-success-say">
                  I just sent the field guide to <strong>{email.trim()}</strong>. It&rsquo;ll
                  land in a minute &mdash; peek in spam if it&rsquo;s shy, and drag it to your
                  inbox so the Saturday Letter finds you too.
                </p>
              </div>
            </div>
          ) : (
            <>
              <form className="v7-lead-form" onSubmit={handleSubmit} noValidate>
                <input
                  type="email"
                  placeholder="you@yourkitchen.com"
                  aria-label="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={status === 'submitting'}
                />
                <label className="v7-lead-consent">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                  />
                  <span>
                    Yes, send me the free field guide and the{' '}
                    <a href="#subscribe">Saturday Letter</a>. I can unsubscribe anytime &mdash; no
                    awkward breakups.
                  </span>
                </label>
                {status === 'error' && (
                  <p style={{ fontFamily: 'var(--sans)', color: 'var(--paper)', fontSize: 13 }}>
                    Something went wrong &mdash; try again in a moment.
                  </p>
                )}
                <button
                  type="submit"
                  className="v7-lead-cta"
                  disabled={status === 'submitting' || !consent}
                >
                  {status === 'submitting' ? 'Sending…' : 'Send me the field guide'}
                  {status !== 'submitting' && <span className="a">&rarr;</span>}
                </button>
              </form>
              <p className="v7-lead-fine">Free. Delivered to your inbox instantly. Plain text, no spam.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
