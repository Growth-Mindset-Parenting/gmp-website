'use client';

import { useEffect, useState } from 'react';
import { WORKSHOP } from '../data/autopilot-workshop';
import { whenGtag } from '../lib/analytics';
import { getAttribution } from '../lib/attribution';
import { REGISTERED_KEY, googleCalendarUrl, icsUrl, outlookCalendarUrl } from '../lib/workshop-calendar';

// Instagram, Facebook and TikTok's in-app browsers usually ignore .ics downloads.
const IN_APP_RE = /Instagram|FBAN|FBAV|TikTok|musical_ly|Bytedance/i;

// Kit's invite emails link straight here; clicking the button is the
// registration (a Kit link trigger adds the Registered tag). Those links
// carry these tags, the website form's redirect doesn't.
const fromInviteEmail = (params) =>
  params.get('utm_source') === 'kit' && params.get('utm_campaign') === 'autopilot-workshop';

// Remembers an email-link registration was already counted, so a reload or a
// second click from the email doesn't count it again.
const EMAIL_COUNTED_KEY = 'apws-email-registration-counted';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneDigits = (value) => String(value).replace(/\D/g, '');
const validPhone = (value) => {
  const d = phoneDigits(value);
  return d.length === 10 || (d.length === 11 && d.startsWith('1'));
};
const SUBMIT_TIMEOUT_MS = 15000;

// Email-link registrants never saw the form's phone field, so they get one
// here, under the calendar buttons. It posts to the same route as the form,
// which saves the number to Kit and tags them "SMS ok".
function TextReminder() {
  const t = WORKSHOP.thankYou.sms;
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const onField = (set, value) => {
    set(value);
    if (error) setError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    const emailValue = email.trim();
    const phoneValue = phone.trim();
    const company = e.currentTarget.elements.hp_gmp_check?.value || '';
    if (!EMAIL_RE.test(emailValue)) {
      setError(t.errorEmail);
      return;
    }
    if (!validPhone(phoneValue)) {
      setError(t.errorPhone);
      return;
    }
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/workshop-register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue, phone: phoneValue, utms: getAttribution(), company }),
        signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setDone(true);
      whenGtag((gtag) => gtag('event', 'workshop_sms_optin', { list: 'autopilot-workshop', method: 'thank_you_page' }));
    } catch {
      setError(t.errorServer);
    } finally {
      setBusy(false);
    }
  };

  const m = WORKSHOP.modal;
  return (
    <section className="apty-sms" aria-labelledby="apty-sms-h">
      <h2 id="apty-sms-h" className="apty-sms-h">{t.headline}</h2>
      {done ? (
        <p className="apty-sms-done" role="status">{t.done}</p>
      ) : (
        <>
          <p className="apty-sms-intro">{t.intro}</p>
          <form className="apty-sms-form" onSubmit={onSubmit} noValidate>
            <label htmlFor="apty-sms-email" className="apty-sms-label">{t.emailLabel}</label>
            <input
              id="apty-sms-email"
              className="apty-sms-input"
              type="email"
              name="email_address"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => onField(setEmail, e.target.value)}
              aria-invalid={error === t.errorEmail ? 'true' : undefined}
            />
            <label htmlFor="apty-sms-phone" className="apty-sms-label">{t.phoneLabel}</label>
            <input
              id="apty-sms-phone"
              className="apty-sms-input"
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              placeholder={t.phonePlaceholder}
              value={phone}
              onChange={(e) => onField(setPhone, e.target.value)}
              aria-invalid={error === t.errorPhone ? 'true' : undefined}
              aria-describedby="apty-sms-print"
            />
            {/* Bot trap, same as the signup form's. */}
            <input type="text" name="hp_gmp_check" tabIndex={-1} autoComplete="off" aria-hidden="true" className="apty-trap" />
            <button type="submit" className="apty-sms-submit" disabled={busy}>
              {busy ? t.buttonBusy : t.button}
            </button>
          </form>
          {error && <p role="alert" className="apty-sms-error">{error}</p>}
          <p id="apty-sms-print" className="apty-sms-print">
            {m.smsPrint}{' '}
            {m.smsLinks.map((l, i) => (
              <span key={l.href}>
                {i > 0 && ' · '}
                <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
              </span>
            ))}
            .
          </p>
        </>
      )}
    </section>
  );
}

