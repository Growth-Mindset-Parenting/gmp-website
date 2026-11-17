'use client';

import { trackBeginCheckout } from '../lib/analytics';

// A buy button that goes to Kajabi checkout, for any product. It reports a
// GA4 begin_checkout event as the visitor leaves:
//   location  — where the click happened, e.g. "screen-reset-sales:hero"
//   value     — the price as a number (67, 99, 297 …)
//   itemName  — the product, e.g. "The Screen Reset"
// `checkout` is written to data-checkout so the button can be found and
// tested (e.g. "sale", "full", "once", "plan").
// The visitor's saved utm_* tags are added to the link on click by
// components/AttributionCapture.jsx (mounted in the root layout), so Kajabi
// sees where the buyer came from.
export default function CheckoutLink({ href, checkout, location, value, itemName, className, children }) {
  const track = () => trackBeginCheckout({ location, value, itemName });
  return (
    <a
      href={href}
      className={className}
      data-checkout={checkout}
      onClick={track}
      // Middle-click (open in new tab) does not fire onClick.
      onAuxClick={(e) => { if (e.button === 1) track(); }}
    >
      {children}
    </a>
  );
}
