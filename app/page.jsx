import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ticker from '../components/Ticker';
import SubscribeForm from '../components/SubscribeForm';
import JsonLd from '../components/JsonLd';
import SixSkillsSection from '../components/SixSkillsSection';
import FieldGuideHeroCta from '../components/FieldGuideHeroCta';
import FieldGuideCardOne from '../components/FieldGuideCardOne';
import ChaosSection from '../components/ChaosSection';
import FieldGuideSection from '../components/FieldGuideSection';
import { SITE } from '../data/site';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Growth Mindset Parenting | Sean Kane',
  description:
    'Six skills for the middle years. Plainspoken parenting from a 14-year teacher and dad of three.',
  openGraph: {
    title: 'Growth Mindset Parenting',
    description: 'Six skills for the middle years. Plainspoken parenting from a 14-year teacher.',
    images: [{ url: '/images/sean-hero.jpg' }],
  },
  alternates: { canonical: '/' },
};

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sean Kane',
  url: SITE.url,
  jobTitle: 'Parenting educator and former middle school teacher',
  description: 'Fourteen-year middle school teacher applying classroom skills to home parenting. Father of three sons.',
  sameAs: [SITE.author.tiktok, SITE.author.instagram],
  knowsAbout: ['adolescent development', 'growth mindset', 'middle school parenting', 'emotional regulation', 'positive discipline'],
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Growth Mindset Parenting',
  url: SITE.url,
  description: SITE.description,
  author: { '@type': 'Person', name: 'Sean Kane' },
  potentialAction: {
    '@type': 'ReadAction',
    target: [`${SITE.url}/writing/`],
  },
};

