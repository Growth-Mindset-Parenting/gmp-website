import AutopilotSales from '../../../components/AutopilotSales';

// HIDDEN PREVIEW of the Autopilot sales page, for review before doors open.
// Not linked anywhere, not in the sitemap or llms.txt, noindex/nofollow, and
// the site banner + popup are switched off here (HIDDEN_PATHS in
// data/site-banner.js and data/site-popup.js).
//
// This moves to /autopilot/ when doors open Sat Oct 3 2026. The swap:
//   1. move this page to app/autopilot/page.jsx (and move the waitlist page
//      that lives there now somewhere else, or retire it),
//   2. drop the robots noindex below and set canonical/url to /autopilot/,
//   3. add /autopilot/ back to app/sitemap.js with a fresh lastModified,
//   4. remove /autopilot/enroll-preview/ from both HIDDEN_PATHS lists.
// Copy lives in data/autopilot-sales.js.
export const metadata = {
  title: { absolute: 'Autopilot — A live course for parents of kids 9 to 15 · Growth Mindset Parenting' },
  description:
    'Autopilot is a live five-week course with Sean Kane for parents of kids 9 to 15. Teach the skills that turn everyday responsibility into real independence. First cohort starts October 13, 2026.',
  alternates: { canonical: '/autopilot/enroll-preview/' },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: 'Autopilot | Growth Mindset Parenting',
    description:
      'Your kid is capable. Let them experience it. A live five-week course with Sean Kane for parents of kids 9 to 15.',
    url: '/autopilot/enroll-preview/',
    images: [{ url: '/images/autopilot/sean-studio.jpg', width: 1000, height: 1500, alt: 'Sean Kane' }],
  },
};

export default function AutopilotEnrollPreviewPage() {
  return <AutopilotSales />;
}
