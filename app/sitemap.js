import { getAllLetters } from '../lib/letters';
import { getAllFreebies } from '../content/freebies';
import { SITE } from '../data/site';

const STATIC_PAGES = [
  { url: `${SITE.url}/`,              lastModified: '2026-05-28' },
  { url: `${SITE.url}/writing/`,      lastModified: '2026-05-28' },
  { url: `${SITE.url}/course/`,       lastModified: '2026-05-28' },
  { url: `${SITE.url}/about/`,        lastModified: '2026-05-28' },
  { url: `${SITE.url}/work-with-me/`, lastModified: '2026-06-03' },
];

export default function sitemap() {
  const letters = getAllLetters();
  const writingUrls = letters.map((letter) => ({
    url: `${SITE.url}/writing/${letter.slug}/`,
    lastModified: letter.date,
  }));

  // Only freebies whose Kit form exists — don't invite Google to a page
  // whose subscribe flow is disabled.
  const freebieUrls = getAllFreebies()
    .filter((freebie) => freebie.kitFormId)
    .map((freebie) => ({
      url: `${SITE.url}/freebies/${freebie.slug}/`,
      lastModified: '2026-07-09',
    }));

  return [...STATIC_PAGES, ...freebieUrls, ...writingUrls];
}
