import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SubscribeForm from '../../components/SubscribeForm';
import JsonLd from '../../components/JsonLd';
import { SITE } from '../../data/site';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Sean Kane',
  description:
    'Fourteen years teaching middle school. Three sons. The same six skills, in two different rooms.',
  openGraph: {
    title: 'About Sean Kane',
    description: 'Fourteen years teaching middle school. Three sons. The same six skills, in two different rooms.',
    images: [{ url: '/images/sean-hero.jpg' }],
  },
  alternates: { canonical: '/about/' },
};

const PERSON_FULL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sean Kane',
  url: SITE.url,
  jobTitle: 'Parenting educator and former middle school English teacher',
  description: 'Fourteen-year middle school English teacher who applies classroom skills to home parenting. Father of three sons.',
  knowsAbout: [
    'adolescent development',
    'middle school parenting',
    'growth mindset',
    'emotional regulation',
    'classroom management',
    'positive discipline',
    'scaffolded learning',
  ],
  alumniOf: { '@type': 'EducationalOrganization', name: 'Chicago Public Schools' },
  sameAs: [SITE.author.tiktok, SITE.author.instagram],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Teaching Certificate',
    description: '14-year middle school English teacher',
  },
};

export default function AboutPage() {
  return (
    <article className="v6-page theme-terracotta">
      <JsonLd data={PERSON_FULL_SCHEMA} />
      <Nav active="/about" />

      <section className="v6-about-hero">
        <div className="v6-about-hero-text">
          <span className="v6-page-head-eyebrow">About Sean</span>
          <h1>From <em>Room 201</em> to the kitchen table.</h1>
          <p>Fourteen years teaching middle school. Three sons. The same six skills, in two different rooms.</p>
        </div>
        <figure className="v6-about-hero-img">
          <Image
            src="/images/sean-hero.jpg"
            alt="Sean Kane — parenting educator and former middle school teacher, Austin TX"
            width={600}
            height={750}
            style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }}
          />
          <figcaption className="v6-about-hero-img-cap">
            <span>Sean Kane &middot; Austin, TX</span>
          </figcaption>
        </figure>
      </section>

      <section className="v6-about-essay">
        <aside className="v6-about-essay-side" aria-label="Article info">
          <div><b>12 min</b> read</div>
          <div>
            <span style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Last updated</span>
            May 2026
          </div>
          <nav className="v6-about-essay-toc" aria-label="Table of contents">
            <span style={{ fontFamily: 'var(--serif-display)', fontStyle: 'italic', color: 'var(--accent)', fontSize: 18, marginBottom: 8, display: 'block' }}>Inside</span>
            <a href="#room-201">i. Room 201</a>
            <a href="#what-worked">ii. What worked there</a>
            <a href="#kitchen">iii. Kitchen table</a>
            <a href="#now">iv. What I&apos;m doing now</a>
          </nav>
        </aside>

        <div className="v6-about-prose">

          {/* Section 1 */}
          <h2 id="room-201">Room 201.</h2>
          <p>
            I was a middle school educator for fourteen years, starting my career in 5th grade on
            the South Side of Chicago. I moved to the West Side and worked at an all-boys school in
            some of the most formative years of my life. Work brought our family to Austin, Texas,
            where I worked for four years as a 9th-grade teacher and school administrator. Always
            teaching language arts, somehow always from Room 201. Those years taught me an immense
            amount about what works and what won&apos;t work with our kids &mdash; but fatherhood
            made it urgent.
          </p>
          <p>
            The man who taught me most was Dave Deal. Founding Dean of students at the all-boys
            school where I worked, and the most quietly relentless teacher I&apos;ve ever met. His
            high standards were the most respectful thing a child could experience. Every year, his
            first lesson taught the kids that their brain was neuroplastic &mdash; he showed them MRI
            scans to prove it. All of it in the service of a growth mindset: the idea that we can
            always learn, and engage in change. He would tell them, &ldquo;I&apos;m so glad you made
            a mistake. We learn nothing from our successes. We learn everything from these.&rdquo;
          </p>
          <p>
            That was the disposition. Every kid, limitless. Every mistake, useful. Every day a chance
            to grow. Mr. Deal wasn&apos;t a cheerleader and he wasn&apos;t soft &mdash; he was strict,
            structured, and demanding. But he treated every kid like a person becoming, not a problem
            to manage. I followed him around for years trying to learn how he did it.
          </p>
          <p>
            What I eventually figured out was this: the kids who do well in middle school
            aren&apos;t the ones who happen to be born good at it. They&apos;re the ones being
            taught &mdash; actively taught, with patience and repetition &mdash; how to handle their
            feelings, how to stay in something hard, how to look at their own choices honestly, how
            to repair when they&apos;ve broken something. There&apos;s a set of skills underneath
            everything else. And those skills can be taught.
          </p>

          {/* Section 2 */}
          <h2 id="what-worked">What worked there.</h2>
          <figure className="v6-about-figure">
            <Image src="/images/sean-teaching.jpg" alt="Sean in the classroom" width={500} height={375} />
            <figcaption>My classroom, circa 2013.</figcaption>
          </figure>
          <p>
            After fourteen years of watching this developmental window play out with over a thousand
            kids, the patterns started to feel less like patterns and more like a curriculum. Six
            things kids in this age are always building, in some order, whether the adults around
            them notice or not &mdash; emotional literacy, resilience, reflection, relationship,
            autonomy, communication. The adults who taught them connected with kids, and helped them
            grow. And the kids who engaged with that work realized the person I am matters more than
            the scores I earn.
          </p>
          <p>
            You also start to see what the kids in front of you can do that no adult is giving them
            credit for. A twelve-year-old can think honestly about their own behavior if you ask the
            right question and wait long enough for the answer. A thirteen-year-old can apologize
            without prompting if they&apos;ve watched the adults in their life do it first. A
            fourteen-year-old can sit with something difficult instead of running from it &mdash;
            once they&apos;ve done it a few times and noticed they survived.
          </p>
          <p>
            It&apos;s not magic. It&apos;s teaching. And the disposition Dave Deal modeled &mdash;
            this kid is forming, not finished; this moment is data, not a verdict; everything is
            learnable &mdash; turns out to be a daily practice.
          </p>

          {/* Section 3 */}
          <h2 id="kitchen">Kitchen table.</h2>
          <p>
            I became a dad in my late twenties and now have three boys. There wasn&apos;t one moment
            when fatherhood reframed everything I&apos;d learned in the classroom &mdash; it happened
            gradually, over years, as one boy became three and the work I&apos;d been doing with other
            people&apos;s kids became the work I had to do at home, every day, with much less distance
            and much more emotional weight.
          </p>
          <p>
            What I noticed was that I parent like a teacher. Not deliberately at first &mdash;
            it&apos;s just the only way I know how. I name what&apos;s happening when I see it. I ask
            the question instead of declaring the answer. I inspect rather than expect. I model what
            I want to see, more often than I tell them what to do. I structure every routine and follow
            through. I&apos;ve spent fourteen years building these habits with other people&apos;s
            children. They don&apos;t switch off when I walk through the door of my own house.
          </p>
          <p>But teaching your own kids is different, and harder.</p>
          <p>
            The detachment that lets you see other people&apos;s children clearly doesn&apos;t exist
            when the kid in front of you is yours. The emotional stakes change, the strategies change,
            but what remains is the understanding that every kid deserves the support that allows them
            to be their best. In a school year, you become a slice of the child&apos;s story and they
            move on in June. In your home, you are a main character &mdash; and the goal is to remain
            connected, in some way, forever.
          </p>
          <p>
            In 2021 we bought a small flower farm in Texas, which is where I started keeping a real
            practice of being someone who&apos;s still learning. I knew nothing about farming. I had
            to figure it out the same way I tell parents to figure parenting out: try, fail, ask better
            questions, watch the people who know more than you, and keep going. The farm taught me what
            I&apos;d been telling kids for years. Growth happens when the conditions are right. You
            can&apos;t force it.
          </p>
          <p>
            But it also taught me about potential again. Just because you feel lost doesn&apos;t mean
            you can&apos;t grow. Great things happen when we try, fail, learn, and try again. And
            that&apos;s my invitation to parents &mdash; just keep growing.
          </p>

          {/* Stats block */}
          <div className="v6-about-stats" role="list">
            <div className="v6-about-stat" role="listitem">
              <b>14</b>
              <div className="v6-about-stat-l">yrs &middot; Teaching middle school</div>
            </div>
            <div className="v6-about-stat" role="listitem">
              <b>3</b>
              <div className="v6-about-stat-l">Schools, two cities</div>
            </div>
            <div className="v6-about-stat" role="listitem">
              <b>1,000+</b>
              <div className="v6-about-stat-l">Students taught</div>
            </div>
            <div className="v6-about-stat" role="listitem">
              <b>170K</b>
              <div className="v6-about-stat-l">Following across social</div>
            </div>
          </div>

          {/* Pull quote between Section 3 and Section 4 */}
          <blockquote style={{
            fontFamily: 'var(--serif-display)',
            fontStyle: 'italic',
            fontSize: 26,
            fontWeight: 500,
            color: 'var(--ink)',
            borderLeft: '4px solid var(--accent)',
            paddingLeft: 28,
            margin: '48px 0',
            lineHeight: 1.5,
          }}>
            In a school year, you become a slice of the child&apos;s story and they move on in June.
            In your home, you are a main character &mdash; and the goal is to remain connected, in
            some way, forever.
          </blockquote>

          {/* Section 4 */}
          <h2 id="now">What I&apos;m doing now.</h2>
          <p>
            I&apos;m still teaching &mdash; just not in Room 201. The classroom now is the weekly
            newsletter, the videos, the long essays, the coaching calls with parents who want a
            teacher in their corner. There&apos;s a course coming, built around the six skills,
            designed for parents who want the full curriculum instead of the highlights. And the
            daily work of raising three boys, which is the only part of any of this that
            isn&apos;t optional.
          </p>
          <p>
            I do this work because I still believe in kids. Fourteen years in a classroom
            didn&apos;t burn that out &mdash; it affirmed my vocation. Every kid I taught was
            becoming someone, and most of them have. I want every parent reading this to feel about
            their own kid the way I felt about mine: that this is a person worth knowing, that this
            phase is a chance to do something with, and that the work you&apos;re doing matters even
            when nobody hands you a grade for it.
          </p>
          <p>Your kid is awesome. The trick is staying close enough, and patient enough, and curious enough to see it.</p>

        </div>
      </section>

      <section className="v6-about-end">
        <span className="v6-page-head-eyebrow">Two ways forward</span>
        <h2>Start where you are.</h2>
        <div style={{ maxWidth: 400, margin: '0 auto 16px' }}>
          <SubscribeForm
            variant="light"
            inputPlaceholder="sean@growthmindsetparenting.com"
            buttonLabel="Get the weekly newsletter →"
          />
        </div>
        <Link href="/work-with-me" className="v6-cta v6-cta-ghost">
          Or work with me directly &rarr;
        </Link>
      </section>

      <Footer />
    </article>
  );
}
