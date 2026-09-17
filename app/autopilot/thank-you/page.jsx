import AutopilotThankYou from '../../../components/AutopilotThankYou';

// Where the waitlist button in Sean's newsletter sends people. The Kit link
// trigger adds the tag on click, so this page only confirms. Copy lives in
// data/autopilot-waitlist.js (confirmation).
export const metadata = {
  title: { absolute: 'You’re on the list · Growth Mindset Parenting' },
  description: 'You’re on the Autopilot waitlist. Watch your inbox for a short note from Sean.',
  alternates: { canonical: '/autopilot/thank-you/' },
  // Post-signup only: no nav link, not in sitemap, not indexable.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AutopilotThankYouPage() {
  return <AutopilotThankYou />;
}
