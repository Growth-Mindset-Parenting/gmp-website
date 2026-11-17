'use client';

import CheckoutLink from './CheckoutLink';

// An enroll button that goes to Kajabi checkout. It reports a GA4
// begin_checkout event (with where on the page it was clicked) as the
// visitor leaves. The button itself is the shared components/CheckoutLink.jsx;
// this wrapper only fills in Autopilot's event names, which are unchanged.
export default function AutopilotCheckoutLink({ href, plan, location, value, className, children }) {
  return (
    <CheckoutLink
      href={href}
      checkout={plan}
      location={`autopilot-sales:${location}`}
      value={value}
      itemName={plan === 'plan' ? 'Autopilot (2 payments)' : 'Autopilot'}
      className={className}
    >
      {children}
    </CheckoutLink>
  );
}
