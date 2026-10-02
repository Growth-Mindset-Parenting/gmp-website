import AutopilotSales from '../../../components/AutopilotSales';
import { SALES_METADATA } from '../../../lib/autopilot-metadata';

// HIDDEN PREVIEW of the Autopilot sales page. Not linked anywhere, not in the
// sitemap or llms.txt, noindex/nofollow, and the site banner + popup are
// switched off here (HIDDEN_PATHS in data/site-banner.js and data/site-popup.js).
//
// The real sales page goes live at /autopilot/ by itself when doors open
// (Sat Oct 3 2026, 00:00 CT) — see app/autopilot/page.jsx. This preview keeps
// working for the launch dashboard and test links.
// Copy lives in data/autopilot-sales.js.
export const metadata = {
  ...SALES_METADATA,
  alternates: { canonical: '/autopilot/enroll-preview/' },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: { ...SALES_METADATA.openGraph, url: '/autopilot/enroll-preview/' },
};

export default function AutopilotEnrollPreviewPage() {
  return <AutopilotSales />;
}
