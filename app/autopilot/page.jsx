import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import JsonLd from '../../components/JsonLd';
import { SITE } from '../../data/site';
import Link from 'next/link';

export const metadata = {
  title: 'Autopilot — Build Your Household Operating System',
  description:
    'A 4-week live cohort for parents of 8–15s: build the routines and systems that transfer the mental load off you and grow real independence in your kid. Built by a 14-year middle school teacher. First cohort August 2026 — $400.',
  // Unlisted while Sean reviews: no nav link, not in sitemap, not indexable.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: 'Autopilot | Growth Mindset Parenting',
    description:
      'Stop being the whole family’s prefrontal cortex. A live 4-week program that teaches you to build the systems that run your house — so your kid can run their own life.',
  },
};

// ── LAUNCH CONFIG ─────────────────────────────────────────────
// TODO before publish (Katie): replace ENROLL_URL with the real Kajabi
// checkout link once the Autopilot offer is built. Confirm cohort start
// month / session dates. Price confirmed at $400 (matches Boys Cohort).
const ENROLL_URL = '#enroll'; // ⚠️ PLACEHOLDER — swap for Kajabi checkout URL before launch
const LAUNCH_DATE = 'August 2026';
const LAUNCH_STAMP = 'AUG 2026';
const PRICE = '$400';

const COURSE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Autopilot',
  description:
    'A 4-week live cohort that teaches parents to design a Household Operating System — the routines, scaffolds, and systems that transfer mental load from parent to child and grow executive function in kids ages 8–15.',
  provider: { '@type': 'Person', name: 'Sean Kane', url: SITE.url },
  educationalLevel: 'Parents of kids ages 8–15',
  offers: {
    '@type': 'Offer',
    price: '400',
    priceCurrency: 'USD',
    category: 'Live cohort',
  },
};

// ── THE FOUR SESSIONS ─────────────────────────────────────────
const SESSIONS = [
  {
    n: '01', title: 'Understand',
    desc: 'What executive function actually is — and why the thing you’ve been reading as attitude is really a brain still under construction.',
    objs: [
      'See executive function as a skill that develops, not a character trait',
      'Map the 8–15 window: why the emotional brain races ahead of the planning brain',
      'Name the 11 executive skills your kid is actually building right now',
    ],
  },
  {
    n: '02', title: 'Diagnose',
    desc: 'We watch one real family’s Monday morning fall completely apart — then learn to spot exactly where and why it broke.',
    objs: [
      'Find the inflection points in a chaotic morning instead of just surviving it',
      'Diagnose a lost backpack or a blow-up through an executive-function lens',
      'Know which specific skill — and which missing system — is behind the behavior',
    ],
  },
  {
    n: '03', title: 'Design',
    desc: 'Build the systems: routines, checklists, environments, and visual scaffolds that carry the mental load so your kid can finally succeed on their own.',
    objs: [
      'Design a scaffold that does the remembering, so working memory is freed up',
      'Build parent-facing systems — the weekly calendar meeting, the nightly prep',
      'Run a follow-up conversation that creates accountability without a fight',
    ],
  },
  {
    n: '04', title: 'Transfer',
    desc: 'Hand the responsibility back. Coach collaboratively, fade the scaffolds, troubleshoot what breaks, and keep the system improving every month.',
    objs: [
      'Coach with neutral, measurable observation instead of reminders and lectures',
      'Fade support so your kid owns the routine — and know when a consequence fits',
      'Turn every recurring problem into the next system, not the next argument',
    ],
  },
];

// ── THE SIX PARENT OUTCOMES (from the program objectives) ─────
const CAPABILITIES = [
  {
    n: '01',
    text: 'You’ll diagnose the real problem — see a blow-up or a lost backpack and name the exact executive-function gap and the missing system behind it, instead of taking it personally.',
  },
  {
    n: '02',
    text: 'You’ll design systems that do the remembering — checklists, routines, and setups that carry the working-memory load so your kid can actually succeed without you hovering.',
  },
  {
    n: '03',
    text: 'You’ll coach instead of nag — teach the skill inside the experience, with a follow-up conversation that builds accountability instead of resentment.',
  },
  {
    n: '04',
    text: 'You’ll hand the mental load back — transfer ownership of the morning, the homework, the stuff, one faded scaffold at a time.',
  },
  {
    n: '05',
    isCapstone: true,
    text: 'You’ll raise a kid who leans on systems before memory, recovers from setbacks, and finishes real things on their own — inside a house that gets a little better every single month.',
  },
];