function CalendarButton({ href, label, external }) {
  return (
    <a
      className="apty-cal"
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label} <span aria-hidden="true">→</span>
    </a>
  );
}

export default function AutopilotWorkshopThankYou() {
  const t = WORKSHOP.thankYou;
  const [inApp, setInApp] = useState(false);
  const [viaEmail, setViaEmail] = useState(false);

  useEffect(() => {
    setInApp(IN_APP_RE.test(navigator.userAgent));
    const emailVisit = fromInviteEmail(new URLSearchParams(window.location.search));
    setViaEmail(emailVisit);

    // Count each registration once. The signup modal sets the flag just
    // before sending people here; a reload or a cold visit finds it gone.
    // Fired here rather than before the redirect, where the page can unload
    // before the hit leaves the browser. whenGtag waits for GA to load: an
    // event sent before then is silently lost.
    let fresh = false;
    try {
      fresh = sessionStorage.getItem(REGISTERED_KEY) === '1';
      if (fresh) sessionStorage.removeItem(REGISTERED_KEY);
    } catch {
      // Private browsing can block sessionStorage; skip the count.
    }
    if (fresh) {
      whenGtag((gtag) => gtag('event', 'workshop_register', { list: 'autopilot-workshop', method: 'form' }));
    }

    // Email-link registrations: count once per browser. Kit's Registered tag
    // stays the true headcount; this is for comparing channels in GA4.
    if (emailVisit && !fresh) {
      whenGtag((gtag) => {
        let counted = false;
        try {
          counted = localStorage.getItem(EMAIL_COUNTED_KEY) === '1';
          if (!counted) localStorage.setItem(EMAIL_COUNTED_KEY, '1');
        } catch {
          // No storage: count it anyway; a reload may count twice.
        }
        if (!counted) gtag('event', 'workshop_register', { list: 'autopilot-workshop', method: 'email_link' });
      });
    }
  }, []);

  return (
    <div className="apty">
      <header className="apty-header">
        <a href="/" aria-label="Growth Mindset Parenting home">
          <img src="/images/autopilot/gmp-logo.png" alt="Growth Mindset Parenting" width="242" height="30" className="apty-logo" />
        </a>
      </header>

      <main className="apty-main">
        <section className="apty-head">
          <p className="apty-eyebrow">{t.eyebrow}</p>
          <h1 className="apty-h1">
            {t.headline} <em>{t.headlineAccent}</em>
          </h1>
          <p className="apty-dek">{t.dek}</p>
        </section>

        <p className="apty-cal-intro">{t.sessionsIntro}</p>

        {WORKSHOP.sessions.map((s) => (
          <section key={s.key} className="apty-session">
            <div className="apty-date">
              <p className="apty-date-day">{s.dateLine}</p>
              <p className="apty-date-time">{s.timeLine}</p>
              {/* Most people sign up days ahead, so the link is a quiet
                  extra here; the calendar buttons do the real work. */}
              <a className="apty-join" href={s.joinUrl} target="_blank" rel="noopener noreferrer">
                {t.join} <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="apty-cal-intro">{t.calendarIntro}</p>
            <div className="apty-cal-list">
              <CalendarButton href={googleCalendarUrl(s)} label={t.google} external />
              <CalendarButton href={icsUrl(s)} label={t.apple} />
              <CalendarButton href={outlookCalendarUrl(s)} label={t.outlook} external />
            </div>
          </section>
        ))}

        {inApp && <p className="apty-note">{t.inAppNote}</p>}

        {viaEmail && <TextReminder />}

        <section className="apty-close">
          <p className="apty-signoff">{t.signoff}</p>
        </section>
      </main>

      <footer className="apty-footer">
        <div className="apty-footer-inner">
          <span>{t.copyright}</span>
          <a href="/">{t.siteLabel}</a>
        </div>
      </footer>
    </div>
  );
}
