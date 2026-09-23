// content/essays/six-middle-skills.js
// The "Six Middle Skills" field guide, as a web page.
// Served at /freebies/six-middle-skills/read/ — shown in the freebie popup
// and linked from the Kit delivery email.
//
// Uses the existing block types, plus two for the skill lists:
//   before  — "before it's online" signs, muted dash list
//   checks  — "as it develops" signs, orange check list
// A section with no `label` renders without the numbered label row.

// Tagged so waitlist joins from this page show up as their own row in the
// "GMP Link Tracker" sheet (UTM tab).
const WAITLIST_HREF = '/autopilot/?utm_source=website&utm_medium=essay&utm_campaign=autopilot-waitlist&utm_content=six-middle-skills-essay';

// One skill's section, in the field guide's order: research paragraph,
// before it's online, as it develops, why it matters.
function skill({ num, label, name, intro, before, checks, why }) {
  return {
    num,
    label,
    headingItalic: name,
    blocks: [
      { type: 'p', text: intro },
      { type: 'h3', text: 'Before it’s online' },
      { type: 'before', items: before },
      { type: 'h3', text: 'As it develops' },
      { type: 'checks', items: checks },
      { type: 'h3', text: 'Why it matters' },
      { type: 'strong', text: why },
    ],
  };
}

