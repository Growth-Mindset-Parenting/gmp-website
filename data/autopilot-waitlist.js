// Autopilot waitlist page — all copy and business values live here, so
// swapping the page's launch state (waitlist → sales page → round-2 waitlist)
// is a content change, not a rebuild. Copy is final from the design handoff
// (2026-09-14); testimonials are verbatim, typos included — do not correct.

export const WAITLIST = {
  // Stated on the page as "More than X parents follow Sean". Verify against
  // live platform counts before changing.
  followerCount: '350,000',

  stamp: 'Autopilot',
  contactEmail: 'hello@growthmindsetparenting.com',
  instagramUrl: 'https://www.instagram.com/growth.mindset.parenting/',
  copyright: '© 2026 Growth Mindset Parenting · Sean Kane',

  hero: {
    eyebrow: 'A 5-week live course · Starts October',
    headline: 'Less reminding. Less managing.',
    headlineAccent: 'More capable kids.',
    subtitle:
      'Autopilot is a 5-week live course for parents of kids roughly 9–14, taught by Sean Kane. It teaches responsibility as a set of skills — at your kitchen table, with your kid.',
    photoCaption: 'Sean Kane · Austin, TX',
  },

  what: {
    eyebrow: 'What Autopilot does',
    headline: 'The house runs on the system,',
    headlineAccent: 'not on you.',
    paragraphs: [
      'Autopilot teaches parents to turn the daily friction — mornings, homework, chores, forgotten gear — into practice for the skills their kid is actually missing.',
      "You build each system with your kid and then hand it over, so the house runs on the system instead of on you, and what's left between you is a relationship instead of a to-do list.",
    ],
    benefits: [
      {
        title: "You'll finally see what's going on, and what to do about it.",
        body: "Right now you're asking \"What am I doing wrong?\" Honestly? You're probably doing too much. You've become the brain for the whole house, and nobody ever showed you how to hand that job back. You'll learn to see the skill underneath the eye roll, build a plan with your kid, and adjust it when it stops working. And you'll have a process you can use again next time.",
      },
      {
        title: 'Your kid will learn to run their own morning.',
        body: "The goal isn't a middle schooler who follows your checklist forever. It's one who eventually doesn't need it. First the morning. Then homework. Then chores. And you stop being the only brain in the house.",
      },
      {
        title: "You'll get your kid back.",
        body: "When you're fighting less about the clock, the homework and the dishwasher, there's room for the good stuff again: their music, their friends, the show you both like. Less time managing each other. More time enjoying each other.",
      },
    ],
  },

  testimonials: {
    eyebrow: 'What parents are saying',
    headline: 'Real changes,',
    headlineAccent: 'in real houses.',
    showMore: 'Show more stories',
    // {count} is replaced with followerCount, styled as emphasis.
    subhead:
      "More than {count} parents follow Sean for what 14 years of teaching middle schoolers taught him: how to get kids to do hard things on their own. Here's what happened when they tried it at home.",
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

  closing: {
    eyebrow: 'Autopilot · Starts October',
    headline: 'Stop being the only brain',
    headlineAccent: 'in the house.',
    note: 'Join the waitlist for first invite to the free live workshop and early access before doors open.',
  },

  form: {
    button: 'Join the waitlist',
    buttonBusy: 'Joining…',
    placeholder: 'you@yourkitchen.com',
    errorInvalid: 'That email doesn’t look right. Check it and try again.',
    errorServer: 'Something went wrong on our end. Your email is still here — try again in a moment.',
  },

  confirmation: {
    eyebrow: "You're on the list",
    headline: 'Good. Now go',
    headlineAccent: 'check your email.',
    // {email} is replaced with the submitted address, styled as emphasis.
    body: "A short note from Sean is on its way to {email}. If it isn't there in a few minutes, check the promotions or spam folder and drag it over.",
    steps: [
      "You'll get the first invite to the free live workshop.",
      'Early access to Autopilot before doors open in October.',
    ],
    instagramStep: 'Until then, Sean posts most days.',
    instagramLink: 'Follow along on Instagram →',
  },
};
