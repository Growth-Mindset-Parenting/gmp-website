import { THANK_YOU } from '../data/screen-reset-sales';
import ScreenResetPurchaseTracker from './ScreenResetPurchaseTracker';

// Where Kajabi sends a buyer after checkout: what happens next, the login
// link, and what to do if the login email has not arrived. The login email
// itself is sent by Kajabi.
//
// Purchase tracking DOES fire here: ScreenResetPurchaseTracker reports the
// sale to Google Analytics and the Meta pixel when Kajabi's link ends in
// ?offer=sale or ?offer=full (see that file for the once-only rules).
// Copy: THANK_YOU in data/screen-reset-sales.js.
export default function ScreenResetThankYou() {
  const t = THANK_YOU;
  return (
    <div className="aps srs srs-thanks">
      <ScreenResetPurchaseTracker />
      <header className="aps-nav">
        <img src="/images/autopilot/gmp-logo.png" alt={t.logoAlt} width="600" height="74" className="aps-logo" />
      </header>
      <main className="srs-thanks-body">
        <div className="srs-thanks-inner">
          <div className="srs-thanks-head">
            <h1 className="aps-h1">
              {t.headline} <em>{t.headlineAccent}</em>
            </h1>
            <p className="srs-thanks-text">{t.intro}</p>
          </div>

          <section className="srs-thanks-card">
            <h2 className="srs-thanks-h2">{t.stepsTitle}</h2>
            <ol className="srs-thanks-steps">
              {t.steps.map((step, i) => (
                <li key={step.title} className="srs-thanks-step">
                  <span className="aps-numeral srs-thanks-num" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="srs-thanks-step-title">{step.title}</h3>
                    <p className="srs-thanks-step-text">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="srs-thanks-login">
              <p className="srs-thanks-login-lead">{t.loginLead}</p>
              <a href={t.login.href} className="aps-btn aps-btn-primary">
                {t.login.label} <span aria-hidden="true">→</span>
              </a>
            </div>
          </section>

          <section className="srs-thanks-help">
            <h2 className="srs-thanks-h2">{t.helpTitle}</h2>
            <ul className="srs-thanks-help-list">
              {t.helpItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="srs-thanks-help-contact">
              {t.helpContact.before}
              <a href={`mailto:${t.helpContact.email}`} className="aps-inline-link">{t.helpContact.email}</a>
              {t.helpContact.after}
            </p>
          </section>

          <div className="srs-thanks-close">
            <p className="srs-thanks-text">{t.second}</p>
            <p className="srs-thanks-sig">{t.signature}</p>
          </div>
        </div>
      </main>
      <p className="srs-thanks-foot">{t.copyright}</p>
    </div>
  );
}
