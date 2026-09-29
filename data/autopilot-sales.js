// Autopilot course sales page — all copy, prices and checkout links live here,
// so price or copy changes are a content change, not a rebuild.
// Copy is final from the design handoff
// (Plans/2026-09-29-autopilot-sales-page-design-handoff/), verbatim including
// curly quotes, with Katie's approved changes (2026-09-29):
//   - payment plan is 2 × $160 (design said $149)
//   - the details checklist's bonus lines match the three Bonuses cards
//   - two typos fixed ("you're developing", "collaboration, not consequence")
// Testimonials are verbatim, typos included — do not correct them.
//
// Never add seat-count language, and never call the course coaching,
// a masterclass or a webinar.

// Kajabi offer TzgFtavw has both pricing options; the buyer picks $297 or
// 2 × $160 on the checkout page. Kajabi has no URL that preselects the plan
// (checked 2026-09-29: ?checkout_token=, ?price_id=, ?pricing_option_id= and
// per-option paths all land on the default $297 option or 404), so both
// constants point at the same offer for now. Kept separate so they can
// diverge later (e.g. a plan-only offer) without touching the component.
// The visitor's saved utm_* tags are added to these links on click by
// components/AttributionCapture.jsx.
export const CHECKOUT_ONCE_URL = 'https://courses.growthmindsetparenting.com/offers/TzgFtavw/checkout';
export const CHECKOUT_PLAN_URL = 'https://courses.growthmindsetparenting.com/offers/TzgFtavw/checkout';

// Off by default (design prop stickyEnrollBar). Flip to true to show a fixed
// "Enroll now" bar at the bottom of the screen.
export const STICKY_ENROLL_BAR = false;

export const PRICES = {
  // Numbers for analytics (GA4 begin_checkout value).
  onceValue: 297,
  planValue: 320,
  // Display strings.
  once: '$297',
  anchor: '$397',
  plan: '$160',
};

// The three pricing blocks share the same two cards.
const CARDS = {
  once: {
    label: 'One-time payment',
    note: 'Founding price · lifetime access',
    cta: 'Enroll now',
  },
  plan: {
    label: '2 monthly payments',
    note: 'Same access, spread over two months',
    cta: 'Enroll with the plan',
  },
  fine: 'Secure checkout · Visa · Mastercard · Amex · Apple Pay · 14-day guarantee',
};

