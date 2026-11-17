import ScreenResetThankYou from '../../../components/ScreenResetThankYou';

// Where Kajabi sends a buyer after The Screen Reset checkout. Copy lives in
// data/screen-reset-sales.js (THANK_YOU).
export const metadata = {
  title: { absolute: 'You’re in · Growth Mindset Parenting' },
  description: 'You’re in. Check your email for your login to The Screen Reset.',
  alternates: { canonical: '/screen-reset/thank-you/' },
  // Post-purchase only: no nav link, not in sitemap, not indexable.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ScreenResetThankYouPage() {
  return <ScreenResetThankYou />;
}