const TESTIMONIALS = [
  { q: 'You are gonna almost single-handedly help heal my home. Tools I never had that you’re giving me.', src: 'From Instagram' },
  { q: 'Thank GOD I found your content. At a very low point in parenting my 11-year-old son. Gratefully out here listening to ALL your advice.', src: 'From TikTok' },
  { q: 'I love you. Where have you been my entire motherhood?', src: 'From Instagram' },
  { q: "I'm so thankful for your page and guidance. In these moments that I've in some way failed — then I see your videos and realize maybe I'm not failing, but instead in the exact place with my 11-year-old that I'm supposed to be.", src: 'From TikTok' },
  { q: 'The way you put this into words and help us to understand is your true desire to help these kids shining through.', src: 'From Instagram' },
  { q: "So grateful I found your account. I can tell you have so much knowledge and I value your insight. You are an excellent teacher.", src: 'From TikTok' },
  { q: "Wow this is good. I'm so glad I stumbled upon your page. This approach is what I'm looking for.", src: 'From Instagram' },
  { q: "The fact you came across my FYP a while ago is the universe telling me I am doing the right thing as a teacher and parent. Progress over perfection.", src: 'From TikTok' },
  { q: "Great content. I appreciate your knowledge. It's clear, real-world advice.", src: 'From Instagram' },
  { q: "I'm so grateful for your page — my son is the most incredible person and I can better understand him now. So thankful.", src: 'Cassidy' },
];

const FAQS = [
  {
    n: '01', q: 'Is this live or recorded?',
    a: "Both. Autopilot is taught live across four weekly sessions with Sean — real teaching, real Q&A, your questions answered. And every session is recorded, so if you miss a week or want to rewatch, it's yours with lifetime access. Come live, catch up later, or both.",
  },
  {
    n: '02', q: "What if I can't make every session live?",
    a: "That's fine. Every session is recorded and yours to keep. The live sessions are the best of it — you can bring your own house to a teacher in real time — but the whole thing works even if you watch on your own schedule.",
  },
  {
    n: '03', q: 'How is this different from Middle Skills?',
    a: "They do different jobs. Middle Skills helps you understand your kid — the six developmental skills of the middle years and how you teach into each one. Autopilot helps you run your house — the systems and routines that offload your mental load and grow independence. One works on the relationship; the other works on the operating system underneath it. Plenty of families do both.",
  },
  {
    n: '04', q: "We've tried checklists and chore charts. They never stick.",
    a: "Right — because a checklist isn't a system. A system is a scaffold designed to carry a specific executive-function load, paired with coaching that slowly fades the support as your kid succeeds. A chart on the fridge is a reminder. Autopilot teaches you to build the thing underneath the chart — and how to keep it improving instead of abandoning it in week two.",
  },
  {
    n: '05', q: 'My kid has ADHD. Is this for us?',
    a: "Especially. Executive function is exactly what's under construction with ADHD — planning, task initiation, working memory, emotional control. Systems and scaffolds aren't a workaround for that; they're the actual intervention. Autopilot is built for the developmental reality of ages 8–15, diagnosis or not.",
  },
  {
    n: '06', q: "My partner isn't on board — will this still work?",
    a: "Yes. One parent can build and run the system on their own. And because some of the most useful systems are parent-facing — the weekly calendar meeting, the nightly prep — you'll actually have a cleaner way to get a second parent aligned when they're ready.",
  },
  {
    n: '07', q: 'What age range is this for?',
    a: "8 to 15 — the window where the desire for autonomy races ahead of the executive skills to handle it. That gap is exactly what systems bridge. Some of it scales up and down, but the core is built for this developmental stage.",
  },
  {
    n: '08', q: "Isn't this more of an emotional problem? Don't we need therapy?",
    a: "This isn't a replacement for therapy, and if your family needs clinical support, get it. But a lot of what feels like an emotional or relational problem is actually a structural one — poor planning, missing routines, no material organization — and the resentment is downstream of that. Good systems resolve a surprising amount of relational tension by preventing the fallout in the first place.",
  },
  {
    n: '09', q: 'How much time will this take between sessions?',
    a: "You'll get short, practical homework each week — applied to your own house, not busywork. List where your family falls off the rails, run a diagnosis, design one system, then coach it. The point is that you leave each week with something you actually used, not notes you'll never open again.",
  },
  {
    n: '10', q: 'Is there a refund policy?',
    a: "Yes — 30 days, no questions, no funnels. Do the work, and if it isn't useful, write me and I'll refund you.",
  },
  {
    n: '11', q: 'Is Sean actually an expert?',
    a: "Fourteen years as a middle school teacher and administrator, a Master's in Education from Northwestern, and three kids of his own. He spent a career watching what actually builds executive function in kids — not in theory, in the room, every day. Autopilot is that, turned into something you can build at your own kitchen table.",
  },
];

