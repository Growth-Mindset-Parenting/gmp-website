// The Screen Reset sales page (/screen-reset/) — all copy, prices and checkout
// links live here, so a price or copy change is a content change, not a
// rebuild.
//
// Copy is verbatim from the approved-for-build Google Doc "The Screen Reset:
// Sales Page Copy" (read 2026-11-17), with curly quotes and apostrophes.
// Do not rewrite, add or cut copy here without Sean/Katie changing the doc.
// No testimonials (none exist yet). Never add seat-count language.
//
// THE PAGE HAS TWO STATES, picked by the clock (screenResetPriceAt in
// data/launch-schedule.js):
//   'sale'  $67, through the end of Mon Nov 30 2026 (Central)
//   'full'  $99, from Tue Dec 1 2026, no end date
// Any string that mentions "$67" or "November 30" is written as
// { sale: '…', full: '…' }. In the 'full' state there is no crossed-out
// price, no countdown, no "through Monday, November 30" line, and the
// "What happens to the price?" question is dropped. Everything else is the
// same in both states.

// Kajabi checkout links, one offer per price (created 2026-11-17):
//   $67 launch offer  YESaXwFZ  (Kajabi offer id 2151520627)
//   $99 full offer    azFWJN8F  (Kajabi offer id 2151520633)
// The page picks between them by the clock (checkoutFor below).
// The visitor's saved utm_* tags are added to these links on click by
// components/AttributionCapture.jsx.
export const CHECKOUT_SALE_URL = 'https://courses.growthmindsetparenting.com/offers/YESaXwFZ/checkout';
export const CHECKOUT_FULL_URL = 'https://courses.growthmindsetparenting.com/offers/azFWJN8F/checkout';

// What a not-yet-real checkout link looks like. Neither link above uses it
// any more; it stays so scripts/screen-reset-phase-check.mjs
// (--require-live-checkout) can keep catching one if a link is ever swapped
// out for a stand-in again.
export const CHECKOUT_PLACEHOLDER =
  'https://courses.growthmindsetparenting.com/offers/PLACEHOLDER-SCREEN-RESET/checkout';

export const PRICES = {
  // Numbers for analytics (GA4 begin_checkout value).
  saleValue: 67,
  fullValue: 99,
  // Display strings.
  sale: '$67',
  full: '$99',
};

// The product name sent to analytics with every buy-button click.
export const ITEM_NAME = 'The Screen Reset';

// Everything the buy buttons need for a given price state.
export function checkoutFor(phase) {
  return phase === 'full'
    ? { url: CHECKOUT_FULL_URL, value: PRICES.fullValue }
    : { url: CHECKOUT_SALE_URL, value: PRICES.saleValue };
}

// Picks the right version of a string that differs between the two states.
// Plain strings pass straight through.
export function forPhase(value, phase) {
  if (value && typeof value === 'object' && 'sale' in value && 'full' in value) {
    return phase === 'full' ? value.full : value.sale;
  }
  return value;
}

