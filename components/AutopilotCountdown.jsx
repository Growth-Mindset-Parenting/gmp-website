import { CART_CLOSES } from '../data/launch-schedule';
import { SALES } from '../data/autopilot-sales';
import SalesCountdown from './SalesCountdown';

// "Enrollment closes in" timer in the Autopilot sales page hero, above Sean's
// photo. Built from the countdown design handoff (Katie, 2026-10-09). Counts
// down to CART_CLOSES and removes itself once the cart has closed. The timer
// itself is the shared components/SalesCountdown.jsx.
export default function AutopilotCountdown() {
  return <SalesCountdown deadline={CART_CLOSES} labels={SALES.hero.countdown} />;
}
