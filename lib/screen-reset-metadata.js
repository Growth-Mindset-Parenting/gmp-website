// Page metadata for /screen-reset/ and /courses/. Same pattern as
// lib/autopilot-metadata.js. No prices or dates here on purpose: the sales
// page switches from $67 to $99 by itself, and search results must never be
// left quoting the old price.

// The title is `absolute`, so the site's " | Growth Mindset Parenting" ending
// is not added: with it the title would be too long for a search result.
const SCREEN_RESET_TITLE = 'The Screen Reset: A Weekend Screen Time Course for Parents';
const SCREEN_RESET_DESCRIPTION =
  'A self-paced course with Sean Kane for parents of kids 9 to 14. In one weekend, build a family screen time agreement your kid helped write and can keep.';
// The picture shown when the page is shared: landscape, the same one as /courses/.
const SCREEN_RESET_SHARE_IMAGE = { url: '/images/sean-wide.jpg', width: 1600, height: 900, alt: 'Sean Kane' };

export const SCREEN_RESET_METADATA = {
  title: { absolute: SCREEN_RESET_TITLE },
  description: SCREEN_RESET_DESCRIPTION,
  alternates: { canonical: '/screen-reset/' },
  openGraph: {
    title: SCREEN_RESET_TITLE,
    description: SCREEN_RESET_DESCRIPTION,
    url: '/screen-reset/',
    images: [SCREEN_RESET_SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SCREEN_RESET_TITLE,
    description: SCREEN_RESET_DESCRIPTION,
    images: [SCREEN_RESET_SHARE_IMAGE],
  },
};

export const COURSES_METADATA = {
  title: { absolute: 'Parenting Courses for the Middle School Years | Growth Mindset Parenting' },
  description:
    'Parenting courses by Sean Kane for parents of tweens and middle schoolers: The Screen Reset, a weekend course on screens, and Autopilot, on responsibility.',
  alternates: { canonical: '/courses/' },
  openGraph: {
    title: 'Parenting Courses for the Middle School Years | Growth Mindset Parenting',
    description:
      'Two courses by Sean Kane for parents of tweens and middle schoolers: The Screen Reset, a weekend course on screens, and Autopilot, on responsibility.',
    url: '/courses/',
    images: [{ url: '/images/sean-wide.jpg', width: 1600, height: 900, alt: 'Sean Kane' }],
  },
};