// In headlines, `headlineAccent` is the phrase set in italic serif (the same
// treatment as the Autopilot sales page). Read `headline` + `headlineAccent`
// together for the full line from the doc.
export const SCREEN_RESET = {
  logoAlt: 'Growth Mindset Parenting',
  cta: 'Get The Screen Reset',

  // 1. Top of page
  hero: {
    eyebrow: 'A weekend course for parents of kids 9 to 14',
    headline: 'Screens should be part of your kid’s life.',
    headlineAccent: 'Not all of it.',
    subtitle:
      'Stop negotiating and fighting over devices. In one weekend, sit down with your kid and build a screen agreement they helped write and can actually keep.',
    support: 'Because the goal is a kid who can put it down on their own, even when you’re not in the room.',
    priceLine: {
      // Sale state: the page shows $99 crossed out, then $67, then this line.
      sale: 'Black Friday price. Ends Monday, November 30.',
      // Not in the doc (the doc only has the sale line): the price, plus
      // "One payment." from the doc's price note.
      full: '$99. One payment.',
    },
    fine: 'Finish it in one weekend · Watch on your own time · 14-day guarantee',
    photoAlt: 'Sean Kane',
    // Sale state only. Counts to SCREEN_RESET_SALE_ENDS in
    // data/launch-schedule.js and vanishes when it passes.
    countdown: {
      title: 'The Black Friday price ends in',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Min',
      seconds: 'Sec',
    },
  },

  // 2. If this is your house
  house: {
    eyebrow: 'If this is your house',
    headline: '“Wait.” “Hold on.” “One more thing.”',
    paragraphs: [
      'It rained for like 16 hours the other day. I have 3 boys under 12.',
      'By 4:30, we were trapped in a screen vortex. My oldest was doing “one more thing” on his iPad. My wife gave three, four different reminders. “Hey, put that down, please.” All she got back was “wait” and “Mom, hold on.”',
      'Eventually, after a series of hollow threats, reminders and escalations, he tossed the iPad and walked away. Searching the pantry for Halloween candy.',
    ],
    rowsLead: 'Maybe your version looks like this:',
    rows: [
      { title: 'The fight at shutoff.', body: 'Every “time’s up” turns into a negotiation. Then a meltdown.' },
      { title: 'The sneaking.', body: 'The tablet that was supposed to be charging in the kitchen. The “I wasn’t even on it.”' },
      { title: 'The spiral.', body: 'Roblox. Xbox. The group chat. One more round turns into the whole afternoon.' },
      { title: 'The boredom.', body: 'Anything that isn’t a screen is boring now. Including you.' },
      { title: 'Your own phone.', body: 'You’re on it more than you want to be, and your kid has noticed.' },
    ],
    closing:
      'You already know screens are a problem. Nobody has to convince you. What nobody has shown you is how to get a kid who doesn’t want to change on the same page.',
  },

  // 3. What's actually happening
  happening: {
    headline: 'Your kid isn’t the problem.',
    headlineAccent: 'They’re the target.',
    paragraphs: [
      'That afternoon had nothing to do with my wife, me, or him. We have solid screen systems. But in that moment the rules weren’t in control. Variable reward was.',
      'My son was trying to finish one more round of his game, seeing if he’d earned enough points for some reward, and checking the group chat one more time for memes. He wasn’t fighting with my wife. They were both fighting a reward pathway in his brain that says “the next thing might be even better.”',
      'These games and apps are built by very smart people whose whole job is to keep your kid on them. More time on the screen is the business.',
      'And then we leave the screens out on the table and count on a kid’s lousy impulse control, plus a stream of threats and reminders, to do the rest. We’re basically asking our kids to do the marshmallow test, every single day.',
      'That’s a design problem. And you can redesign it.',
      'The answer for the Halloween candy is throw it in the trash. But that really isn’t the answer for the PlayStation. The answer is working together to design agreements, routines and systems that help your kid feel in control of the screen, instead of the other way around.',
    ],
  },

  // 4. Introducing The Screen Reset
  intro: {
    stamp: 'Introducing',
    name: 'The Screen Reset',
    tagline: 'Give screens a container.',
    paragraphs: [
      'The Screen Reset is a self-paced course for parents of kids 9 to 14. You can finish it in one weekend.',
      'First you get clear on what screens are doing in your kid’s brain and where the real risks start. Then you sit down with your kid and build a family agreement together, one that says how screens will and won’t be used in your house.',
      'This is not a ban. The phone stays in the pocket. The tablet stays in the house. The console can still go under the tree. Screens get a container, so they’re part of family life and not the thing running it.',
    ],
    wallsLead: 'The container has four walls:',
    walls: [
      { title: 'Where', body: 'Where do we use screens? Bedrooms, the car, the dinner table.' },
      { title: 'When', body: 'When do we use them? School nights, weekends, before bed.' },
      { title: 'What', body: 'What are we doing on them? Which games and apps, and what they’re for.' },
      { title: 'Who and how', body: 'How do we treat people online? And who gets our attention when we’re in the same room?' },
    ],
    note: 'One weekend · Watch on your own time · 14-day guarantee',
  },

  // 5. What's inside
  inside: {
    eyebrow: 'What’s inside',
    headline: 'One lesson, two parts.',
    headlineAccent: 'Understand it, then do it.',
    parts: [
      {
        label: 'Part 1',
        title: 'Understand',
        intro:
          'You go from a vague “screens are bad” to knowing exactly what you’re dealing with, so you can explain it to your kid without a lecture.',
        rows: [
          {
            title: 'How the screen business works',
            body: 'Every app has one goal, which is more of your kid’s time. Their attention is what’s being sold.',
          },
          {
            title: 'Dopamine, explained correctly',
            body: 'It isn’t the pleasure chemical. It’s the seeking chemical. It’s what makes us go get more, and screens are very good at pulling that lever.',
          },
          {
            title: 'What the research actually says',
            body: 'How much is too much, and where real harm starts. I pull the pediatric and psychology research into clear guidelines you can trust and explain.',
          },
        ],
      },
      {
        label: 'Part 2',
        title: 'Implement',
        intro:
          'This is the hard part, and it’s why this course exists. You sit down with your kid and build an agreement that holds.',
        rows: [
          {
            title: 'Get on the same page',
            body: 'Your kid learns what you just learned, through videos and explainers I’ve picked out for kids. Information they’re given, not a lecture they sit through.',
          },
          {
            title: 'Take inventory',
            body: 'Look at the real screen-time numbers together. Theirs and yours. The conversation starts from facts, not feelings.',
          },
          {
            title: 'Solve it together',
            body: 'You agree on what the problem is, then work it out with your kid’s input. Including what to do when you hear “I don’t want to do this.”',
          },
          {
            title: 'Write the agreement',
            body: 'One written family agreement that covers all four walls. Concrete, specific, and signed off by the kid who has to live with it.',
          },
          {
            title: 'Tools that help everyone keep it',
            body: 'Timers, schedules and where devices live. The settings already built into your devices. And for some families, a break from a device or a swap to a simpler one.',
          },
        ],
      },
    ],
    also: {
      title: 'Also included',
      items: [
        '4 podcast episodes that go deeper',
        'The family agreement template',
        'A screen-time inventory worksheet',
        'A list of videos to watch with your kid',
        'A guide to the tools',
      ],
    },
  },

  // 6. How the weekend goes
  weekend: {
    eyebrow: 'One weekend',
    headline: 'Start Saturday.',
    headlineAccent: 'Have an agreement by Sunday night.',
    steps: [
      { title: 'Saturday, on your own', body: 'Watch Part 1. Get clear on what you’re dealing with.' },
      { title: 'Saturday, with your kid', body: 'Watch one of the videos together. Pull up the screen-time numbers.' },
      { title: 'Sunday, at the table', body: 'Work through the problem together and write your agreement.' },
      { title: 'Monday', body: 'The agreement starts. So does the practice.' },
    ],
    closing: 'Can’t do it in one weekend? It’s all recorded. Go at your own pace.',
  },

  // 7. Is this for you?
  fit: {
    eyebrow: 'Is this for you?',
    headline: 'The Screen Reset is for you if…',
    items: [
      'Your kid is somewhere between 9 and 14.',
      'The fights are about a phone, a tablet, Roblox, Minecraft, Xbox, PlayStation, or all of them.',
      'You’ve set limits and taken devices away, and none of it has stuck.',
      'You want your kid to have a real say, because you know a rule they helped write is a rule they’re more likely to keep.',
      'You’re willing to look at your own phone too.',
    ],
    notHeadline: 'It’s not for you if…',
    notItems: [
      'You want a plan to remove every screen from your house. This is about containing screens, not banning them.',
      'You want an app to handle it for you. We cover the tools, but the agreement with your kid is the work.',
      'You need a program on online predators. I name that risk, but this course doesn’t teach prevention.',
    ],
  },

  // 8. What changes
  changes: {
    headline: 'A kid who can put it down.',
    paragraphs: [
      'Your kid might still say “wait, one minute.” But right after that, we want a kid who says “okay, sorry, done.”',
      'That’s the muscle we’re building. The logging-off muscle has to get just as strong as the one that taught them to pick it up.',
      'And here’s the long game. One day your kid will have a phone with no limits and nobody checking. College. A first job. Their own apartment. The point of doing this now is a kid who knows the warning signs and has already practiced what to do about them.',
    ],
  },

  // 9. About Sean
  about: {
    eyebrow: 'Who’s teaching this',
    headline: 'I’m Sean Kane.',
    paragraphs: [
      'I taught middle school for 14 years. Now I’m a dad of three boys in Austin, Texas, and we have this fight at my house too.',
      'My kids told me once, “Dad, you know we’re like the worst gamers in the grade, right?” I felt bad. I apologized, straight up. And they said, “Dad, for real, it’s no big deal. We get it. We know why.”',
      'That’s what I want for your house. Not kids who love the rules. Kids who know why.',
    ],
    photoAlt: 'Sean Kane speaking on stage',
    photoCaption: 'Sean Kane · Austin, TX',
  },

  // 10. Price and guarantee
  pricing: {
    eyebrow: 'Get started',
    headline: 'The Screen Reset',
    // The big number on the card.
    price: { sale: PRICES.sale, full: PRICES.full },
    // Crossed out next to the price. Sale state only.
    anchor: { sale: PRICES.full, full: null },
    note: {
      sale: 'Black Friday price through Monday, November 30. $99 after that. One payment.',
      full: 'One payment.',
    },
    checklist: [
      'The full lesson, Part 1 and Part 2',
      '4 podcast episodes',
      'The family agreement template',
      'The screen-time inventory worksheet',
      'The list of videos to watch with your kid',
      'The tools guide',
    ],
    fine: 'Secure checkout · 14-day guarantee',
  },

  // The email address in the middle is a link.
  guarantee: {
    heading: 'Backed by a 14-day guarantee',
    before: 'Watch the lesson and sit down with your kid to build your agreement. If you’ve done that and it didn’t help, email ',
    email: 'hello@growthmindsetparenting.com',
    after: ' within 14 days of buying, tell me what you tried, and I’ll refund you in full.',
  },

  // 11. Questions. The first one starts open. An answer written as
  // { before, email, after } has a linked email address in the middle.
  // `saleOnly: true` drops the question once the price is $99.
  faq: {
    headline: 'Have questions?',
    headlineAccent: 'I’ve got answers.',
    items: [
      { q: 'How old should my kid be?', a: 'It’s built for parents of kids 9 to 14. It works from about 8 up to 16.' },
      {
        q: 'What if my kid refuses?',
        a: 'Expect some of that. Part 2 covers what to do when you hear “I don’t want to do this.” Kids fight rules that get handed to them. They’re a lot more likely to keep ones they helped write.',
      },
      {
        q: 'Is this just about phones?',
        a: 'No. It covers smartphones, tablets, Roblox and Minecraft, Xbox and PlayStation, PC gaming, and streaming on their own device.',
      },
      {
        q: 'Do I have to take everything away?',
        a: 'No. The goal is to contain screens, not remove them. For some kids a break from a device helps, and I’ll walk you through how to do that. It’s your call.',
      },
      {
        q: 'How long does it take?',
        a: 'It’s built to finish in one weekend. Everything is recorded, so you watch when it works for you.',
      },
      {
        q: 'Does this cover my own screen time?',
        a: 'Yes. Your phone is part of the agreement too. Kids notice.',
      },
      {
        q: 'What happens to the price?',
        a: 'It’s $67 for Black Friday, through Monday, November 30. After that it goes back to $99.',
        saleOnly: true,
      },
      {
        q: 'What if it doesn’t work for us?',
        a: {
          before: 'Watch the lesson and build your agreement with your kid. If it didn’t help, email ',
          email: 'hello@growthmindsetparenting.com',
          after: ' within 14 days of buying and I’ll refund you in full.',
        },
      },
    ],
  },

  // 12. Bottom of page
  final: {
    headline: 'One weekend.',
    headlineAccent: 'A reset that lasts.',
    body: 'We have to help our kids learn to make screens part of their life, not all of their life. Start this weekend.',
    fine: {
      // Sale state: the page shows $99 crossed out and $67 in front of this.
      sale: 'Black Friday price through Monday, November 30 · 14-day guarantee',
      full: '14-day guarantee',
    },
  },

  footer: {
    copyright: '© 2026 Growth Mindset Parenting',
    links: [
      { label: 'Privacy policy', href: '/privacy/' },
      { label: 'Terms & conditions', href: '/terms/' },
    ],
  },
};

