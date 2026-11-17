// The Courses page (/courses/) — the hub the site's "Courses" nav link opens.
// All copy and links live here. Each button link carries utm tags so clicks
// from this page can be told apart from the banner and popup
// (see lib/attribution.js and the GMP Link Tracker sheet, UTM tab).
export const COURSES = {
  headline: 'Courses',
  cards: [
    {
      tone: 'sage',
      title: 'The Screen Reset',
      body: 'A weekend course to help parents stop fighting over screens and teach their kid to put them down on their own.',
      cta: 'See the course',
      href: '/screen-reset/?utm_source=website&utm_medium=courses-page&utm_campaign=screen-reset',
    },
    {
      tone: 'cream',
      title: 'Autopilot',
      body: 'A course built to help parents stop over-functioning and develop their kids’ executive function.',
      cta: 'Join the waitlist',
      href: '/autopilot/?utm_source=website&utm_medium=courses-page&utm_campaign=autopilot-waitlist',
    },
  ],
};
