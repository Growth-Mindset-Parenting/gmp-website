import AutopilotWorkshopThankYou from '../../../components/AutopilotWorkshopThankYou';

// Where the /workshop/ signup form sends people right after they register.
// Standalone: no site Nav/Footer. Copy lives in data/autopilot-workshop.js
// (thankYou + sessions).
export const metadata = {
  title: { absolute: 'You’re in: free live workshop · Growth Mindset Parenting' },
  description: 'Your links for Sean Kane’s free live workshop: Sunday, October 4 at 6pm CT or Monday, October 5 at 12pm CT.',
  alternates: { canonical: '/workshop/thank-you/' },
  // Post-signup only: no nav link, not in sitemap, not indexable.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function WorkshopThankYouPage() {
  return <AutopilotWorkshopThankYou />;
}
