import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import JsonLd from '../../components/JsonLd';
import { SITE } from '../../data/site';
import Link from 'next/link';

export const metadata = {
  title: 'Middle Skills — The Course',
  description:
    'The parenting curriculum for the years the old playbook stops working — built by a 14-year middle school teacher. Six modules, 18 lessons. Pre-order founding price: $499.',
  openGraph: {
    title: 'Middle Skills | Growth Mindset Parenting',
    description: 'Six skills for the middle years. A self-paced course built by a teacher who spent 14 years in the room.',
    images: [{ url: '/images/sean-wide.jpg' }],
  },
  alternates: { canonical: '/course/' },
};

const COURSE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Middle Skills',
  description:
    'A self-paced parenting course on the six skills middle schoolers are building — and how parents teach into each one.',
  provider: { '@type': 'Person', name: 'Sean Kane', url: SITE.url },
  educationalLevel: 'Parents of middle schoolers (ages 9–15)',
  offers: {
    '@type': 'Offer',
    price: '499',
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder',
  },
};

const MODULES = [
  {
    n: '01', title: 'Emotional Literacy',
    desc: 'Why "calm down" backfires — and how a kid learns to name a feeling instead of becoming it.',
    objs: [
      'Name a feeling out loud instead of acting it out',
      'Catch a feeling as it rises and know what set it off',
      'Feel something strongly and still choose how they respond',
    ],
  },
  {
    n: '02', title: 'Autonomy',
    desc: 'The gradual handoff of ownership — so responsibility gets taught, not just assumed.',
    objs: [
      'Start a task on their own and carry it through to done',
      'Own a mistake and handle what comes next, instead of hiding it',
      'Set a goal that matters to them and take real steps toward it',
    ],
  },
  {
    n: '03', title: 'Resilience',
    desc: 'How to let them struggle and recover — instead of rescuing the lesson away.',
    objs: [
      'Stay with something hard long enough to work through it',
      'Recover after a failure or disappointment and try again',
      'Hear feedback as help aimed at growth, not as an attack',
    ],
  },
  {
    n: '04', title: 'Reflection',
    desc: 'Turning a hard day into self-knowledge instead of shame — scaffolding the thinking they can\'t yet do alone.',
    objs: [
      'See their own part in how something went, honestly',
      'Learn from an experience and change what they do next time',
      'Build a steadier sense of who they are and what matters',
    ],
  },
  {
    n: '05', title: 'Adaptation',
    desc: 'The middle years never stop changing — new schools, new groups, plans that fall apart. This is how they bend without breaking.',
    objs: [
      'Adjust when a plan falls apart or the rules change',
      'Find their footing somewhere new without losing who they are',
      'Try a different approach when the first one isn\'t working',
    ],
  },
  {
    n: '06', title: 'Relationship',
    desc: 'Repair, honesty, and perspective — the skill underneath staying close while your kid pulls away.',
    objs: [
      'Come back after a conflict, own their part, and reconnect',
      'Say something hard to someone they love and stay in the conversation',
      'Sense what someone else is feeling and let it shape how they act',
    ],
  },
];

