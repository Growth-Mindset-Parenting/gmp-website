'use client';

import { useEffect, useState } from 'react';
import { WORKSHOP } from '../data/autopilot-workshop';
import { REGISTERED_KEY, googleCalendarUrl, icsUrl, outlookCalendarUrl } from '../lib/workshop-calendar';

// Instagram, Facebook and TikTok's in-app browsers usually ignore .ics downloads.
const IN_APP_RE = /Instagram|FBAN|FBAV|TikTok|musical_ly|Bytedance/i;

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

  useEffect(() => {
    setInApp(IN_APP_RE.test(navigator.userAgent));

    // Count each registration once. The signup modal sets the flag just
    // before sending people here; a reload or a cold visit finds it gone.
    // Fired here rather than before the redirect, where the page can unload
    // before the hit leaves the browser.
    let fresh = false;
    try {
      fresh = sessionStorage.getItem(REGISTERED_KEY) === '1';
      if (fresh) sessionStorage.removeItem(REGISTERED_KEY);
    } catch {
      // Private browsing can block sessionStorage; skip the count.
    }
    if (fresh && typeof window.gtag === 'function') {
      window.gtag('event', 'workshop_register', { list: 'autopilot-workshop' });
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
            </div>
            <a className="apty-join" href={s.joinUrl} target="_blank" rel="noopener noreferrer">
              {t.join} <span aria-hidden="true">→</span>
            </a>
            <p className="apty-cal-intro">{t.calendarIntro}</p>
            <div className="apty-cal-list">
              <CalendarButton href={googleCalendarUrl(s)} label={t.google} external />
              <CalendarButton href={icsUrl(s)} label={t.apple} />
              <CalendarButton href={outlookCalendarUrl(s)} label={t.outlook} external />
            </div>
          </section>
        ))}

        {inApp && <p className="apty-note">{t.inAppNote}</p>}

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
