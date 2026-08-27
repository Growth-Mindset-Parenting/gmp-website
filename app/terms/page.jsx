import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { GUARANTEE } from '../../data/guarantee';

export const metadata = {
  title: 'Terms of Purchase — Middle Skills',
  description: 'Terms governing your purchase of Middle Skills by Sean Kane.',
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <article className="v6-page theme-terracotta">
      <Nav />

      <header className="v6-page-head">
        <span className="v6-page-head-eyebrow">Legal</span>
        <h1 className="v6-page-head-h1">Terms of Purchase</h1>
        <div className="v6-page-head-meta">
          <div><b>Last updated</b> June 2026</div>
        </div>
      </header>

      <section className="v6-about-essay">
        <div />
        <div className="v6-about-prose">

          <p>These terms govern your purchase of <strong>Middle Skills</strong>, an online parent
          education course created by Sean Kane / Growth Mindset Parenting. By completing your
          purchase you agree to them.</p>

          <h2>Our guarantee</h2>

          <p>{GUARANTEE.heading}. Your {GUARANTEE.days} days begin on the day you receive
          access to the course. If you pre-ordered, that is the day the course opens &mdash;
          not the day you paid.</p>

          <p>To qualify, work through the first two modules and apply the material with your
          child. If you have done that and you do not feel more confident about the middle
          school years, email{' '}
          <a href={`mailto:${GUARANTEE.email}`} style={{ color: 'var(--accent)' }}>
            {GUARANTEE.email}
          </a>{' '}before your {GUARANTEE.days} days are up, tell us what you tried, and we
          will refund your purchase in full.</p>

          <h2>Course access</h2>

          <p>Your purchase gives you lifetime access to the course for personal, household use.
          Access is delivered through Kajabi and requires an internet connection. Sean reserves
          the right to update course content over time — if a major revision changes the core
          material, existing students get access to the updated version at no extra charge.</p>

          <h2>Intellectual property</h2>

          <p>All course content — videos, audio, PDFs, worksheets, and written materials — is
          owned by Sean Kane / Growth Mindset Parenting. Your purchase is a personal,
          non-transferable license to use the materials for your own household. You may
          not:</p>

          <ul>
            <li>Share your login credentials with others</li>
            <li>Reproduce, distribute, or resell any course materials</li>
            <li>Use the content to build competing products, courses, or services</li>
            <li>Record or re-publish course videos in any format</li>
          </ul>

          <h2>Payment plans</h2>

          <p>If you purchase via a payment plan, installments are charged automatically on
          the schedule shown at checkout. You are responsible for all installments regardless
          of whether you complete the course. If a payment fails, access may be paused until
          the outstanding balance is resolved.</p>

          <h2>No guarantee of results</h2>

          <p>Middle Skills gives you research-backed frameworks and practical skills. What you
          do with them is up to you, and every family is different. Sean cannot guarantee
          specific outcomes for you or your child — results depend on how you apply what
          you learn.</p>

          <h2>Professional disclaimer</h2>

          <p>Sean Kane is a former middle school educator, not a licensed therapist,
          psychologist, or medical professional. Middle Skills is parent education &mdash; it is
          not therapy, clinical treatment, or medical advice, and is not a substitute for
          professional mental health care. If you or your child are experiencing a mental
          health crisis, please seek support from a licensed professional.</p>

          <h2>Chargebacks</h2>

          <p>If you have a concern about your purchase, please email{' '}
          <a href="mailto:sean@growthmindsetparenting.com" style={{ color: 'var(--accent)' }}>
            sean@growthmindsetparenting.com
          </a>{' '}before contacting your bank. Chargebacks filed without first reaching out
          will be disputed and course access will be revoked.</p>

          <h2>Governing law</h2>

          <p>These terms are governed by the laws of the State of Texas. Any disputes will be
          resolved in Travis County, Texas.</p>

          <h2>Updates to these terms</h2>

          <p>These terms may be updated from time to time. The current version is always
          at growthmindsetparenting.com/terms.</p>

          <h2>Contact</h2>

          <p>Questions? Email{' '}
          <a href="mailto:sean@growthmindsetparenting.com" style={{ color: 'var(--accent)' }}>
            sean@growthmindsetparenting.com
          </a>.</p>

        </div>
        <div />
      </section>

      <Footer />
    </article>
  );
}