export const SIX_MIDDLE_SKILLS_ESSAY = {
  slug: 'six-middle-skills',
  eyebrow: 'A field guide · For parents of middle schoolers',
  titleLead: 'The six',
  titleItalic: 'middle skills.',
  dek: 'The strategies that worked when your kid was eight stop working around eleven or twelve. Here are the six skills middle schoolers are actually building — what each looks like before it’s online, as it develops, and where it leads.',
  bannerHref: '/autopilot/?utm_source=website&utm_medium=essay&utm_campaign=autopilot-waitlist&utm_content=six-middle-skills-essay-banner',
  byline: 'Growth Mindset Parenting · Fourteen years in middle school classrooms · Three boys at home',
  metaTitle: 'The Six Middle Skills: A Field Guide for Parents of Middle Schoolers',
  metaDescription: 'A field guide by Sean Kane: the six skills your middle schooler is still building, what each looks like before it’s online and as it develops, and where it leads.',

  sections: [
    {
      num: '',
      blocks: [
        { type: 'p', text: 'If your kid is melting down over homework, slamming doors, fighting about phones, or quietly checking out — you’re not failing, and they’re not broken. What looks like attitude, laziness, or defiance in early adolescence is almost always something more specific: a developmental skill that hasn’t come online yet. All skills can be built.' },
        { type: 'p', text: 'Middle school is its own developmental window. The strategies that worked when your kid was eight stop working around eleven or twelve, because the underlying terrain — their brain, their social world, their sense of self — is changing fast. The parent’s job shifts with it: you’re now helping a kid find their way toward total independence.' },
        { type: 'p', text: 'This guide names the six skills middle schoolers need in order to grow into adults who can run their own lives. For each one, you’ll see what it looks like before it’s online, what it looks like as it develops, and where it leads.' },
        { type: 'strong', text: 'It’s a lens for noticing — not a checklist of what’s missing.' },
        { type: 'h3', text: '✦ The six skills at a glance' },
        { type: 'asks', items: [
          '01 Emotional literacy · Naming what you feel',
          '02 Autonomy · Acting without permission',
          '03 Resilience · Staying in hard things',
          '04 Reflection · Making meaning from experience',
          '05 Adaptation · Rolling with change',
          '06 Relationship · Repair and connection',
        ] },
      ],
    },

    skill({
      num: '01',
      label: 'Naming what you feel',
      name: 'Emotional literacy',
      intro: 'Kids who can identify and name what they feel regulate, focus, and connect better than kids who can’t. Emotional skills aren’t separate from learning and relationships — they’re underneath everything, and foundational to each of the six skills here.',
      before: [
        'Big feelings arrive as behavior before words — the slammed door, the “I’m fine” through clenched teeth, the meltdown over something small that was about something bigger.',
        'One or two words cover a wide range of states. Everything is “fine,” “annoyed,” or “whatever.”',
        'Feelings get sorted into good and bad rather than read as information.',
      ],
      checks: [
        'Puts a more specific word to a feeling — “I’m frustrated, not mad” — even if only after the fact.',
        'Notices a feeling in the body before the explosion (“my chest gets tight”).',
        'Recovers from a flood a little faster than they used to.',
        'Reads a feeling in someone else — a friend’s mood, a parent’s tiredness.',
      ],
      why: 'Kids who develop emotional literacy become adults who don’t get hijacked by their own feelings under the pressure of demand or relationships.',
    }),

    skill({
      num: '02',
      label: 'Acting without permission',
      name: 'Autonomy',
      intro: 'Self-Determination Theory names autonomy as one of three basic psychological needs, alongside competence and relatedness. When kids have age-appropriate autonomy — real say in things that affect them — motivation, engagement, and wellbeing follow. When they don’t, motivation collapses.',
      before: [
        'Waits to be told what to do, even for things they’ve done a hundred times.',
        'Backpack, homework, dishes don’t happen without prompting.',
        '“I don’t know” or “whatever you want” is the default response to a choice.',
      ],
      checks: [
        'Initiates a task without being asked.',
        'Tries something hard without checking in first.',
        'Has an opinion and can say it, even when it’s inconvenient.',
        'Recovers from a small failure and tries again without an adult stepping in.',
      ],
      why: 'Kids who develop autonomy become adults who don’t wait for permission or instructions to live their lives.',
    }),

    skill({
      num: '03',
      label: 'Staying in hard things',
      name: 'Resilience',
      intro: 'Research on adolescent development finds the middle school years are a period of unique neural plasticity — a second window of capacity-building the adult brain doesn’t get. Discomfort tolerated and worked through in these years builds resources that last decades.',
      before: [
        'Gives up at first friction.',
        'One bad grade or one rejection collapses the day.',
        '“I’m bad at this” — said after one try.',
      ],
      checks: [
        'Stays in something uncomfortable past the first urge to quit.',
        'Talks about a setback the next day with a little perspective.',
        'Tries a second strategy when the first one fails.',
        'Names what they learned from something that didn’t go well.',
      ],
      why: 'Kids who develop resilience become adults who stay in hard things long enough to learn from them.',
    }),

    skill({
      num: '04',
      label: 'Making meaning from experience',
      name: 'Reflection',
      intro: 'Work on narrative identity finds that adolescents construct a sense of who they are by building a story — making meaning from experience and weaving it into a coherent self. Kids who learn to reflect develop a stable identity; kids who can’t get pulled around by whatever happened most recently.',
      before: [
        'Events happen to the kid without being processed.',
        'Conversations stay in description (“we did this, then this”) with no interpretation.',
        'Their account of a hard moment is the same the next week.',
      ],
      checks: [
        'Tells the story of a hard day with some distance from it.',
        'Can say why they did something, not just what they did.',
        'Notices a pattern in themselves (“I always get like this when…”).',
        'Revises a story over time as they understand more.',
      ],
      why: 'Kids who reflect become adults who can learn from their own lives to define their goals, wants, and needs — instead of repeating the same patterns.',
    }),

    skill({
      num: '05',
      label: 'Rolling with change',
      name: 'Adaptation',
      intro: 'Kids who can roll with change — a different plan, a harder problem, a new social context — do better in school, in friendships, and at home. Research on executive function names this cognitive flexibility, one of three core executive functions that develop substantially across adolescence.',
      before: [
        'A change in plan derails the whole day.',
        'Transitions — between activities, classes, weekends and weekdays — are hard and stay hard.',
        'Sticks with one approach even when it isn’t working.',
      ],
      checks: [
        'Adjusts when a plan changes without losing the day.',
        'Tries a different approach when the first one isn’t working.',
        'Moves between contexts — school, home, friends — without bringing the whole stack along.',
        'Holds two things that feel contradictory at once.',
      ],
      why: 'Kids who develop adaptation become adults who can move through change without losing themselves.',
    }),

    skill({
      num: '06',
      label: 'Repair and connection',
      name: 'Relationship',
      intro: 'Humans regulate through each other — the nervous system is built for co-regulation, and a settled body settles other bodies nearby. Kids who learn to relate, register, respond to, and repair with the people around them build the foundation for every relationship that follows.',
      before: [
        'Conflict ends in a slammed door rather than a repair.',
        'The same conflict recurs without resolution.',
        'Friendships are intense and brittle.',
        'Patterns of conflict with siblings are persistent and unhealthy.',
      ],
      checks: [
        'Comes back after a hard moment to say something.',
        'Notices when someone else is off.',
        'Can say a hard thing without exploding it.',
        'Holds a friendship through small ruptures.',
      ],
      why: 'Kids who develop relationship skills become adults who can build and keep the relationships that hold a life together.',
    }),

    {
      num: '✦',
      label: 'A note on what comes next',
      headingLead: 'The skills don’t develop',
      headingItalic: 'in isolation.',
      blocks: [
        { type: 'p', text: 'Emotional literacy is the foundation — without it, the others struggle to come online. Here’s how the rest build on it:' },
        { type: 'h3', text: 'Autonomy & resilience' },
        { type: 'p', text: 'Build together, through challenge and independence, over time.' },
        { type: 'h3', text: 'Adaptation & relationship' },
        { type: 'p', text: 'How the skills get carried into a real life.' },
        { type: 'h3', text: 'Reflection' },
        { type: 'p', text: 'What turns all of these experiences into a coherent identity.' },
        { type: 'p', text: 'The parent’s role across these years is less about instructing the kid and more about creating the conditions in which the skills can develop.' },
        { type: 'strong', text: 'A parent’s own growth is the lever.' },
        { type: 'p', text: 'You’ll get a weekly newsletter from me with more on each of these skills — the research, the practical scripts, the small moves that build them.' },
        { type: 'p', text: 'The work starts with one belief: the kid in front of you isn’t a problem to fix. They’re a person becoming themselves.' },
      ],
    },
  ],

  next: {
    num: '✦',
    label: 'From Growth Mindset Parenting',
    headingLead: 'Tired of reminding?',
    headingItalic: 'Autopilot',
    headingTail: 'moves the management of your kid’s life from you to them.',
    blocks: [
      { type: 'p', text: 'A five-week live course for parents of middle schoolers. One process at a time, without lowering the standard and without walking away. Launches live in October, with weekly office hours for the pushback and fallout.' },
    ],
    ctaLead: 'The waitlist hears first and gets access to the free workshop.',
    ctaLabel: 'Join the Autopilot waitlist',
    ctaHref: WAITLIST_HREF,
    signoffByline: 'Growth Mindset Parenting · Austin, TX',
    colophon: 'From Growth Mindset Parenting — the same practices Sean used in room 201, now at the kitchen table. Built on educational research, fourteen years in middle school classrooms, and three boys at home.',
  },
};