export const SALES = {
  logoAlt: 'Growth Mindset Parenting',
  navCta: 'Enroll now',
  enrollCta: 'Enroll in Autopilot',
  cards: CARDS,

  hero: {
    eyebrow: 'A live course for parents of kids 9 to 15',
    headline: 'Your kid is capable.',
    headlineAccent: 'Let them experience it.',
    subtitle:
      'Teach the skills that turn everyday responsibility into real independence—without lowering the standard or doing it for them.',
    support: 'Because independence builds confidence, capability, and connection.',
    quote: '"Tools I never had that you\'re giving me." — a parent in Sean\'s community',
    photoAlt: 'Sean Kane',
    photoCaption: 'Sean Kane · Austin, TX',
  },

  pain: {
    eyebrow: 'If this is your house',
    headline: 'You are carrying more than you can',
    headlineAccent: 'keep carrying.',
    asideLead: 'You keep asking yourself: ',
    asideAccent: 'why is it always like this? Why can’t they do the basic things? Why is every bit of it on me?',
    rows: [
      { title: "You're exhausted.", body: "You are the family's memory, clock and lost-and-found — and nobody in the house seems to change." },
      { title: "You're frustrated.", body: "Every ordinary logistical problem — the backpack, the chore, the portal — turns into an argument. It's getting old." },
      { title: "You're stuck.", body: 'You want to respect their independence, but you have very little evidence you can stop managing. Every reminder ends in tension for everyone.' },
    ],
    closing: 'Your kid can carry more. You just need a way to teach the handoff.',
  },

  intro: {
    stamp: 'Introducing',
    name: 'Autopilot',
    tagline: 'Teach the skills underneath "be responsible."',
    // {with} is set in bold accent.
    body: {
      before:
        'A live five-week course for parents of kids 9 to 15. Five lessons that turn reminders, routines, homework and chores into practice for real self-management. You\'ll learn to see the executive skills underneath the demand, build the support ',
      strong: 'with',
      after: ' your kid, and step back on evidence instead of hope.',
    },
    note: 'First cohort starts October 13, 2026 · 14-day guarantee',
  },

  testimonial1: {
    quote: '"You are gonna almost single-handedly help heal my home. Tools I never had that you\'re giving me."',
    source: 'From the community that shaped this course · Instagram',
  },

  what: {
    eyebrow: 'What Autopilot does',
    headline: 'Turns everyday life into growing',
    headlineAccent: 'independence.',
    paragraphs: [
      'Autopilot teaches parents to use the things already happening every day—mornings, homework, chores, forgotten gear—as opportunities to build the skills their kid needs to manage more for themselves.',
      'You learn how to understand where things are breaking down, build support with your kid, and gradually hand the responsibility over as they become more capable.',
      'The system isn\'t the goal. It’s a place for kids to practice being capable, contributing, solving problems, and taking ownership of their lives—while staying connected to the people they share it with.',
    ],
    rows: [
      {
        title: "You'll finally see what's going on, and what to do about it.",
        body: 'Right now you\'re asking "What am I doing wrong?" You\'ve become the brain for the whole house, but no one ever taught you how executive function develops or functions. You\'ll reframe from task master to teacher.',
      },
      {
        title: 'Your kid will see themselves as capable.',
        body: 'The goal isn’t a middle schooler who follows your orders. Chores, homework and mornings become places to practice something much bigger: solving problems, contributing, recovering when things don’t work, and taking ownership. Your kid gets repeated evidence that they can handle hard things, that their contribution matters, and that they can be trusted with more.',
      },
      {
        title: "You'll have room for the relationship.",
        body: "When you're fighting less about the clock, the homework and the dishwasher, there's room for the good stuff again: their music, their friends, the show you both like. Less time managing each other. More time enjoying each other.",
      },
    ],
  },

  fit: {
    eyebrow: 'Is this for you?',
    headline: "Autopilot is a perfect fit if you're",
    headlineAccent: 'one of these parents.',
    personas: [
      { tone: 'cream', title: 'The Reminder', body: 'Your kid is ten. Mornings run on your voice. You\'ve said "shoes" more times this month than your own name. Overfunction is your middle name.' },
      { tone: 'blush', title: 'The Volcano', body: 'Your thirteen-year-old barks back when simple things come up. You explode, they comply, but it just feels wrong.' },
      { tone: 'sage', title: 'The Builder', body: "You believe in your kid. They're capable, kind, smart. But you think you can help them grow even more." },
      { tone: 'clay', title: 'The Peacekeeper', body: 'You care deeply about your relationship and try not to make every little thing a battle. But you also know that contribution, responsibility, and learning to do hard things matter.' },
    ],
    body: 'Whether you’re trying to get out of a difficult pattern or simply ready to give your kid more room to grow, you’re in the right place.',
    accent: "You're in the right place.",
  },

  tuesday: {
    eyebrow: 'If this is your house',
    headline: 'A Tuesday,',
    headlineAccent: 'start to finish.',
    paragraphs: [
      'You love your kid. Your kid is capable. And somehow you are still the clock, calendar, reminder app, finder of lost things, and keeper of information everyone else could theoretically know.',
      "But this is your reality. And it's exhausting you.",
    ],
    // Each entry in `lines` is its own line (the design breaks them with <br>).
    timeline: [
      { time: '6:40', lines: ['“It’s 6:40.” Then, “It’s 6:45.” Then, somehow more urgently, “Guys. It is 6:50.” You are a talking clock.'] },
      { time: '7:05', lines: ['“Where’s my water bottle?!” You know. You also know where the backpack, cleats and charger are, which is strange because none of them belong to you.'] },
      { time: '7:20', lines: ["“I’ve got it, DAD!” Sure, you trust them. But at 7:28, you are filling the water bottle because they don't have shoes on."] },
      { time: '3:30', lines: ["You check the school portal to see whether the homework has been turned in. At least you're developing a great relationship with the math teacher."] },
      { time: '4:15', lines: ['“Don’t forget you have practice at 5:30.”', '“I KNOW.”', 'Great. Just checking.'] },
      { time: '6:00', lines: ['“Did you unload the dishwasher?”', '“I was about to.”', 'You have apparently interrupted the exact moment they were about to do it for the fourth consecutive day.'] },
      { time: '8:30', lines: ["A completely ordinary reminder about a towel on the floor has somehow become a referendum on whether you like them. You're spent."] },
    ],
  },

  future: {
    eyebrow: 'Picture five weeks from now',
    headline: 'Easier logistics. A more capable kid.',
    headlineAccent: 'More room for the relationship.',
    columns: [
      {
        label: 'Functional',
        items: [
          "You walk past the kitchen at 7:10 and the backpack is already by the door — because now there is a process that doesn't depend on you.",
          'Homework, chores and Sunday planning each have a first-draft system your kid helped build — and a plan for what happens when it fails.',
        ],
      },
      {
        label: 'Developmental',
        items: [
          'You watch your kid notice the clock, start without a push, and adjust when it goes sideways. Not every time. Increasingly.',
          'You can look at a bad morning and name the breakdown instead of making it personal. And, you start seeing everything they do right.',
        ],
      },
      {
        label: 'Relational',
        items: [
          'The drive to school is quiet in the good way. Nobody got cast as hero, villain or victim before 7:30.',
          "You step back from something on purpose, because you've seen the evidence — and your kid experiences that as respect.",
        ],
      },
    ],
    closing: 'Executive function is the vehicle. Functional independence is the skill. ',
    closingAccent: 'A healthier relationship is the larger purpose.',
  },

  testimonial2: {
    quote: '"Thank GOD I found your content. At a very low point in parenting my 11-year-old son. Gratefully out here listening to ALL your advice."',
    source: 'From the community that shaped this course',
  },

  pricing1: {
    eyebrow: 'Enrollment is open',
    headline: 'Autopilot is officially open, at the',
    headlineAccent: 'founding price.',
    body: "The first cohort pays $100 less than everyone after it. You're helping shape the playbooks, and the price reflects that. It goes to $397 for the next cohort.",
    checklist: [
      'Five live lessons with Sean, ninety minutes each',
      'Six Plug + Play playbooks, the case studies, every worksheet',
      'Lifetime access to every replay, plus three bonuses',
    ],
  },

  pullQuote: {
    eyebrow: 'What others are saying',
    quote: '"In these moments that I\'ve in some way failed — then I see your videos and realize maybe I\'m not failing, but instead in the exact place with my 11-year-old that I\'m supposed to be."',
    source: 'From the community that shaped this course',
  },

  curriculum: {
    eyebrow: "What's inside",
    headline: 'Five weeks. Five questions.',
    headlineAccent: 'A new way to see any problem at home.',
    intro: 'Five live lessons with Sean, ninety minutes each, one essential question per week. Replays, worksheets and playbooks waiting afterward, for life.',
    outcomesLabel: "You'll walk out with",
    parts: [
      {
        label: 'Part one — lessons 01 to 02',
        title: 'See the skill',
        titleAccent: 'underneath the demand.',
        lessons: [
          {
            num: '01',
            tag: 'Lesson 01 · Development',
            question: 'How does executive function develop as kids grow?',
            outcomes: [
              'Why twenty reminders produce nothing and a fridge checklist produces a kid out the door',
              'The executive skills, in plain language',
              'Ability to spot which one broke this morning — yours included',
            ],
          },
          {
            num: '02',
            tag: 'Lesson 02 · Understand',
            question: 'Why is this hard for my kid?',
            outcomes: [
              'Observe before interpreting, name the demand, form a hypothesis',
              'Turning "he\'s being disrespectful" into "three skills are lagging"',
              'Your written list of where the family reliably falls off the rails',
            ],
          },
        ],
      },
      {
        label: 'Part two — lessons 03 to 04',
        title: 'Build the system',
        titleAccent: 'with your kid.',
        lessons: [
          {
            num: '03',
            tag: 'Lesson 03 · Design',
            question: 'How do we create the conditions for success?',
            outcomes: [
              'Hold the standard, collaborate on the path',
              'Systems that carry executive skills at once.',
              'The four-move follow-up: boundary, beat, question, invitation',
            ],
          },
          {
            num: '04',
            tag: 'Lesson 04 · Implement + adapt',
            question: "What do we do when it doesn't work?",
            outcomes: [
              'Resistance, and participation as the baseline boundary',
              'Feedback that lands as collaboration, not consequence',
              'A clear answer to "But how?"',
            ],
          },
        ],
      },
      {
        label: 'Part three — lesson 05',
        title: 'Step back',
        titleAccent: 'on evidence.',
        lessons: [
          {
            num: '05',
            tag: 'Lesson 05 · Mastery',
            question: 'How does support become independence?',
            outcomes: [
              'Fading support as a transfer of function, not a removal of help',
              'The self-monitoring questions your kid starts asking on their own',
              "The evidence that tells you it's time to step back",
            ],
          },
        ],
      },
    ],
  },

  // Dollar values are placeholders from the design, kept as approved.
  bonuses: {
    eyebrow: 'Bonuses',
    headline: 'All the resources.',
    headlineAccent: 'All included, free.',
    items: [
      {
        num: '01',
        value: '$197 value',
        title: 'Four office hours with Sean',
        body: 'Bring the system that broke this week. We look at it together and fix the draft before the next lesson. Four live group sessions during the cohort, recorded if you miss one.',
      },
      {
        num: '02',
        value: '$97 value',
        title: 'Podcast episodes, real conversations',
        body: 'Each episode walks through essential information from understanding to application, so you hear the method applied, not just explained. Yours the day you enroll.',
      },
      {
        num: '03',
        value: '$147 value',
        title: 'Plug and Play Exercises for common scenarios',
        body: '6 common daily struggles in our households broken down to build up the skills your kid needs, and the intervention to sit down with tonight.',
      },
    ],
  },

  details: {
    eyebrow: 'The details',
    headline: "Here's what you're getting when you enroll in",
    headlineAccent: 'Autopilot',
    headlineAfter: ' today.',
    valueBefore: 'Over ',
    valueStrong: '$930 worth',
    valueAfter: ' of classroom-tested help for the ages 9 to 15 — all yours for $297.',
    checklist: [
      'Five live lessons with Sean, foundation through mastery, showing you the method step by step',
      'Lifetime access to every replay, worksheet and template',
      'Narrative case studies, to feel this in real life',
      'Six Plug + Play playbooks: morning, afternoon, homework, chores, bedtime, Sunday planning',
      'Bonus 1 — four weekly office hours with Sean during the cohort ($197 value)',
      'Bonus 2 — multiple podcast episodes with real examples of the method applied ($97 value)',
      'Bonus 3 — Plug and Play Exercises for common scenarios ($147 value)',
    ],
  },

  guarantee: {
    days: '14',
    label: 'Day risk-free guarantee',
    heading: "Plus, you'll be backed by a 14-day guarantee.",
    body: "Here's the deal. Attend the first two lessons and run one Plug + Play playbook with your kid. Within fourteen days of the cohort start, you should have fewer reminders in your day, a kid carrying more of their own life, and a method you can run on the next problem.",
    refundBefore: "If that isn't true, email ",
    email: 'hello@growthmindsetparenting.com',
    refundAfter: ' with your completed playbook worksheet before day fourteen, and the full refund goes back to your card within five business days. ',
    refundAccent: "You bring the participation. I'll take the risk.",
  },

  faq: {
    eyebrow: 'FAQ',
    headline: 'Have questions?',
    headlineAccent: "I've got answers.",
    askBefore: "Don't see yours? ",
    askLink: 'Email me directly',
    askEmail: 'sean@growthmindsetparenting.com',
    askAfter: ' — I read every one.',
    // The first item starts open, as in the design.
    items: [
      { q: 'When are the live lessons?', a: 'Five Tuesdays, starting October 13: October 13, 20 and 27, then November 3 and 10.' },
      { q: "What if I can't attend live?", a: 'Every lesson is recorded and posted within a day, and the replays, worksheets and playbooks are yours for life. Plenty of parents will do this course entirely on replay.' },
      { q: 'My kid has ADHD. Does this still apply?', a: "The method is built around uneven and developing executive capacities, so it applies. What I won't do is promise identical outcomes or imply a diagnosis. Autopilot is parent education, and it sits alongside whatever clinical support your family has." },
      { q: 'What if my kid refuses?', a: "Expected. Resistance is part of the design, not a sign the method failed. Participation — not enthusiasm — is the baseline boundary, and your kid's objections usually contain useful information about where the plan is wrong." },
      { q: "My kid knows what to do and just doesn't. How does this help?", a: 'Knowing the outcome is different from reliably initiating, sequencing, monitoring and completing the process. That gap is exactly what we teach into. "They know" is where most parents stop investigating; it\'s where Autopilot starts.' },
      { q: "I've tried checklists. How is this different?", a: 'A checklist is a tool, not an intervention. Autopilot teaches how to identify the barrier, define the standard, design collaboratively, measure, revise and transfer. The checklist is a temporary external support your kid is meant to outgrow.' },
      { q: 'Do I have to lower my standards?', a: "You don't have to. The standard is firm; the strategy is a first draft. Collaboration means your kid helps design the path, not whether the standard exists." },
      { q: "Won't this mean more nagging?", a: "The whole point is to reduce parent-held cueing. Information and process move out of your head and into structures your kid can increasingly carry. The system carries information so the relationship doesn't have to." },
      { q: "What if I can't manage my own life, let alone theirs?", a: 'Your executive function is finite too. External systems carry information for the whole family, including you. This is not a perfection program for parents; several of the structures are built to take load off you first.' },
      { q: 'How much time does this take?', a: 'Ninety minutes a week for five weeks, plus a few minutes of observation and a short redesign at home. Not every logistical failure requires therapeutic excavation. Autopilot is tactical.' },
    ],
  },

  pricing2: {
    headline: 'Ready to stop being the',
    headlineAccent: "family's reminder system?",
    body: 'The backpack by the door at 7:10. The missing skill named instead of the guilty party. A quiet drive to school.',
  },

  undecided: {
    eyebrow: "If you're still on the fence",
    headline: "You've been doing the hard version",
    headlineAccent: 'for years.',
    paragraphs: [
      "Nobody carries a whole household in their head because they're lazy. You've been doing it because you love your kid and nobody handed you a better way. That's work ethic. That's the exact thing this course asks for.",
      "The parents who get the most out of Autopilot aren't the most organized ones. They're the ones willing to look at their own worst hour with curiosity instead of shame, sit down with a kid who'd rather be anywhere else, and try a first draft that might fail. If you've read this far, that's you.",
    ],
    closing: 'Five weeks. You already spend more than that re-explaining the morning.',
  },

  why: {
    photoAlt: 'Sean Kane teaching',
    eyebrow: 'Why I built this',
    headline: 'I watched, for fourteen years, what happens when an adult',
    headlineAccent: 'creates capacity in a kid.',
    paragraphs: [
      'The kid stops hearing "what\'s wrong with you" and starts hearing "here\'s what\'s next." I wanted that for my own three sons, and I want it for yours. When the easy stuff stays easy, families have more room for the relationship.',
      'What I learned as a teacher is that independence doesn’t come from simply expecting more from kids. We can teach toward it. We can hold high expectations, understand where a kid is struggling, build support around them, and gradually step back as they become more capable. The handoff doesn’t have to happen all at once, and neither parents nor kids have to figure it out alone.',
      'That’s why I built Autopilot. I want parents to have the tools to see their kid clearly, know what to do when something isn’t working, and create more opportunities for their kid to experience themselves as capable, contributing and increasingly independent.',
      'If that sounds like what you want for your family, you’re in the right place. And with the fourteen-day guarantee, the risk is mine.',
    ],
    signature: '— Sean Kane · Middle school teacher, fourteen years · M.Ed., Northwestern · Dad of three · Austin, TX',
  },

  wall: {
    eyebrow: 'From the community that shaped this course',
    headline: 'Real changes, in',
    headlineAccent: 'real houses.',
    quotes: [
      { handle: '@cringe4less', note: 'Licensed clinical therapist', text: "First damn parenting voice on insta that's just made sense to me. Thank you for what you're doing, brother. And I say that as a licensed clinical therapist, with three kids of my own, and years of training on child development, parenting and co-regulation.. and you're teaching me with every video. Thank you thank you thank you." },
      { handle: '@rousemm', note: 'Instagram', text: 'As a parent with a fresh middle schooler this year your posts have been relationship savers for us- thanks for keeping us parents grounded in what really matters and how to get there.' },
      { handle: '@morganbrandonmiller', note: 'Parent of two neurodivergent kids', text: 'Your content is some of the best on the internet that I’ve found. I’m a parent of two neurodivergent kids 12 and 8 and you’re changing my life and theirs. Thank you so much for everything you do! You are an inspiration.' },
      { handle: '@mrs.sarahjean', note: 'Workshop cohort member', text: 'Sean!!! I held a boundary Wednesday night - he cried and begged and I calmly held the line and walked away. An hour later he told me I was totally right and he was glad I said no….and so I thanked him and let him know that his feedback made me feel good. BIG win! Thank you! So glad I signed up for a workshop cohort!' },
      { handle: '@silvermadestones', note: 'Instagram', text: 'You truly have helped me become a better parent to my teens, the kind of parent I always wanted to be and I thank you for that and the time you put i to these videos, just know they are making ripples.' },
      { handle: '@alisondemo', note: 'Instagram', text: 'Seriously, I will pay for your flights, and my husband is an exceptional cook, can you come and stay with us for like, I don’t know a week, and just put your hand on my shoulder to redirect me every time I’m about to open up my mouth to say the wrong thing to my 13 year-old! I also have ADHD and am a disregulated, mid-40 something mom and you consistently say all of the things I want to be able to, but can’t seem to remember in the moment! Help me Obi-Wan! I fear you are my only hope' },
      { handle: '@chalksfire', note: 'Instagram', text: 'I’m near tears in gratitude for finding this account today. Thank you for your thoughtful preparation of these videos- I know I am not the only ADHD mom who spends at least one small portion of every day feeling helpless, hopeless and desperately sad for how hard my kid’s life seems like it’s going to be. Your evidence based and actionable advice is so comforting. Thank you!!' },
      { handle: '@seaswims_and_us', note: 'Instagram', text: 'Literally EVERY SINGLE VIDEO and snippet of advice you give is absolute on point and golden! My son is 11 and I’m relating and learning so much from you. Thank you! Thank you for not making me feel like it’s just him/me and for sharing tools so we can raise amazing humans.' },
      { handle: '@il_pescatore', note: 'Parent of an ADHD kid', text: 'Sigh…where have you been for the last several years of me parenting an ADHD kid? I’ve known so many of these things but execution of this plan has never worked for us. I need this. So many of us need this. Support for so many neurodivergent children is simply not there. This is great. Please continue helping parents. Because we are drowning. Thank you.' },
      { handle: '@brandonwentzel', note: 'Teacher, 19 years', text: 'I’ve been teaching middle school and high school for 19 years… and my oldest turned 13 last week and you’re teaching me so much that I didn’t realize I was so clueless about.' },
    ],
  },

  lastWord: {
    eyebrow: 'The last word',
    headline: 'Your kid is capable. Give them the chance to experience it.',
    paragraphs: [
      'Autopilot isn’t about a perfect house or a perfectly organized kid. It’s about giving your kid more opportunities to manage themselves, solve problems, contribute, and take ownership—and giving yourself a way to support that growth without carrying every step.',
      'A little more capability. A little more independence. A little more room to enjoy each other.',
    ],
    cta: 'See the five lessons',
  },

  pricing3: {
    headline: 'Join Autopilot before the founding price',
    headlineAccent: 'is gone.',
    body: '$297 holds for this cohort only. The next one pays $397.',
  },

  sticky: {
    label: 'Autopilot · enrollment open',
    cta: 'Enroll now',
  },

  footer: {
    copyright: '© 2026 Growth Mindset Parenting',
    // The design's footer lists "Earnings disclaimer"; the site has no such
    // page, so it is left out rather than linked to nothing.
    links: [
      { label: 'Privacy policy', href: '/privacy/' },
      { label: 'Terms & conditions', href: '/terms/' },
    ],
  },
};
