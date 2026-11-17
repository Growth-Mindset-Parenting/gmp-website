import { THANK_YOU } from '../data/screen-reset-sales';

// Where Kajabi sends a buyer after checkout. It only says thank you: the
// login email is sent by Kajabi. No purchase tracking fires here, the same
// as the rest of the site (the Autopilot thank-you page only records a
// waitlist join; purchases are counted in Kajabi).
// Copy: THANK_YOU in data/screen-reset-sales.js.
export default function ScreenResetThankYou() {
  const t = THANK_YOU;
  return (
    <div className="aps srs srs-thanks">
      <header className="aps-nav">
        <img src="/images/autopilot/gmp-logo.png" alt={t.logoAlt} width="600" height="74" className="aps-logo" />
      </header>
      <main className="srs-thanks-body">
        <div className="srs-thanks-inner">
          <h1 className="aps-h1">
            {t.headline} <em>{t.headlineAccent}</em>
          </h1>
          <p className="srs-thanks-text">{t.body}</p>
          <p className="srs-thanks-text">{t.second}</p>
          <p className="srs-thanks-sig">{t.signature}</p>
        </div>
      </main>
      <p className="srs-thanks-foot">{t.copyright}</p>
    </div>
  );
}
