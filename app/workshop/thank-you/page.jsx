import AutopilotWorkshopThankYou from '../../../components/AutopilotWorkshopThankYou';

// Where the /workshop/ signup form sends people right after they register.
// Standalone: no site Nav/Footer. Copy lives in data/autopilot-workshop.js
// (thankYou + sessions).
export const metadata = {
  title: { absolute: 'You’re in: free live workshop · Growth Mindset Parenting' },
  description: 'Your seat is saved for Sean Kane’s free live workshop. Monday, October 12 · 12:00 pm CT · 60 minutes.',
  alternates: { canonical: '/workshop/thank-you/' },
  // Post-signup only: no nav link, not in sitemap, not indexable.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function WorkshopThankYouPage() {
  return <AutopilotWorkshopThankYou />;
}
