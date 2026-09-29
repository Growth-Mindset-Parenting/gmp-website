'use client';

import { trackBeginCheckout } from '../lib/analytics';

// An enroll button that goes to Kajabi checkout. It reports a GA4
// begin_checkout event (with where on the page it was clicked) as the
// visitor leaves. The visitor's saved utm_* tags are added to the link on
// click by components/AttributionCapture.jsx (mounted in the root layout),
// so Kajabi sees where the buyer came from.
export default function AutopilotCheckoutLink({ href, plan, location, value, className, children }) {
  return (
    <a
      href={href}
      className={className}
      data-checkout={plan}
      onClick={() => trackBeginCheckout({
        location: `autopilot-sales:${location}`,
        value,
        itemName: plan === 'plan' ? 'Autopilot (2 payments)' : 'Autopilot',
      })}
    >
      {children}
    </a>
  );
}
