import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { GUARANTEE } from '../../data/guarantee';

// Covers everything Growth Mindset Parenting offers — paid courses, free
// workshops, free downloads, the newsletter and text reminders — not one
// product. The one inbox for questions, refunds and billing is hello@.
const CONTACT = 'hello@growthmindsetparenting.com';

export const metadata = {
  title: 'Terms',
  description: 'The terms for using growthmindsetparenting.com and buying from Growth Mindset Parenting.',
  robots: { index: false },
};

function Email() {
  return (
    <a href={`mailto:${CONTACT}`} style={{ color: 'var(--accent)' }}>
      {CONTACT}
    </a>
  );
}

export default function TermsPage() {
  return (
    <article className="v6-page theme-terracotta">
      <Nav />

      <header className="v6-page-head">
        <span className="v6-page-head-eyebrow">Legal</span>
        <h1 className="v6-page-head-h1">Terms</h1>
        <div className="v6-page-head-meta">
          <div><b>Last updated</b> September 2026</div>
        </div>
      </header>

      <section className="v6-about-essay">
        <div />
        <div className="v6-about-prose">

          <p>These terms apply to everything from <strong>Growth Mindset Parenting</strong>:
          this website, our paid courses and programs, free workshops, free downloads, our
          emails, and text reminders. By using the site, signing up, or buying, you agree
          to them.</p>

          <h2>Our guarantee</h2>

          <p>Paid courses come with a {GUARANTEE.days}-day guarantee. Your {GUARANTEE.days} days
          start the day you get access, not the day you pay. If you pre-ordered, that is the
          day the course opens.</p>

          <p>To qualify, work through what has been released so far and try it with your
          child. If you have done that and it isn&rsquo;t helping, email <Email /> before
          your {GUARANTEE.days} days are up, tell us what you tried, and we will refund you
          in full. If a product has its own refund terms at checkout, those apply to that
          product.</p>

          <h2>Access</h2>

          <p>Paid courses are for you and your household. Unless the checkout page says
          otherwise, you keep access for as long as the course is offered. Courses are
          delivered online and need an internet connection. We may update course content
          over time.</p>

          <p>Free workshops, downloads and emails are offered as-is, and we may change or
          end them at any time.</p>

          <h2>Payment plans</h2>

          <p>If you pay in installments, each one is charged automatically on the schedule
          shown at checkout. You are responsible for every installment, whether or not you
          finish the course. If a payment fails, access may be paused until it is paid.</p>

          <h2>Our content</h2>

          <p>Everything we create &mdash; videos, recordings, worksheets, downloads, emails
          and written materials &mdash; belongs to Growth Mindset Parenting. You may use it
          in your own home. You may not:</p>

          <ul>
            <li>Share your login with others</li>
            <li>Copy, share, or resell our materials</li>
            <li>Record or re-post our videos or live sessions</li>
            <li>Use our content to build a competing product or service</li>
          </ul>

          <h2>Emails and text messages</h2>

          <p>If you sign up, we will email you. Every email has an unsubscribe link.</p>

          <p>If you give us your mobile number, you agree to receive text reminders about
          the workshop or program you signed up for. Message frequency varies. Msg &amp;
          data rates may apply. Reply HELP for help or STOP to cancel at any time. Adding
          your number is optional and is never required to sign up or buy. We don&rsquo;t
          sell or share your number.</p>

          <h2>No guarantee of results</h2>

          <p>We share research-backed ideas and practical tools. Every family is different,
          and results depend on how you use what you learn, so we can&rsquo;t promise
          specific outcomes for you or your child.</p>

          <h2>Not professional advice</h2>

          <p>Sean Kane is a former middle school teacher, not a licensed therapist,
          psychologist, or medical professional. Everything we offer is parent education.
          It is not therapy, medical advice, or a substitute for professional care. If you
          or your child are in crisis, please contact a licensed professional or call or
          text 988.</p>

          <h2>Chargebacks</h2>

          <p>If something is wrong with a purchase, email <Email /> before contacting your
          bank &mdash; we will work it out with you. Chargebacks filed without reaching out
          first will be disputed, and access will be removed.</p>

          <h2>Governing law</h2>

          <p>These terms are governed by the laws of the State of Texas. Any disputes will
          be resolved in Travis County, Texas.</p>

          <h2>Changes to these terms</h2>

          <p>We may update these terms from time to time. The current version is always at
          growthmindsetparenting.com/terms.</p>

          <h2>Contact</h2>

          <p>Questions, refunds or billing: <Email />.</p>

        </div>
        <div />
      </section>

      <Footer />
    </article>
  );
}