const TESTIMONIALS = [
  { q: 'You are gonna almost single-handedly help heal my home. Tools I never had that you\'re giving me.', src: 'From Instagram' },
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
    n: '01', q: 'My kid is 14 — is it too late?',
    a: "There are more dinners, more car rides, more \"can we talk?\" moments ahead of you than behind you. The window you think has closed is still open. You just need to know how to reach through it.",
  },
  {
    n: '02', q: 'Is this self-paced, or do I need to keep up with a group?',
    a: "Self-paced. The lessons are yours on your own schedule, with lifetime access — take them in a nap window or after bedtime, watch or listen. There's also a monthly live office hour with Sean if you want to bring a real situation to a teacher: come to all of them, none of them, or whichever ones fit your month.",
  },
  {
    n: '03', q: "We've tried therapy. How is this different?",
    a: "This is not a replacement for therapy. Therapy works on your kid. This works on you — specifically on how you show up in the moments that count. They're not in competition. Many families benefit from both.",
  },
  {
    n: '04', q: 'How is this different from your free content?',
    a: "The free posts are one idea at a time. Middle Skills is the whole thing, in order — six modules, 18 lessons, the worksheets and scripts, and the audio version of every lesson. The free content is the front door. The course is the house.",
  },
  {
    n: '05', q: "I don't have the time to watch a course.",
    a: "We know. Each module is broken into 3 lessons that you can complete in a week. Around 90 minutes per module, 30 minutes per lesson. Every lesson comes with video and podcast-style audio for the car or the gym. And for every robust written resource, there are key points, frameworks and summary documents to reference. The course is designed so you can use the pieces you need, when you need, as you go.",
  },
  {
    n: '06', q: "My partner isn't on board — will this still work?",
    a: "Yes. It's designed so one parent can run the framework even if the other isn't doing it. The moves that work don't require a unified front — they require one parent who understands what they're looking at.",
  },
  {
    n: '07', q: "My kid doesn't have ADHD or any diagnosis — is this still for us?",
    a: "Yes. Middle Skills is built for the developmental reality of ages 9–15, not for any specific diagnosis. If your kid is in the middle years and something has shifted, this is for you.",
  },
  {
    n: '08', q: 'What age range is this for?',
    a: "9 to 15 — the middle years. Some content scales slightly above and below, but the core curriculum is built for this specific developmental window. And what you learn here doesn't expire when they turn 16: the way you communicate, repair, and show up will serve your relationship with your child for the rest of your lives.",
  },
  {
    n: '09', q: 'Is there a refund policy?',
    a: "Yes — 30 days, no questions, no funnels. Complete the first module, and if it isn't useful, write me and I'll send your money back the same day.",
  },
  {
    n: '10', q: 'Can my school or parent group buy it together?',
    a: null,
    aJsx: true,
  },
  {
    n: '11', q: 'Is Sean actually an expert?',
    a: "Fourteen years as a middle school teacher and administrator with a Masters in Education from Northwestern University. He's got 3 kids. He's taken over 2 years to properly position this course between real research and real experience. This isn't just opinion and theory; it's practical and actionable.",
  },
];

const LAUNCH_DATE = 'Fall 2026';
const PRICE_FOUNDING = '$499';
const PRICE_LAUNCH = '$599';
const PRICE_SPLIT = '2 × $269';
const CHECKOUT_ONCE = 'https://courses.growthmindsetparenting.com/offers/BFeFvsHP';
const CHECKOUT_PLAN = 'https://courses.growthmindsetparenting.com/offers/QYzJYerk';

