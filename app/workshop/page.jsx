import AutopilotWorkshop from '../../components/AutopilotWorkshop';

// Free live workshop registration page for the Autopilot launch. Standalone:
// no site Nav/Footer. Every CTA opens the registration modal, whose form posts
// to /api/workshop-register/ (Kit) and then sends people to
// /workshop/thank-you/. Copy lives in data/autopilot-workshop.js.
export const metadata = {
  title: { absolute: 'Free live workshop: From Reminders to Responsibility · Growth Mindset Parenting' },
  description:
    'A free, live 60-minute workshop with Sean Kane for parents of middle schoolers: the classroom method for handing mornings, homework and chores back to your kid. Monday, October 12 · 12:00 pm CT · 60 minutes',
  alternates: { canonical: '/workshop/' },
  // Unlisted until Sean signs off: no nav link, not in sitemap, not indexable.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: 'From Reminders to Responsibility | Free live workshop',
    description:
      'A free, live workshop with Sean Kane for parents of middle schoolers. Monday, October 12 at 12pm CT.',
    url: '/workshop/',
    images: [{ url: '/images/autopilot/workshop-hero.jpg', width: 1200, height: 1800, alt: 'Sean Kane' }],
  },
};

export default function WorkshopPage() {
  return <AutopilotWorkshop />;
}
