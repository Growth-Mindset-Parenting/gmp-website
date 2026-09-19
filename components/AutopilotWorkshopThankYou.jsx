'use client';

import { useEffect, useState } from 'react';
import { WORKSHOP } from '../data/autopilot-workshop';
import { COUNTED_KEY, JOIN_LINK_KEY, buildIcs, googleCalendarUrl, outlookCalendarUrl, validJoinLink } from '../lib/workshop-calendar';

// Instagram, Facebook and TikTok's in-app browsers usually ignore .ics downloads.
const IN_APP_RE = /Instagram|FBAN|FBAV|TikTok|musical_ly|Bytedance/i;

function CalendarButton({ href, label, external, onClick }) {
  return (
    <a
      className="apty-cal"
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label} <span aria-hidden="true">→</span>
    </a>
  );
}

// Apple Calendar: build the .ics in the browser so the personal join link
// never travels through a URL or a server request.
function downloadIcs(link) {
  const blob = new Blob([buildIcs(link)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'growth-mindset-workshop.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function AutopilotWorkshopThankYou() {
  const t = WORKSHOP.thankYou;
  // Read once the page is in the browser: the signup modal stores the
  // personal join link in sessionStorage just before sending people here.
  // The calendar buttons work without it; they just won't carry the link.
  const [state, setState] = useState({ link: null, inApp: false });

  useEffect(() => {
    let link = null;
    try {
      link = validJoinLink(sessionStorage.getItem(JOIN_LINK_KEY));
    } catch {
      // Private browsing can block sessionStorage; the page still works.
    }
    setState({ link, inApp: IN_APP_RE.test(navigator.userAgent) });

    // Count each registration once, even if this page is reloaded. Fired
    // here rather than before the redirect, where the page can unload
    // before the hit leaves the browser.
    if (link && typeof window.gtag === 'function') {
      try {
        if (!sessionStorage.getItem(COUNTED_KEY)) {
          sessionStorage.setItem(COUNTED_KEY, '1');
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
          <p className="apty-dek">{state.link ? t.dek : t.dekNoLink}</p>
        </section>

        <section className="apty-date">
          <p className="apty-date-day">{t.dateLine}</p>
          <p className="apty-date-time">{t.timeLine}</p>
        </section>

        <section>
          <p className="apty-cal-intro">{state.link ? t.calendarIntro : t.calendarIntroNoLink}</p>
          <div className="apty-cal-list">
            <CalendarButton href={googleCalendarUrl(state.link)} label={t.google} external />
            {/* With a personal link the file is built here; without one the
                server's plain copy is a more reliable download in in-app
                browsers, which often block blob: downloads. */}
            <CalendarButton
              href="/api/workshop-ics/"
              label={t.apple}
              onClick={
                state.link
                  ? (e) => {
                      e.preventDefault();
                      downloadIcs(state.link);
                    }
                  : undefined
              }
            />
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