export default function HomePage() {
  return (
    <main className="v6-root v7-root">
      <JsonLd data={PERSON_SCHEMA} />
      <JsonLd data={WEBSITE_SCHEMA} />

      <Nav />

      {/* HERO */}
      <section className="v6-hero" aria-label="Introduction">
        <div className="v6-hero-text">
          <div className="v6-hero-eyebrow">
            <span className="v6-dot" aria-hidden="true" />
            For the middle years &mdash; <span style={{ color: 'var(--accent)', fontWeight: 700 }}>ages 9 to 15.</span>
          </div>
          <h1 className="v6-hero-h1 v7-hero-h1-narrative">
            <span className="v7-hero-lead">
              Your middle schooler melts down over homework, goes quiet at dinner, and
              meets every request with a complaint.
            </span>{' '}
            It&apos;s not a character flaw, yet. It&apos;s a set of skills they
            haven&apos;t built &mdash; and <em>these are the years you have to teach
            them.</em>
          </h1>
          <p className="v6-hero-sub">
            I&apos;m Sean. I spent 14 years in middle school classrooms, and I&apos;m raising three sons of my own. The kids who thrive at this age aren&apos;t better behaved; they&apos;ve been taught real skills, like regulation, relationship, and resilience. And you are the teacher.
          </p>
          <div className="v6-hero-actions v7-hero-actions">
            <FieldGuideHeroCta />
            <a
              href="https://www.instagram.com/reel/DWFiLYZE_K3/"
              className="v7-trust v7-hero-watch"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch the 90-second intro <span className="v6-cta-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="v7-hero-photo-wrap">
          <span className="v7-hero-block" aria-hidden="true" />
          <figure className="v6-hero-photo">
            <Image
              src="/images/sean-hero.jpg"
              alt="Sean Kane — teacher and father of three"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
              style={{ objectFit: 'cover' }}
            />
            <div className="v6-hero-cap" aria-hidden="true">
              <span>Sean Kane</span>
              <span>Austin, TX</span>
            </div>
          </figure>
        </div>
      </section>

      <Ticker />

      {/* MISSION */}
      <section className="v6-mission" aria-label="What I'm here to do">
        <div className="v6-mission-inner">
          <div className="v6-mission-eyebrow">
            <span className="v6-dot" aria-hidden="true" />
            What I&rsquo;m here to do
          </div>
          <h2 className="v6-mission-h">
            I help responsive, thoughtful parents of middle school kids shift <em>from reactive to proactive</em> by giving parents the tools to see their kid clearly and to develop the six skills that make a kid <em className="is-soft">emotionally intelligent, independent and connected.</em>
          </h2>
          <div className="v6-mission-body">
            <p>
              If you want to see your kid thrive instead of survive, communicate instead of
              collapse and form before they fold, then they will need a parent who can meet
              them where they are with the skills they need to be their best. You don&rsquo;t
              have the manual. I have the science backed, classroom and kitchen tested skills
              that help you transform your flailing middle schooler into an emotionally
              intelligent, capable, and connected kid you&rsquo;re proud to call your own.
            </p>
          </div>
          <a href="#skills" className="v6-mission-cta">
            See where to start
            <span className="v6-mission-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>

      <ChaosSection />

      {/* SIX MIDDLE SKILLS — outcome-first */}
      <SixSkillsSection />

      {/* FREE FIELD GUIDE */}
      <FieldGuideSection />

      {/* FOUNDER */}
      <section className="v7-founder" aria-label="A note from Sean">
        <div className="v7-founder-grid">
          <figure className="v7-founder-photo">
            <Image
              src="/images/sean-quote.jpg"
              alt="Sean Kane"
              width={400}
              height={500}
              style={{ width: '100%', height: 'auto' }}
            />
          </figure>
          <div className="v7-founder-body">
            <span className="v7-eyebrow">A note from Sean</span>
            <p>
              &ldquo;Fourteen years in middle school classrooms taught me one thing above all:{' '}
              <em>this age isn&apos;t a problem to manage, it&apos;s a window to spend on
              purpose.</em> People always said working with middle schoolers sounded rough
              &mdash; I never got it. I love this age. Now I get to do the work with three of
              my own.&rdquo;
            </p>
            <div className="v7-founder-attrib">
              <span className="v7-founder-name">Sean Kane</span>
              <span className="v7-founder-meta">Fourteen years in middle school &middot; Dad of three</span>
            </div>
          </div>
        </div>
      </section>

      {/* CHANNELS — 2 cards */}
      <section className="v6-shows" aria-label="More ways into the work">
        <div className="v6-work-head" style={{ marginBottom: 32 }}>
          <span className="v6-work-eyebrow">Find Sean</span>
          <h2>More ways into the work</h2>
          <p style={{ fontFamily: 'var(--serif-text)', fontSize: 17, color: 'var(--ink-soft)', marginTop: 8 }}>
            Two minutes or twenty &mdash; same teacher, same skills.
          </p>
        </div>
        <div className="v6-shows-grid">
          <a href={SITE.author.instagram} className="v6-show v6-show-yt" target="_blank" rel="noopener noreferrer">
            <span className="v6-show-tag">VIDEOS</span>
            <h3>Three-minute practices</h3>
            <p>Short clips on what middle schoolers are doing and what to do about it. One move per video, three minutes or less, watch while the kettle boils.</p>
            <div className="v6-card-cta">Watch <span className="v6-card-arrow" aria-hidden="true">&rarr;</span></div>
          </a>
          <Link href="/writing" className="v6-show v6-show-essay">
            <span className="v6-show-tag">BLOG</span>
            <h3>The long read</h3>
            <p>Back issues of the newsletter and longer essays on the six Middle Skills, the developmental window, and teaching at home &mdash; for the parent who wants to think this through on a Sunday morning.</p>
            <div className="v6-card-cta">Read <span className="v6-card-arrow" aria-hidden="true">&rarr;</span></div>
          </Link>
          <a href="#subscribe" className="v6-show v6-show-podcast">
            <span className="v6-show-tag">PARENTING PODCAST &middot; COMING SOON</span>
            <h3>The Podcast</h3>
            <p>Honest, classroom-tested conversations on raising kids in the middle years. Subscribe to be the first to know when it launches.</p>
            <div className="v6-card-cta">Get notified <span className="v6-card-arrow" aria-hidden="true">&rarr;</span></div>
          </a>
        </div>
      </section>

      {/* SUBSCRIBE CTA */}
      <section className="v6-sub" id="subscribe" aria-label="Subscribe to the newsletter">
        <div className="v6-sub-card">
          <div className="v6-sub-text">
            <span className="v6-work-eyebrow">THE NEWSLETTER</span>
            <h2>One letter, every Saturday.</h2>
            <p>The developmental science your kid&rsquo;s teachers know &mdash; explained in plain language for parents doing this without a manual.</p>
          </div>
          <SubscribeForm
            inputPlaceholder="sean@growthmindsetparenting.com"
            buttonLabel="Subscribe →"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