// /screen-reset/thank-you/ — where Kajabi sends a buyer after checkout.
// Copy source: Google Doc "Screen Time | Email Series", tab "Thank-You Page".
// The email subject lines below are the real Kajabi ones (site-wide
// templates). If those change in Kajabi, change them here.
export const THANK_YOU = {
  logoAlt: 'Growth Mindset Parenting',
  headline: 'You’re in.',
  headlineAccent: 'Good call.',
  intro: 'Your course is ready. Here’s how to get to it.',
  stepsTitle: 'What happens next',
  steps: [
    {
      title: 'Check your email',
      body: 'Two emails are on their way to the address you used at checkout: your receipt, and one called “Your Growth Mindset Parenting login is inside.” Give them a few minutes.',
    },
    {
      title: 'Open the login email and set your password',
      body: 'The course lives on Kajabi, the site we use to host our courses. So the login page and the emails may say “Kajabi” on them. That’s us, and it’s safe to click.',
    },
    {
      title: 'Start with Part 1',
      body: 'Watch it on your own first, on your phone, tablet or computer. Then you’ll be ready to sit down with your kid.',
    },
  ],
  loginLead: 'Already set your password?',
  login: { label: 'Log in to your course', href: 'https://courses.growthmindsetparenting.com/login' },
  helpTitle: 'Don’t see the email?',
  helpItems: [
    'Check your spam and promotions folders.',
    'Search your inbox for “Growth Mindset Parenting.”',
    'Have more than one email address? Check the other inbox too.',
  ],
  // The email address in the middle is a link.
  helpContact: {
    before: 'Still nothing after 15 minutes? Email ',
    email: 'hello@growthmindsetparenting.com',
    after: ' and we’ll get you in.',
  },
  second: 'This weekend you and your kid are going to build something together. I’m glad you’re doing it.',
  signature: 'Sean',
  copyright: '© 2026 Growth Mindset Parenting',
};