export default function AutopilotPage() {
  return (
    <article className="v6-page cs-page" data-theme="terracotta">
      <JsonLd data={COURSE_SCHEMA} />

      {/* ── ENROLLMENT ANNOUNCEMENT BAR ── */}
      <div className="cs-preorder-bar">
        <div className="cs-preorder-bar-inner">
          <span className="cs-preorder-bar-dot"></span>
          <span>Enrollment open &mdash; <b>the first live Autopilot cohort begins {LAUNCH_DATE}.</b></span>
          <a href="#enroll">Save your seat &rarr;</a>
        </div>
      </div>

      <Nav active="/autopilot" />

      {/* ── 1. HERO ── */}
      <header className="cs-hero">
        <div className="cs-stamp" aria-hidden="true">
          <span className="cs-stamp-kicker">Live cohort</span>
          <span className="cs-stamp-rule"></span>
          <span className="cs-stamp-opens">begins</span>
          <span className="cs-stamp-date">{LAUNCH_STAMP}</span>
        </div>
        <div className="cs-hero-inner">
          <span className="cs-eyebrow is-center">Autopilot &middot; The Live Cohort</span>
          <h1>
            You&rsquo;re not the bad guy. You&rsquo;re the family&rsquo;s <em>prefrontal cortex.</em>
          </h1>
          <p className="cs-hero-sub">
            Autopilot is a four-week live program that teaches you to build a household operating
            system &mdash; the routines and systems that transfer the mental load off your shoulders
            and grow your kid into someone who can actually run their own life.
          </p>
          <span className="cs-hero-flag">Live 4-week cohort &mdash; begins {LAUNCH_DATE}</span>
          <p className="cs-hero-anchor">{PRICE}. Less than a month of the chaos tax you&rsquo;re already paying.</p>
          <div className="cs-hero-actions">
            <a href="#enroll" className="v6-cta v6-cta-primary">
              Save my seat <span className="v6-cta-arrow">&rarr;</span>
            </a>
            <a href="#curriculum" className="v6-cta v6-cta-ghost">See how it works</a>
          </div>
          <p className="cs-hero-note" style={{ marginTop: '24px' }}>
            4 live sessions &middot; every session recorded &middot; lifetime access &middot; 14-day guarantee
          </p>
        </div>
      </header>

      {/* ── 2. IMMERSION ── */}
      <section className="cs-immersion">
        <div className="cs-immersion-grid">
          <div className="cs-immersion-aside">
            <span className="cs-eyebrow">If this is your house</span>
            <h2>It&rsquo;s 6:50 a.m. and you&rsquo;re <em>already losing.</em></h2>
          </div>
          <div className="cs-prose">
            <p className="cs-prose-lead">
              Someone can&rsquo;t find their shoes. Someone else is on a screen instead of eating the
              breakfast nobody made. A backpack has vanished. You&rsquo;ve said the same three things
              four times each.
            </p>
            <p>
              You&rsquo;re the alarm clock, the calendar, the lost-and-found, the short-order cook,
              and the referee &mdash; all before you&rsquo;ve had your coffee. Every plan runs through
              you. Every reminder comes from you. The whole morning is balanced on your memory.
            </p>
            <p>
              So you start pushing. And the pushing turns into snapping, and the snapping turns into a
              fight nobody meant to start. By the time everyone&rsquo;s in the car, you&rsquo;re the
              villain again &mdash; and you&rsquo;re already behind for your own day.
            </p>
            <p>
              And the worst part: you&rsquo;re doing all of it, carrying all of it &mdash; and it
              <em> still</em> falls apart. Tomorrow it&rsquo;ll happen again.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. THE WHISPER ── */}
      <section className="cs-whisper cs-bleed">
        <div className="cs-whisper-inner">
          <p className="cs-whisper-q">
            You keep asking yourself:{' '}
            <b>why is it always like this? Why can&rsquo;t they do the basic things? Why is every bit of it on me?</b>
          </p>
          <span className="cs-whisper-tag">&mdash; the question you ask on the drive to work, every single morning.</span>
        </div>
      </section>

      {/* ── 4. THE REFRAME ── */}
      <section className="cs-reframe">
        <header className="cs-reframe-head">
          <h2>
            Here&rsquo;s what&rsquo;s actually happening &mdash; and it&rsquo;s <em>not a character problem.</em>
          </h2>
          <p className="cs-reframe-head-aside">
            This is the shift underneath Autopilot. Not &ldquo;be more consistent.&rdquo; A mechanism
            &mdash; the developmental reason the reminding, charting, and repeating never actually
            stick.
          </p>
        </header>
        <div className="cs-reframe-body">
          <div className="cs-reframe-step">
            <div className="cs-reframe-step-n">01</div>
            <h3>It&rsquo;s a structural problem, not a defiance problem.</h3>
            <p>
              When a kid can&rsquo;t start the task, remember the thing, or manage the feeling, we
              read it as an effort problem, a motivation problem, a respect problem. It&rsquo;s
              almost always none of those. It&rsquo;s structural &mdash; a missing or failing system
              colliding with a skill that isn&rsquo;t built yet.
            </p>
          </div>
          <div className="cs-reframe-step">
            <div className="cs-reframe-step-n">02</div>
            <h3>Their brain is still under construction.</h3>
            <p>
              Between 8 and 15, the emotional and reward systems race years ahead of the prefrontal
              cortex. Planning, organization, time management, working memory, impulse control &mdash;
              the whole executive toolkit is still being wired, and won&rsquo;t be finished until
              around 25. The wanting-independence outpaces the able-to-handle-it. That gap is real,
              and it&rsquo;s neurological, not personal.
            </p>
          </div>
          <div className="cs-reframe-step">
            <div className="cs-reframe-step-n">03</div>
            <h3>Systems bridge the gap.</h3>
            <p>
              Kids don&rsquo;t build executive function by being reminded. They build it by
              repeatedly succeeding inside well-designed systems. Every recurring problem in your
              house is pointing at a system that&rsquo;s missing or breaking &mdash; which means it&rsquo;s
              something you can design, not something you have to keep fighting.
            </p>
          </div>
        </div>
        <div className="cs-reframe-land">
          <p>
            While their brain develops, systems bridge the gap. You stop managing behavior and start
            designing the environment it happens in. That&rsquo;s the whole move.
          </p>
        </div>
        <p className="cs-reframe-bridge">
          Autopilot isn&rsquo;t about a more obedient kid. It&rsquo;s about a house that runs on
          <em> systems instead of your nervous system.</em>
        </p>
      </section>

      {/* ── 5. TRANSFORMATION ── */}
      <section className="cs-transform">
        <header className="cs-transform-head">
          <span className="cs-eyebrow">What actually changes</span>
          <h2>
            You stop being the operating system. You <em>build</em> one.
          </h2>
          <p>
            The mornings get calmer &mdash; but that&rsquo;s the surface. Underneath, the mental load
            starts moving off of you and onto systems your kid can actually run. Here&rsquo;s what
            that looks like.
          </p>
        </header>
        <div className="cs-transform-list">
          {CAPABILITIES.map((c) => (
            <div
              className={`cs-transform-item${c.isCapstone ? ' cs-transform-item-capstone' : ''}`}
              key={c.n}
            >
              <div className="cs-transform-num">{c.n}</div>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. WHO IT'S FOR ── */}
      <section className="v6-fit">
        <header className="v6-fit-head">
          <div>
            <span className="cs-eyebrow">Is this for you?</span>
            <h2>
              I&rsquo;d rather you skip this than buy the <em>wrong thing.</em>
            </h2>
          </div>
          <p className="v6-fit-head-aside">
            Autopilot is a build. It asks something of you. Here&rsquo;s who it&rsquo;s for &mdash;
            and who it isn&rsquo;t.
          </p>
        </header>
        <div className="v6-fit-grid">
          <div className="v6-fit-card v6-fit-card-yes">
            <h3>This is for you if&hellip;</h3>
            <ul>
              <li>Your kid is somewhere between 8 and 15, and your house feels reactive, behind, and balanced entirely on you</li>
              <li>You&rsquo;re tired of being the only working prefrontal cortex in the family</li>
              <li>You want to grow real independence, not just win today&rsquo;s compliance</li>
              <li>You&rsquo;re willing to look at your own systems, not only your kid&rsquo;s behavior</li>
              <li>You believe behavior is communication &mdash; it&rsquo;s telling you what&rsquo;s missing</li>
              <li>You&rsquo;d rather design something that lasts than keep fighting the same fire every morning</li>
            </ul>
          </div>
          <div className="v6-fit-card v6-fit-card-no">
            <h3>This is not for you if&hellip;</h3>
            <ul>
              <li>You&rsquo;re looking for a discipline hack to make your kid more compliant</li>
              <li>You&rsquo;re sure it&rsquo;s a character or respect problem, not a skill-and-system gap</li>
              <li>You want the chaos fixed without changing anything about how your house runs</li>
              <li>You need it solved by Friday</li>
              <li>You want someone else to install the systems for you &mdash; this teaches <em>you</em> to build them</li>
              <li>You need clinical treatment &mdash; this is parent education that complements therapy, not a replacement for it</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 7. CURRICULUM ── */}
      <section className="v6-curric cs-curric" id="curriculum">
        <header className="v6-curric-head">
          <span className="cs-eyebrow">How it works</span>
          <h2 style={{
            fontFamily: 'var(--sans)', fontWeight: 800,
            fontSize: 'clamp(38px,4.4vw,60px)', lineHeight: 1,
            letterSpacing: '-0.035em', margin: '8px 0 16px', textWrap: 'balance',
          }}>
            Four weeks. Four live sessions. One operating system.
          </h2>
          <p style={{
            fontFamily: 'var(--font-source-serif), Georgia, serif',
            fontSize: '18px', lineHeight: 1.55, color: 'var(--ink-soft)', margin: 0,
          }}>
            Each week is a live session with Sean and the group &mdash; taught, discussed, questions
            answered, and recorded for you to keep. We follow one real family, the Ottos, from a
            morning that falls apart to a house they rebuild &mdash; and every week you apply the same
            work to your own home.
          </p>
        </header>
        <div className="v6-curric-grid">
          {SESSIONS.map((s) => (
            <article className="v6-curric-mod" key={s.n}>
              <div className="v6-curric-mod-num">{s.n}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="cs-curric-objs-label">You&rsquo;ll walk away able to</span>
                <ul>
                  {s.objs.map((o) => <li key={o}>{o}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 8. ABOUT SEAN ── */}
      <section className="cs-about">
        <div className="cs-about-inner">
          <span className="cs-eyebrow">About Sean</span>
          <blockquote className="cs-about-quote">
            &ldquo;Great teachers know two things parents are never taught: environment is king, and
            behavior is communication.&rdquo;
          </blockquote>
          <div className="cs-about-body">
            <p>
              Fourteen years as a middle school teacher and administrator &mdash; watching thousands
              of kids move through this exact developmental window. Not in a book. In the room, every
              day, seeing which routines, systems, and procedures actually prevented the problems and
              which ones didn&rsquo;t.
            </p>
            <p>
              When his own kids hit the middle years, he noticed something uncomfortable: the systems
              he built without thinking at school &mdash; the ones that turned chaos into calm for
              thirty kids at once &mdash; he&rsquo;d never built at home. Autopilot is that bridge.
              It takes what teachers and psychologists know about executive function and turns it
              into something you can design at your own kitchen table.
            </p>
          </div>
          <p className="cs-about-sig">
            &mdash; Sean Kane &middot; Middle school teacher, 14 years &middot; M.Ed., Northwestern &middot; Dad of three &middot; Austin, TX
          </p>
        </div>
      </section>

      {/* ── 9. SOCIAL PROOF ── */}
      <section className="v6-testi cs-social">
        <header className="v6-testi-head">
          <span className="cs-eyebrow is-center">What parents are saying</span>
          <h2 style={{
            fontFamily: 'var(--sans)', fontWeight: 800,
            fontSize: 'clamp(36px,4vw,56px)', lineHeight: 1,
            letterSpacing: '-0.03em', margin: '8px 0 0', textWrap: 'balance',
          }}>
            Real changes, in real houses.
          </h2>
        </header>
        <div className="v6-testi-grid">
          {TESTIMONIALS.map((t) => (
            <div className="v6-testi-card" key={t.q.slice(0, 30)}>
              <blockquote className="v6-testi-q">&ldquo;{t.q}&rdquo;</blockquote>
              <div className="v6-testi-attrib">
                <span className="v6-testi-attrib-meta">{t.src}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10. COST OF STAYING ── */}
      <section className="cs-cost">
        <div className="cs-cost-grid">
          <h2>A reactive house <em>doesn&rsquo;t fix itself.</em></h2>
          <div className="cs-cost-body">
            <p>
              The mental load doesn&rsquo;t lift on its own. Nobody grows out of a missing system.
              The morning that falls apart today falls apart the same way next month &mdash; unless
              something in the structure changes.
            </p>
            <p>
              You can keep carrying all of it. A lot of parents do, for years. But &ldquo;waiting for
              the phase to pass&rdquo; isn&rsquo;t a plan, and the resentment that builds up in a house
              running on one person&rsquo;s nervous system doesn&rsquo;t always drain back out. Every
              hard morning is either a system you build or a fire you fight again tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* ── 11. VALUE + PRICE ── */}
      <section className="cs-value cs-bleed" id="enroll">
        <div className="cs-value-head">
          <span className="cs-eyebrow is-center">What you&rsquo;re getting</span>
          <h2>
            The whole system, for less than <em>a month of the chaos tax.</em>
          </h2>
          <p>
            Four live sessions with Sean, the full case-study walkthrough, every system template,
            and lifetime access to the recordings &mdash; for one price.
          </p>
        </div>
        <div className="cs-value-grid">
          <div className="cs-includes">
            <ul>
              <li>4 live weekly sessions with Sean</li>
              <li>Live Q&amp;A in every session &mdash; bring your own house</li>
              <li>Every session recorded, with lifetime access</li>
              <li>The Otto family case study &mdash; diagnose a real morning, then rebuild it</li>
              <li>System templates: checklists, the weekly calendar meeting, the nightly prep, the follow-up conversation</li>
              <li>Every future update to the program</li>
            </ul>
          </div>
          <aside className="cs-price">
            <div className="cs-price-ribbon">First cohort</div>
            <div className="cs-price-tag">Live &middot; 4 weeks</div>
            <div className="cs-price-eyebrow">Enrollment</div>
            <div className="cs-price-big">
              <span className="cs-price-num">{PRICE}</span>
            </div>
            <p className="cs-price-once">One payment &middot; lifetime access to recordings</p>
            <a href={ENROLL_URL} className="v6-cta v6-cta-primary" style={{ background: 'var(--accent)', justifyContent: 'center' }}>
              Save my seat <span className="v6-cta-arrow">&rarr;</span>
            </a>
            <ul className="cs-preorder-steps">
              <li>
                <span className="cs-preorder-steps-when">Today</span>
                Save your seat in the first live cohort and lock the founding price.
              </li>
              <li>
                <span className="cs-preorder-steps-when">{LAUNCH_DATE}</span>
                We meet live for four weeks. Every session is recorded and yours to keep.
              </li>
              <li>
                <span className="cs-preorder-steps-when">14-day guarantee</span>
                Work through the first two sessions &mdash; live or on the replay &mdash; and do
                the work. If it isn&rsquo;t useful, write me and I&rsquo;ll refund you.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {/* ── 12. GUARANTEE ── */}
      <section className="cs-guarantee">
        <div className="cs-guarantee-card">
          <div className="cs-guarantee-seal">
            <b>14</b>
            <span>Day</span>
          </div>
          <div className="cs-guarantee-text">
            <h3>Risk-free 14-day guarantee</h3>
            <p>
              Two weeks in, you&rsquo;ll have worked through the first two sessions &mdash; live or on
              the replay &mdash; and done the first round of work with your household. That&rsquo;s
              enough to know whether it&rsquo;s going to change anything.
            </p>
            <p>
              If it hasn&rsquo;t &mdash; if you&rsquo;ve done the work and your house doesn&rsquo;t
              feel different &mdash; email Sean, tell him what you tried, and he&rsquo;ll refund you
              in full.
            </p>
            <p>You bring the commitment. We&rsquo;ll take the risk.</p>
          </div>
        </div>
      </section>

      {/* ── 13. FAQ ── */}
      <section className="v6-faq">
        <div className="v6-faq-grid">
          <div>
            <span className="cs-eyebrow">FAQ</span>
            <h2 style={{
              fontFamily: 'var(--sans)', fontWeight: 800,
              fontSize: 'clamp(36px,4vw,56px)', lineHeight: 0.98,
              letterSpacing: '-0.03em', margin: '8px 0 16px', textWrap: 'balance',
            }}>
              Questions parents actually ask.
            </h2>
            <p style={{
              fontFamily: 'var(--font-source-serif), Georgia, serif',
              fontSize: '17px', lineHeight: 1.55, color: 'var(--ink-soft)',
              margin: 0, maxWidth: '36ch',
            }}>
              Don&rsquo;t see yours?{' '}
              <a href="mailto:sean@growthmindsetparenting.com" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
                Email me directly
              </a>{' '}
              &mdash; I read every one.
            </p>
          </div>
          <div className="v6-faq-list">
            {FAQS.map((f) => (
              <div className="v6-faq-item" key={f.n}>
                <h3>{f.q}<span>{f.n}</span></h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. CLOSE ── */}
      <section className="cs-close cs-bleed">
        <div className="cs-close-inner">
          <span className="cs-eyebrow is-center is-light">The last word</span>
          <h2>
            Imagine a Tuesday that just <em>works.</em>
          </h2>
          <p>
            Not perfect &mdash; nobody&rsquo;s selling you perfect. Just a house that runs on systems
            instead of your nervous system, where you&rsquo;re the calm designer and not the exhausted
            enforcer, and your kid is quietly becoming someone who can run their own life. That&rsquo;s
            what four weeks of building can start.
          </p>
          <div className="cs-close-actions">
            <a href="#enroll" className="v6-cta v6-cta-primary" style={{ background: 'var(--accent)' }}>
              I&rsquo;m ready to build it <span className="v6-cta-arrow">&rarr;</span>
            </a>
            <a href="#curriculum" className="v6-cta v6-cta-ghost">See how it works</a>
          </div>
          <span className="cs-close-note">
            Live 4-week cohort &middot; begins {LAUNCH_DATE} &middot; {PRICE} &middot; 14-day guarantee
          </span>
        </div>
      </section>

      <Footer />
    </article>
  );
}
