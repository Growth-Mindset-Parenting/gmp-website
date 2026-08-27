import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Work with Me',
  description:
    'One-on-one coaching, podcasts, speaking, and brand partnerships with Sean Kane of Growth Mindset Parenting.',
  openGraph: {
    title: 'Work with Me | Growth Mindset Parenting',
    description: 'One-on-one coaching, podcasts, speaking, and brand partnerships with Sean Kane.',
    images: [{ url: '/images/sean-wide.jpg' }],
  },
  alternates: { canonical: '/work-with-me/' },
};

const PODCAST_TOPICS = [
  'Why middle school strains the parent–child relationship',
  'The 12-year-old brain, in plain English',
  "Growth mindset isn’t just for kids",
  'Sibling cruelty in the tween years',
];

const SPEAKING_TALKS = [
  'The Middle School Brain',
  'From Manager to Coach',
  'Raising Kids Who Can Handle Hard Things',
];

export default function WorkWithMePage() {
  return (
    <article className="pd6 v6-page">
      <Nav active="/work-with-me" />

      <div className="pd6-wrap">

        {/* Hero */}
        <section className="pd6-hero">
          <div className="pd6-hero-eyebrow">Work with me</div>
          <h1>Ways to <em>work together.</em></h1>
          <p>
            If your work and mine point in the same direction, I&apos;d love to hear from you.
            Here are the ways that usually takes shape.
          </p>
          <div className="pd6-email">
            <span className="pd6-email-label">Email me</span>
            <a href="mailto:sean@growthmindsetparenting.com">sean@growthmindsetparenting.com</a>
          </div>
        </section>

        {/* 01 One-on-one coaching */}
        <section className="pd6-block">
          <div className="pd6-num">01</div>
          <div className="pd6-body">
            <h2 className="pd6-topic">One-on-one coaching</h2>
            <p className="pd6-lead">When it&apos;s about your kid, specifically.</p>
            <p>
              Sometimes a family doesn&apos;t need a talk or an audience &mdash; they want to think
              through what&apos;s happening with their own kid. I take on a small amount of
              one-on-one coaching for parents who want direct, personal help with a specific
              season.
            </p>
            <p>
              A few sessions to step back, name what&apos;s really going on, and leave with a plan
              that fits your house.
            </p>
          </div>
        </section>

        {/* 02 Podcasts & shows */}
        <section className="pd6-block">
          <div className="pd6-num">02</div>
          <div className="pd6-body">
            <h2 className="pd6-topic">Podcasts &amp; shows</h2>
            <p className="pd6-lead">A guest who comes ready to talk.</p>
            <p>
              <strong>Fourteen years</strong> in a middle-school classroom left me with a story for
              everything and a plain way of telling it. I&apos;m an easy guest &mdash; prepared, on
              time, and never short on things to say.
            </p>
            <p>
              If you host a podcast or an educational show and the middle-school years are
              anywhere in your wheelhouse, I&apos;d be glad to come on.
            </p>
            <ul className="pd6-topics">
              <div className="pd6-topics-label">A few topics</div>
              {PODCAST_TOPICS.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </section>

        {/* 03 Speaking */}
        <section className="pd6-block">
          <div className="pd6-num">03</div>
          <div className="pd6-body">
            <h2 className="pd6-topic">Speaking</h2>
            <p className="pd6-lead">For a room full of parents or teachers.</p>
            <p>
              I speak at parent nights, school PD days, conferences, and virtual events &mdash;
              anywhere people are trying to make sense of raising and teaching kids through
              the middle years.
            </p>
            <p>
              I keep it concrete, and I try to leave the room with something they can actually
              use on Monday morning.
            </p>
            <ul className="pd6-topics">
              <div className="pd6-topics-label">A few talks</div>
              {SPEAKING_TALKS.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </section>

        {/* 04 Brand partnerships */}
        <section className="pd6-block">
          <div className="pd6-num">04</div>
          <div className="pd6-body">
            <h2 className="pd6-topic">Brand partnerships</h2>
            <p className="pd6-lead">Things I&apos;d hand to my own kids.</p>
            <p>
              Now and then I partner with a brand whose work I&apos;d genuinely put in front of my
              own family. If you make something for kids, classrooms, or the parents in the
              thick of it, tell me about it.
            </p>
            <p>
              <em>Where I tend to fit:</em> education, books, school supplies, family travel,
              thoughtful kid tech, and the durable, everyday things real families lean on.
            </p>
          </div>
        </section>

        {/* Contact close */}
        <section className="pd6-contact" id="inquiry">
          <div className="pd6-aside pd6-contact-copy">
            <h2>Get in <em>touch.</em></h2>
          </div>
          <div>
            <p className="pd6-contact-lead">
              Tell me what you have in mind, and we&apos;ll figure out the details from there.
              The best way to reach me is by email.
            </p>
            <div className="pd6-email">
              <span className="pd6-email-label">Email me</span>
              <a href="mailto:sean@growthmindsetparenting.com">sean@growthmindsetparenting.com</a>
            </div>
          </div>
        </section>

      </div>{/* end pd6-wrap */}

      <Footer />
    </article>
  );
}
