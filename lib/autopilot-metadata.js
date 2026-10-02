// Page metadata for /autopilot/ — one set for the waitlist page, one for the
// sales page. app/autopilot/page.jsx picks between them off the launch clock
// (autopilotPageAt in data/launch-schedule.js); the hidden sales preview at
// /autopilot/enroll-preview/ reuses the sales set with noindex on top.

export const WAITLIST_METADATA = {
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

export const SALES_METADATA = {
  title: { absolute: 'Autopilot — A live course for parents of kids 9 to 15 · Growth Mindset Parenting' },
  description:
    'Autopilot is a live five-week course with Sean Kane for parents of kids 9 to 15. Teach the skills that turn everyday responsibility into real independence. First cohort starts October 13, 2026.',
  alternates: { canonical: '/autopilot/' },
  openGraph: {
    title: 'Autopilot | Growth Mindset Parenting',
    description:
      'Your kid is capable. Let them experience it. A live five-week course with Sean Kane for parents of kids 9 to 15.',
    url: '/autopilot/',
    images: [{ url: '/images/autopilot/sean-studio.jpg', width: 1000, height: 1500, alt: 'Sean Kane' }],
  },
};
