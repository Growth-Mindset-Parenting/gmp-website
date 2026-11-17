import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { COURSES } from '../../data/courses';
import { COURSES_METADATA } from '../../lib/screen-reset-metadata';

// /courses/ — the hub behind the "Courses" nav link: one card per course.
// Copy and links: data/courses.js. Styles: styles/courses.css (crs-).
export const metadata = COURSES_METADATA;

export default function CoursesPage() {
  return (
    <article className="v6-page theme-terracotta">
      <Nav active="/courses" />

      <header className="v6-page-head crs-head">
        <h1 className="v6-page-head-h1">{COURSES.headline}</h1>
      </header>

      <section className="crs-cards">
        {COURSES.cards.map((c) => (
          <div key={c.title} className={`crs-card crs-card--${c.tone}`}>
            <h2 className="crs-card-title">{c.title}</h2>
            <p className="crs-card-text">{c.body}</p>
            {/* A plain <a>, not next/link: these land on pages with their own
                layout, and a full page load lets the link tags be saved. */}
            <a href={c.href} className="gmp-btn gmp-btn-primary crs-card-cta">
              {c.cta} <span aria-hidden="true">→</span>
            </a>
          </div>
        ))}
      </section>

      <Footer />
    </article>
  );
}
