import { cache } from 'react';
import JsonLd from '../../components/JsonLd';
import ScreenResetSales from '../../components/ScreenResetSales';
import { SCREEN_RESET } from '../../data/screen-reset-sales';
import { SITE } from '../../data/site';
import { screenResetPriceAt } from '../../data/launch-schedule';
import { SCREEN_RESET_METADATA } from '../../lib/screen-reset-metadata';

// /screen-reset/ — The Screen Reset sales page. It switches BY ITSELF from
// the $67 launch version to the $99 version at the end of Mon Nov 30 2026,
// Central (SCREEN_RESET_SALE_ENDS in data/launch-schedule.js). No deploy
// needed: the page is regenerated on the server at most every 60 seconds
// (ISR), and each regeneration re-checks the clock. Without this
// `revalidate` the page would be frozen at build time and never switch.
//
// Standalone: no site Nav/Footer. Copy, prices and checkout links live in
// data/screen-reset-sales.js; metadata in lib/screen-reset-metadata.js.
export const revalidate = 60;

// Read the clock once per render, so the price, the buy links and the copy
// always agree.
const currentPrice = cache(() => screenResetPriceAt());

export const metadata = SCREEN_RESET_METADATA;

// Structured data for search engines, the same shape as on /courses/. Only
// what a visitor can read on the page, and no price: the price changes by
// date, and a search result must never be left quoting the old one.
// Sean is the `author`: on schema.org, `instructor` belongs to a scheduled
// class (CourseInstance), not to a watch-any-time Course.
const COURSE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: SCREEN_RESET.intro.name,
  description: SCREEN_RESET.hero.subtitle,
  url: `${SITE.url}/screen-reset/`,
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  author: {
    '@type': 'Person',
    name: SITE.author.name,
    url: `${SITE.url}/about/`,
    sameAs: [SITE.author.tiktok, SITE.author.instagram],
  },
};

export default function ScreenResetPage() {
  return (
    <>
      <JsonLd data={COURSE_SCHEMA} />
      <ScreenResetSales phase={currentPrice()} />
    </>
  );
}
