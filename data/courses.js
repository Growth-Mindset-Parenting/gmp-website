// The Courses page (/courses/) — the hub the site's "Courses" nav link opens.
// All copy and links live here. Each button link carries utm tags so clicks
// from this page can be told apart from the banner and popup
// (see lib/attribution.js and the GMP Link Tracker sheet, UTM tab).
//
// Copy source: Google Doc "Screen Time | Email Series", tab "Courses Page".
// Change the doc first, then this file.
//
// Screen Reset price: the card shows the same two states as the sales page
// (screenResetPriceAt in data/launch-schedule.js). Strings that differ are
// written as { sale, full }. Prices themselves come from PRICES in
// data/screen-reset-sales.js, never typed here.
//
// Autopilot facts match the current waitlist page (data/autopilot-waitlist.js):
// five 75-minute classes, kids roughly 9 to 14, no dates.

export const COURSES = {
  hero: {
    eyebrow: 'Courses from Growth Mindset Parenting',
    headline: 'Parenting courses for the',
    headlineAccent: 'middle school years.',
    paragraphs: [
      'I’m Sean Kane. I taught middle school for 14 years, and I’m raising three boys in Austin, Texas.',
      'Most parenting advice is written for little kids. These courses are for what comes next: ages 9 to 14, when the reminders stop working, the screens take over, and the kid who used to tell you everything goes quiet.',
      'Each course takes one problem at home and gives you a way to work on it with your kid, not on your kid. You get the why, in plain language. Then you get the exact steps.',
    ],
  },

  listHeadline: 'Two courses.',
  listHeadlineAccent: 'Two different problems.',

  courses: [
    {
      id: 'screen-reset',
      tone: 'sage',
      status: 'Open now',
      format: 'Self-paced · Finish in one weekend · Kids 9 to 14',
      title: 'The Screen Reset',
      tagline: 'Stop fighting over screens. Build an agreement your kid helped write.',
      paragraphs: [
        'The Screen Reset is a self-paced course for parents of kids 9 to 14. You can finish it in one weekend.',
        'First you get clear on what screens are doing in your kid’s brain and where the real risks start. Then you sit down with your kid and build a family agreement together, one that says where, when and how screens get used in your house.',
        'This is not a ban. The goal is a kid who can put it down on their own, even when you’re not in the room.',
      ],
      forTitle: 'It’s for you if',
      forItems: [
        'Every “time’s up” turns into a negotiation, then a meltdown.',
        'The fights are about a phone, a tablet, Roblox, Minecraft, Xbox or PlayStation.',
        'You’ve set limits and taken devices away, and none of it has stuck.',
      ],
      getTitle: 'What you get',
      getItems: [
        'The full lesson in two parts: Understand, then Implement',
        '4 podcast episodes that go deeper',
        'The family agreement template',
        'A screen-time inventory worksheet',
        'A list of videos to watch with your kid',
        'A guide to the tools',
      ],
      // Screen Reset only. `showPrice: true` tells the page to show the
      // price from PRICES, with $99 crossed out during the sale.
      showPrice: true,
      priceNote: {
        sale: 'Black Friday price through Monday, November 30. One payment.',
        full: 'One payment.',
      },
      fine: '14-day guarantee',
      cta: 'See The Screen Reset',
      href: '/screen-reset/?utm_source=website&utm_medium=courses-page&utm_campaign=screen-reset',
    },
    {
      id: 'autopilot',
      tone: 'cream',
      status: 'Waitlist open',
      format: 'Five 75-minute classes · Kids roughly 9 to 14',
      title: 'Autopilot',
      tagline: 'Less reminding. Less managing. More capable kids.',
      paragraphs: [
        'Autopilot is a course for parents who have become the reminder system for the whole house. In five 75-minute classes, it teaches responsibility as a set of skills, at your kitchen table, with your kid.',
        'You take the daily friction, the mornings, the homework, the chores, the forgotten gear, and turn it into practice for the skills your kid is actually missing. You build each system with your kid and then hand it over.',
        'The house runs on the system, not on you. And your kid finds out what they can do on their own.',
      ],
      forTitle: 'It’s for you if',
      forItems: [
        'You remind, re-remind, and then do it yourself.',
        'Mornings and homework only happen because you’re managing them.',
        'You want a kid who eventually doesn’t need your checklist.',
      ],
      getTitle: 'What you learn',
      getItems: [
        'How to see the skill underneath the eye roll',
        'How to build a plan with your kid and adjust it when it stops working',
        'A process you can use again on the next problem',
      ],
      showPrice: false,
      fine: 'Enrollment is closed right now. Join the waitlist and you’ll be the first to know when Autopilot opens again.',
      cta: 'Join the waitlist',
      href: '/autopilot/?utm_source=website&utm_medium=courses-page&utm_campaign=autopilot-waitlist',
    },
  ],

  choose: {
    eyebrow: 'Which one first?',
    headline: 'Start with the fight',
    headlineAccent: 'you’re having most.',
    rows: [
      {
        title: 'If the fights are about screens',
        body: 'Start with The Screen Reset. It’s one weekend, and you walk away with a written agreement.',
        cta: 'See The Screen Reset',
        href: '/screen-reset/?utm_source=website&utm_medium=courses-page&utm_campaign=screen-reset&utm_content=which-one',
      },
      {
        title: 'If you’re tired of being the reminder',
        body: 'That’s Autopilot. Mornings, homework and chores, handed back to your kid one system at a time.',
        cta: 'Join the Autopilot waitlist',
        href: '/autopilot/?utm_source=website&utm_medium=courses-page&utm_campaign=autopilot-waitlist&utm_content=which-one',
      },
      {
        title: 'If it’s both',
        body: 'Start with The Screen Reset. It’s open now and it’s short.',
        cta: 'See The Screen Reset',
        href: '/screen-reset/?utm_source=website&utm_medium=courses-page&utm_campaign=screen-reset&utm_content=which-one-both',
      },
    ],
  },

  approach: {
    eyebrow: 'How I teach',
    headline: 'Every course works the',
    headlineAccent: 'same way.',
    intro:
      'I spent 14 years getting middle schoolers to do hard things on their own. What worked in my classroom is what I teach parents.',
    points: [
      {
        title: 'You learn why before you learn what',
        body: 'Kids this age aren’t being difficult for fun. Something is going on in their brain, and once you can see it, you stop taking it personally. In The Screen Reset that’s variable reward: the pull of “the next thing might be even better” that games and apps are built on. In Autopilot it’s executive function: the planning, starting and remembering skills that are still under construction in middle school.',
      },
      {
        title: 'Your kid helps build it',
        body: 'Kids fight rules that get handed to them. They’re a lot more likely to keep ones they helped write. So every course has you sit down with your kid and build the plan together.',
      },
      {
        title: 'You leave with something written down',
        body: 'A family screen agreement. A morning system. Something concrete on the fridge that you can both point to when it gets hard.',
      },
      {
        title: 'It’s about your kid’s skills, not your control',
        body: 'The point is a kid who can do it without you. One who logs off on their own, gets out the door on their own, and knows why.',
      },
    ],
  },

  about: {
    eyebrow: 'Who’s teaching',
    headline: 'I’m Sean Kane.',
    paragraphs: [
      'I taught middle school for 14 years. Now I’m a dad of three boys in Austin, Texas, and we have these fights at my house too.',
      'Everything in these courses is something I’ve used in a classroom, at my own kitchen table, or both.',
    ],
    link: { label: 'More about Sean', href: '/about/' },
    photoAlt: 'Sean Kane',
  },

  // An answer written as { before, email, after } has a linked email address
  // in the middle. An answer with `link` ends with that link.
  faq: {
    headline: 'Questions about',
    headlineAccent: 'the courses.',
    items: [
      {
        q: 'Which course should I start with?',
        a: 'Start with the fight you’re having most. If it’s screens, The Screen Reset. If it’s reminders, mornings and homework, Autopilot. If it’s both, start with The Screen Reset, because it’s open now and takes one weekend.',
      },
      {
        q: 'How old should my kid be?',
        a: 'Both courses are built for parents of kids roughly 9 to 14: late elementary through middle school.',
      },
      {
        q: 'Does my kid have to take part?',
        a: 'Yes, and that’s the point. You do the first part on your own. Then you sit down with your kid and build the plan together. I show you how to start that conversation, and what to do when you hear “I don’t want to do this.”',
      },
      {
        q: 'Are the courses live or recorded?',
        a: 'The Screen Reset is fully recorded, so you watch on your own time. Autopilot is five 75-minute classes.',
      },
      {
        q: 'Where do I watch?',
        a: 'The courses are hosted on Kajabi, the course site we use. After you buy, you get an email with your login. It works on a phone, tablet or computer.',
      },
      {
        q: 'Is there a guarantee?',
        a: {
          before: 'Yes. The Screen Reset has a 14-day guarantee. Watch the lesson and build your agreement with your kid. If it didn’t help, email ',
          email: 'hello@growthmindsetparenting.com',
          after: ' within 14 days of buying and I’ll refund you in full.',
        },
      },
      {
        q: 'What if I’m not ready for a course?',
        a: 'Start with the free stuff. I send a letter to parents every Saturday, and the past ones are all here to read.',
        link: { label: 'Read the letters', href: '/writing/' },
      },
    ],
  },

  final: {
    headline: 'Pick one problem.',
    headlineAccent: 'Start this weekend.',
    body: 'The Screen Reset is open now. One weekend, you and your kid, and a screen agreement you both can keep.',
    cta: 'See The Screen Reset',
    href: '/screen-reset/?utm_source=website&utm_medium=courses-page&utm_campaign=screen-reset&utm_content=bottom',
  },
};