export default function CoursePage() {
  return (
    <article className="v6-page cs-page" data-theme="terracotta">
      <JsonLd data={COURSE_SCHEMA} />

      {/* ── PRE-ORDER ANNOUNCEMENT BAR ── */}
      <div className="cs-preorder-bar">
        <div className="cs-preorder-bar-inner">
          <span className="cs-preorder-bar-dot"></span>
          <span>Pre-order now &mdash; <b>Middle Skills opens {LAUNCH_DATE}</b>, at the founding price.</span>
          <a href="#enroll">Reserve your seat &rarr;</a>
        </div>
      </div>

      <Nav active="/course" />

      {/* ── 1. HERO ── */}
      <header className="cs-hero">
        <div className="cs-stamp" aria-hidden="true">
          <span className="cs-stamp-kicker">Pre-order</span>
          <span className="cs-stamp-rule"></span>
          <span className="cs-stamp-opens">opens</span>
          <span className="cs-stamp-date">OCT 2026</span>
        </div>
        <div className="cs-hero-inner">
          <span className="cs-eyebrow is-center">Middle Skills &middot; The Course</span>
          <h1>
            You&rsquo;re not losing your kid. You just need a <em>new map.</em>
          </h1>
          <p className="cs-hero-sub">
            Middle Skills is the parenting curriculum for the years the old playbook stops
            working &mdash; built by a teacher who spent fourteen years in the room where it
            happens.
          </p>
          <span className="cs-hero-flag">Founding pre-order &mdash; opens {LAUNCH_DATE}</span>
          <p className="cs-hero-anchor">{PRICE_FOUNDING}. Less than two therapy sessions.</p>
          <div className="cs-hero-actions">
            <a href="#enroll" className="v6-cta v6-cta-primary">
              Pre-order Middle Skills <span className="v6-cta-arrow">&rarr;</span>
            </a>
            <a href="#curriculum" className="v6-cta v6-cta-ghost">See what&rsquo;s inside</a>
          </div>
          <p className="cs-hero-note" style={{ marginTop: '24px' }}>
            Self-paced &middot; lifetime access &middot; 30-day guarantee &middot; founding price locked for life
          </p>
        </div>
      </header>

      {/* ── 2. IMMERSION ── */}
      <section className="cs-immersion">
        <div className="cs-immersion-grid">
          <div className="cs-immersion-aside">
            <span className="cs-eyebrow">If this is your house</span>
            <h2>You used to be able to <em>reach them.</em></h2>
          </div>
          <div className="cs-prose">
            <p className="cs-prose-lead">
              Your kid was easy to reach a year ago. Not perfect &mdash; but you could get through.
              You knew what to say when things got hard.
            </p>
            <p>
              Now you say the right thing and they look at you like you&rsquo;re speaking a different
              language. You try to connect and they disappear &mdash; into a door, a screen, a shrug.
            </p>
            <p>
              You ask a simple question &mdash; <em>how was your day?</em> &mdash; and somehow it
              turns into a fight you didn&rsquo;t start and can&rsquo;t explain.
            </p>
            <p>
              You&rsquo;re still doing the things that used to work. They&rsquo;re not working. And
              the harder you push, the further they go.
            </p>
            <p>And the worst part &mdash; you keep asking yourself: what am I doing wrong?</p>
          </div>
        </div>
      </section>

      {/* ── 3. THE WHISPER ── */}
      <section className="cs-whisper cs-bleed">
        <div className="cs-whisper-inner">
          <p className="cs-whisper-q">
            You keep asking yourself:{' '}
            <b>am I the problem? Is something wrong with my kid? Why can&rsquo;t I get through to them anymore?</b>
          </p>
          <span className="cs-whisper-tag">&mdash; the question that keeps you up at 2 a.m.</span>
        </div>
      </section>

      {/* ── 4. THE REFRAME ── */}
      <section className="cs-reframe">
        <header className="cs-reframe-head">
          <h2>
            Here&rsquo;s what&rsquo;s actually happening &mdash; and it&rsquo;s <em>not your fault.</em>
          </h2>
          <p className="cs-reframe-head-aside">
            This is the move that separates Growth Mindset Parenting from every &ldquo;be more
            patient&rdquo; approach. Not a vibe. A mechanism &mdash; the developmental reason your
            old tools stopped working.
          </p>
        </header>
        <div className="cs-reframe-body">
          <div className="cs-reframe-step">
            <div className="cs-reframe-step-n">01</div>
            <h3>It&rsquo;s a renovation, not a malfunction.</h3>
            <p>
              The early adolescent brain isn&rsquo;t breaking down. It&rsquo;s being rebuilt.
              Between 9 and 15, neural pathways prune and rewire on a scale matched by few other
              periods of life. Impulse control, empathy, long-term thinking, social skills are all
              under construction. Not metaphorically, neurologically.
            </p>
          </div>
          <div className="cs-reframe-step">
            <div className="cs-reframe-step-n">02</div>
            <h3>You see what they&rsquo;re actually working on.</h3>
            <p>
              What looks like defiance is often autonomy taking shape. What looks like withdrawal is
              resilience being tested. What looks like overreaction is an emotional system still being
              built. Your kid isn&rsquo;t broken or behind. They&rsquo;re doing the developmental
              work this stage requires.
            </p>
          </div>
          <div className="cs-reframe-step">
            <div className="cs-reframe-step-n">03</div>
            <h3>You teach what the stage requires.</h3>
            <p>
              With the architecture in view and your kid&rsquo;s work in focus, you can stop fighting
              the wrong battle and start teaching the skills the moment is built for. This is the
              leverage. The brain is open. You&rsquo;re the trusted presence inside it.
            </p>
          </div>
        </div>
        <div className="cs-reframe-land">
          <p>
            Once the architecture is in view, the rest becomes learnable.
            That&rsquo;s what the Course is built to teach.
          </p>
        </div>
        <p className="cs-reframe-bridge">
          This isn&rsquo;t a course you take to fix your kid. It&rsquo;s a course that changes{' '}
          <em>how you show up.</em>
        </p>
      </section>

      {/* ── 5. TRANSFORMATION ── */}
      <section className="cs-transform">
        <header className="cs-transform-head">
          <span className="cs-eyebrow">What actually changes</span>
          <h2>
            It isn&rsquo;t about fixing your kid. It&rsquo;s a course that changes how you show up.
          </h2>
          <p>
            The behavior improves &mdash; but that&rsquo;s just the surface. The real change runs
            deeper, and it goes both ways: you stop second-guessing yourself, and your kid starts
            growing into someone steadier. Here&rsquo;s what that looks like.
          </p>
        </header>
        <div className="cs-transform-list">
          <div className="cs-transform-item">
            <div className="cs-transform-num">01</div>
            <p>
              You&rsquo;ll know what to say when your kid shuts down at the dinner table &mdash;{' '}
              <b>not a script, but the mechanism that opens the door instead of forcing it.</b>
            </p>
          </div>
          <div className="cs-transform-item">
            <div className="cs-transform-num">02</div>
            <p>
              You&rsquo;ll stay with your kid through the missed assignment, the bad practice, the
              friend who went cold &mdash; <b>without taking it over</b> &mdash; and they will build
              the muscle to recover on their own.
            </p>
          </div>
          <div className="cs-transform-item">
            <div className="cs-transform-num">03</div>
            <p>
              You&rsquo;ll hand off the morning routine, the schoolwork, the chores &mdash;{' '}
              <b>without the power struggle</b> &mdash; and watch your kid grow into ownership
              instead of waiting to be told.
            </p>
          </div>
          <div className="cs-transform-item">
            <div className="cs-transform-num">04</div>
            <p>
              You&rsquo;ll walk through the hard moments together &mdash; talking about what
              happened, what was felt, and what they&rsquo;d do differently &mdash; so the challenge
              becomes <b>instructive instead of destructive.</b>
            </p>
          </div>
          <div className="cs-transform-item cs-transform-item-capstone">
            <div className="cs-transform-num">05</div>
            <p>
              You&rsquo;ll raise a kid who can <b>communicate, feel, struggle, recover, own their
              choices, and stay in real relationship with you</b> &mdash; long after the hard years
              are behind you both.
            </p>
          </div>
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
            Here&rsquo;s the honest version of who Middle Skills is built for &mdash; and who it
            isn&rsquo;t.
          </p>
        </header>
        <div className="v6-fit-grid">
          <div className="v6-fit-card v6-fit-card-yes">
            <h3>This is for you if&hellip;</h3>
            <ul>
              <li>Your kid is somewhere between 9 and 15, and you feel like you&rsquo;ve lost your ability to get through to them</li>
              <li>They&rsquo;re not a &ldquo;problem kid&rdquo; &mdash; they&rsquo;ve just become someone you don&rsquo;t fully recognize</li>
              <li>You want to understand and communicate about what&rsquo;s happening in their inner life, not just manage the behavior</li>
              <li>You want to teach your kid the skills this stage demands &mdash; resilience, responsibility, autonomy &mdash; so they bring them to adult life</li>
              <li>You&rsquo;re willing to change how you show up, not only how they act</li>
              <li>You&rsquo;re tired of waiting for &ldquo;the phase&rdquo; to pass on its own</li>
              <li>You&rsquo;d rather learn the why than memorize a one-size-fits-all script</li>
            </ul>
          </div>
          <div className="v6-fit-card v6-fit-card-no">
            <h3>This is not for you if&hellip;</h3>
            <ul>
              <li>You believe your kid&rsquo;s behavior is a character problem, not a skill gap</li>
              <li>You&rsquo;re looking for a way to make your kid more compliant</li>
              <li>You want behavior-modification tricks without understanding the development underneath</li>
              <li>You see the middle years as a phase to survive rather than a window to work with</li>
              <li>You&rsquo;re not ready to look at your own patterns alongside your kid&rsquo;s</li>
              <li>You need a fix by Friday</li>
              <li>You need clinical treatment &mdash; this is parent education that complements therapy, not a replacement for it</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 7. CURRICULUM ── */}
      <section className="v6-curric cs-curric" id="curriculum">
        <header className="v6-curric-head">
          <span className="cs-eyebrow">What&rsquo;s inside</span>
          <h2 style={{
            fontFamily: 'var(--sans)', fontWeight: 800,
            fontSize: 'clamp(38px,4.4vw,60px)', lineHeight: 1,
            letterSpacing: '-0.035em', margin: '8px 0 16px', textWrap: 'balance',
          }}>
            Six modules. Eighteen lessons. One whole curriculum.
          </h2>
          <p style={{
            fontFamily: 'var(--font-source-serif), Georgia, serif',
            fontSize: '18px', lineHeight: 1.55, color: 'var(--ink-soft)', margin: 0,
          }}>
            Each module is roughly 90 minutes of video, or audio format, across three lessons.
            Plus resources and reference materials you&rsquo;ll actually use. Every one is built
            around concrete behaviors for parents and kids, not vague ideas.
          </p>
        </header>
        <div className="v6-curric-grid">
          {MODULES.map((m) => (
            <article className="v6-curric-mod" key={m.n}>
              <div className="v6-curric-mod-num">{m.n}</div>
              <div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <span className="cs-curric-objs-label">Your kid will be able to</span>
                <ul>
                  {m.objs.map((o) => <li key={o}>{o}</li>)}
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
            &ldquo;My wife used to say I had an unfair advantage. I didn&rsquo;t. I had thousands of
            hours of practice with other people&rsquo;s kids.&rdquo;
          </blockquote>
          <div className="cs-about-body">
            <p>
              Fourteen years as a middle school teacher &mdash; watching thousands of kids move
              through this exact developmental window. Not in a book. In the room, every day, seeing
              what worked and what didn&rsquo;t and why.
            </p>
            <p>
              When his own sons hit the middle years, he noticed something uncomfortable: he was a
              better teacher than he was a dad. The skills he used all day with other people&rsquo;s
              kids &mdash; the ones that reached even the toughest students &mdash; weren&rsquo;t
              always working at home. So he&rsquo;s building the bridge between the spaces.
              Connecting what teachers and psychologists know to what parents do. Using his passion
              to teach people and help kids to facilitate progressive change for families.
            </p>
          </div>
          <p className="cs-about-sig">
            &mdash; Sean Kane &middot; Middle school teacher, 14 years &middot; Dad of three &middot; Austin, TX
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
          <h2>Nothing about the middle years <em>fixes itself.</em></h2>
          <div className="cs-cost-body">
            <p>
              The developmental window is real &mdash; and how you navigate the next three or four
              years shapes how your kid walks out of adolescence. That&rsquo;s not meant to scare
              you. It&rsquo;s meant to be honest:{' '}
              <em>showing up differently now matters.</em>
            </p>
            <p>
              You can wait it out. A lot of parents do. But &ldquo;the phase&rdquo; isn&rsquo;t a
              strategy, and the distance that opens up in these years doesn&rsquo;t always close on
              its own. Every hard moment is either a wall you build or a door you learn to open.
            </p>
          </div>
        </div>
      </section>

      {/* ── 11. VALUE + PRICE ── */}
      <section className="cs-value cs-bleed" id="enroll">
        <div className="cs-value-head">
          <span className="cs-eyebrow is-center">What you&rsquo;re getting</span>
          <h2>
            The whole course, for less than <em>a few therapy sessions.</em>
          </h2>
          <p>
            Middle Skills is everything &mdash; the full curriculum, monthly live time with Sean,
            the parent community, and every future update &mdash; for one price.
          </p>
        </div>
        <div className="cs-value-grid">
          <div className="cs-includes">
            <ul>
              <li>18 video lessons across 6 modules</li>
              <li>A podcast-style audio version of every lesson</li>
              <li>Printable worksheets &amp; scripts</li>
              <li>Monthly live office hour with Sean</li>
              <li>Resource summaries, frameworks and key points</li>
              <li>Lifetime access &amp; every future update</li>
            </ul>
          </div>
          <aside className="cs-price">
            <div className="cs-price-ribbon">Pre-order</div>
            <div className="cs-price-tag">Founding group</div>
            <div className="cs-price-eyebrow">Founding price</div>
            <div className="cs-price-big">
              <span className="cs-price-num">{PRICE_FOUNDING}</span>
              <span className="cs-price-was">{PRICE_LAUNCH}</span>
            </div>
            <p className="cs-price-once">One payment &middot; lifetime access</p>
            <a href={CHECKOUT_ONCE} className="v6-cta v6-cta-primary" style={{ background: 'var(--accent)', justifyContent: 'center' }}>
              Reserve my founding seat <span className="v6-cta-arrow">&rarr;</span>
            </a>
            <div className="cs-price-plan">
              <span>Prefer to split it?</span>
              <a href={CHECKOUT_PLAN}><b>{PRICE_SPLIT}</b></a>
            </div>
            <ul className="cs-preorder-steps">
              <li>
                <span className="cs-preorder-steps-when">Today</span>
                Reserve your seat and lock the {PRICE_FOUNDING} founding price &mdash; it rises to {PRICE_LAUNCH} at launch.
              </li>
              <li>
                <span className="cs-preorder-steps-when">{LAUNCH_DATE}</span>
                The full course unlocks. You&rsquo;ll get an email the moment it goes live.
              </li>
              <li>
                <span className="cs-preorder-steps-when">30-day guarantee</span>
                Your refund window starts when the course opens &mdash; not today.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {/* ── 12. GUARANTEE ── */}
      <section className="cs-guarantee">
        <div className="cs-guarantee-card">
          <div className="cs-guarantee-seal">
            <b>30</b>
            <span>Day</span>
          </div>
          <div className="cs-guarantee-text">
            <h3>Our Guarantee.</h3>
            <p>
              Complete the course. Apply the tools. Give the process an honest effort. If you
              don&rsquo;t feel more confident handling the challenges of middle school parenting
              after doing the work, we&rsquo;ll refund your purchase. You bring the commitment.
              We&rsquo;ll take the risk.
            </p>
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
                {f.aJsx ? (
                  <p>
                    Yes. There&rsquo;s a group rate for bulk enrollments and a license for schools
                    and parent organizations. Head to the{' '}
                    <Link href="/work-with-me" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
                      Work with me page
                    </Link>{' '}
                    and we&rsquo;ll set it up.
                  </p>
                ) : (
                  <p>{f.a}</p>
                )}
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
            You&rsquo;re closer than you think to being the parent who <em>gets it.</em>
          </h2>
          <p>
            Who has the words. Who doesn&rsquo;t spiral when things get hard, because you understand
            what&rsquo;s actually happening. The middle school years don&rsquo;t have to be something
            you survive &mdash; they can be the years you both look back on as the ones that made the
            relationship.
          </p>
          <div className="cs-close-actions">
            <a href="#enroll" className="v6-cta v6-cta-primary" style={{ background: 'var(--accent)' }}>
              I&rsquo;m ready to understand my kid <span className="v6-cta-arrow">&rarr;</span>
            </a>
            <a href="#curriculum" className="v6-cta v6-cta-ghost">See what&rsquo;s inside</a>
          </div>
          <span className="cs-close-note">
            Founding pre-order &middot; opens {LAUNCH_DATE} &middot; {PRICE_FOUNDING} or {PRICE_SPLIT} &middot; 30-day guarantee
          </span>
        </div>
      </section>

      <Footer />
    </article>
  );
}
