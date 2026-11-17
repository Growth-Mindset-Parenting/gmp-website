// Page metadata for /screen-reset/ and /courses/. Same pattern as
// lib/autopilot-metadata.js. No prices or dates here on purpose: the sales
// page switches from $67 to $99 by itself, and search results must never be
// left quoting the old price.

export const SCREEN_RESET_METADATA = {
  title: { absolute: 'The Screen Reset — A weekend course for parents of kids 9 to 14 · Growth Mindset Parenting' },
  description:
    'The Screen Reset is a self-paced course with Sean Kane for parents of kids 9 to 14. In one weekend, sit down with your kid and build a screen agreement they helped write and can actually keep.',
  alternates: { canonical: '/screen-reset/' },
  openGraph: {
    title: 'The Screen Reset | Growth Mindset Parenting',
    description:
      'Screens should be part of your kid’s life. Not all of it. A weekend course with Sean Kane for parents of kids 9 to 14.',
    url: '/screen-reset/',
    images: [{ url: '/images/autopilot/sean-studio.jpg', width: 1000, height: 1500, alt: 'Sean Kane' }],
  },
};

export const COURSES_METADATA = {
  title: 'Courses',
  description:
    'Courses from Sean Kane for parents of kids 9 to 14: The Screen Reset, a weekend course on screens, and Autopilot, a course on executive function.',
  alternates: { canonical: '/courses/' },
  openGraph: {
    title: 'Courses | Growth Mindset Parenting',
    description:
      'The Screen Reset, a weekend course on screens, and Autopilot, a course on executive function. Taught by Sean Kane.',
    url: '/courses/',
    images: [{ url: '/images/sean-wide.jpg' }],
  },
};
