import { cache } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import JsonLd from '../../components/JsonLd';
import CoursesContent from '../../components/CoursesContent';
import { COURSES } from '../../data/courses';
import { SITE } from '../../data/site';
import { screenResetPriceAt } from '../../data/launch-schedule';
import { COURSES_METADATA } from '../../lib/screen-reset-metadata';

// /courses/ — the page behind the "Courses" nav link: what the courses are,
// who they are for, how to choose, and answers to common questions.
// Copy and links: data/courses.js. Layout: components/CoursesContent.jsx.
//
// The Screen Reset's price on this page switches BY ITSELF from $67 (with
// $99 crossed out) to $99 at the end of Mon Nov 30 2026, Central — the same
// clock as the sales page (SCREEN_RESET_SALE_ENDS in data/launch-schedule.js).
// No deploy needed: the page is regenerated on the server at most every 60
// seconds, and each regeneration re-checks the clock. Without this
// `revalidate` the price would be frozen at build time and never switch.
export const revalidate = 60;

const currentPrice = cache(() => screenResetPriceAt());

export const metadata = COURSES_METADATA;

// Structured data for search engines. Only what a visitor can read on the
// page, and no prices: the price changes by date, and a search result must
// never be left quoting the old one.
const ORGANIZATION = { '@type': 'Organization', name: SITE.name, url: SITE.url };

const COURSE_LIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: COURSES.courses.map((course, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Course',
      name: course.title,
      description: course.paragraphs[0],
      url: `${SITE.url}${course.href.split('?')[0]}`,
      provider: ORGANIZATION,
    },
  })),
};

// The answer as one plain sentence: the linked email address is put back in
// the middle, and a closing link's label is left out (it is a button, not
// part of the answer).
const answerText = (a) => (typeof a === 'string' ? a : `${a.before}${a.email}${a.after}`);

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: COURSES.faq.items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: answerText(f.a) },
  })),
};

export default function CoursesPage() {
  return (
    <div className="crs theme-terracotta">
      <JsonLd data={COURSE_LIST_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      {/* The site's usual frame, top and bottom, so the nav and footer sit
          exactly where they do on every other page. The sections between
          them run the full width of the screen. */}
      <div className="v6-page crs-frame">
        <Nav active="/courses" />
      </div>
      <CoursesContent phase={currentPrice()} />
      <div className="v6-page crs-frame">
        <Footer />
      </div>
    </div>
  );
}
