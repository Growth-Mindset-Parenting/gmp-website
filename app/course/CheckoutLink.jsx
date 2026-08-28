'use client';
import { trackBeginCheckout } from '../../lib/analytics';

// Wraps the outbound Kajabi links so we can measure click-through. The href is
// a normal anchor, so it still works with JS disabled and for crawlers — the
// event is a side effect, never a gate on navigation.
export default function CheckoutLink({ href, location, value, itemName, children, ...rest }) {
  return (
    <a
      href={href}
      onClick={() => trackBeginCheckout({ location, value, itemName })}
      {...rest}
    >
      {children}
    </a>
  );
}
