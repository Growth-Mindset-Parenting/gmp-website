'use client';

import { useEffect, useState } from 'react';
import { WORKSHOP } from '../data/autopilot-workshop';
import { googleCalendarUrl, icsUrl, joinLink, outlookCalendarUrl, validKey } from '../lib/workshop-calendar';

// Instagram, Facebook and TikTok's in-app browsers usually ignore .ics downloads.
const IN_APP_RE = /Instagram|FBAN|FBAV|TikTok|musical_ly|Bytedance/i;

function CalendarButton({ href, label, external }) {
  return (
    <a className="apty-cal" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {label} <span aria-hidden="true">→</span>
    </a>
  );
}

export default function AutopilotWorkshopThankYou() {
  const t = WORKSHOP.thankYou;
  // Filled in from the query string once the page is in the browser. The
  // calendar buttons work without it; they just won't carry the join link.
  const [state, setState] = useState({ key: null, link: null, inApp: false });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = validKey(params.get('key'));
    const link = joinLink(key, params.get('ew_short_link'));
    setState({ key, link, inApp: IN_APP_RE.test(navigator.userAgent) });

    // Count each registration once, even if the page is reloaded.
    if (key && typeof window.gtag === 'function') {
      try {
        const seen = `apws-registered-${key}`;
        if (!sessionStorage.getItem(seen)) {
          sessionStorage.setItem(seen, '1');
          window.gtag('event', 'workshop_register', { list: 'autopilot-workshop' });
        }
      } catch {
        window.gtag('event', 'workshop_register', { list: 'autopilot-workshop' });
      }
    }
  }, []);

  const [bonusBefore, bonusAfter] = t.bonus.split('{emphasis}');

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

        <section className="apty-date">
          <p className="apty-date-day">{t.dateLine}</p>
          <p className="apty-date-time">{t.timeLine}</p>
        </section>

        <section>
          <p className="apty-cal-intro">{t.calendarIntro}</p>
          <div className="apty-cal-list">
            <CalendarButton href={googleCalendarUrl(state.link)} label={t.google} external />
            <CalendarButton href={icsUrl(state.key)} label={t.apple} />
            <CalendarButton href={outlookCalendarUrl(state.link)} label={t.outlook} external />
          </div>
          {state.inApp && <p className="apty-note">{t.inAppNote}</p>}
        </section>

        <section className="apty-close">
          <p className="apty-bonus">
            {bonusBefore}
            <strong>{t.bonusEmphasis}</strong>
            {bonusAfter}
          </p>
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
