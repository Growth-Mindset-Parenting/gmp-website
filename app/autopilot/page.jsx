import AutopilotWaitlist from '../../components/AutopilotWaitlist';

// Standalone capture page: no site Nav/Footer on purpose — the only way off
// the page is the form. Copy lives in data/autopilot-waitlist.js.
// The earlier Autopilot sales-page draft is in git history (3946e65).
export const metadata = {
  title: { absolute: 'Autopilot — Join the waitlist · Growth Mindset Parenting' },
  description:
    'Autopilot is a 5-week live course for parents of kids roughly 9–14, taught by Sean Kane. Join the waitlist for first invite to the free live workshop and early access before doors open.',
  alternates: { canonical: '/autopilot/' },
  openGraph: {
    title: 'Autopilot | Growth Mindset Parenting',
    description:
      'Less reminding. Less managing. More capable kids. A 5-week live course for parents of kids roughly 9–14, taught by Sean Kane.',
    url: '/autopilot/',
    images: [{ url: '/images/autopilot/sean-hero.jpg', width: 1200, height: 1800, alt: 'Sean Kane' }],
  },
};

export default function AutopilotPage() {
  return <AutopilotWaitlist />;
}
