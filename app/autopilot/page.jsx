import AutopilotWaitlist from '../../components/AutopilotWaitlist';
import AutopilotSales from '../../components/AutopilotSales';
import { autopilotPageAt } from '../../data/launch-schedule';
import { SALES_METADATA, WAITLIST_METADATA } from '../../lib/autopilot-metadata';

// /autopilot/ switches BY ITSELF from the waitlist page to the sales page when
// doors open (Sat Oct 3 2026, 00:00 CT — DOORS_OPEN in data/launch-schedule.js).
// No deploy needed: the page is regenerated on the server at most every 60
// seconds (ISR), and each regeneration re-checks the clock. Without this
// `revalidate` the page would be frozen at build time and never switch.
//
// Both pages are standalone: no site Nav/Footer. Copy lives in
// data/autopilot-waitlist.js and data/autopilot-sales.js; metadata in
// lib/autopilot-metadata.js. The hidden preview at /autopilot/enroll-preview/
// keeps rendering the sales page (noindex) for test links.
export const revalidate = 60;

export function generateMetadata() {
  return autopilotPageAt() === 'sales' ? SALES_METADATA : WAITLIST_METADATA;
}

export default function AutopilotPage() {
  return autopilotPageAt() === 'sales' ? <AutopilotSales /> : <AutopilotWaitlist />;
}
