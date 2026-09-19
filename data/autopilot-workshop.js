// Autopilot free workshop registration page (/workshop/) — all copy and
// business values live here. Copy is final from the design handoff
// "Autopilot Webinar" (2026-09-15); testimonials are verbatim, typos
// included, emoji removed — do not correct.
//
// The workshop date appears in several places. `eventDate` feeds the nav
// pill, hero and closing note; the FAQ answer, the modal intro and the
// thank-you page spell the date out in a sentence, and `event` holds the
// calendar times — change all of them together.

export const WORKSHOP = {
  eventDate: 'Wednesday, October 7 · 6:00 pm CT',
  copyright: '© 2026 Growth Mindset Parenting · growthmindsetparenting.com',
  legalLinks: [
    { label: 'Privacy policy', href: '/privacy/' },
    { label: 'Terms & conditions', href: '/terms/' },
  ],

  nav: { pill: 'Free live workshop' },

  hero: {
    eyebrow: 'Free live workshop for parents of middle schoolers',
    headline: "Stop being your kid's",
    headlineAccent: 'prefrontal cortex.',
    dek: "Mornings, homework, chores, the dishwasher — you remember it, you remind about it, you check again. In this free workshop I'll show you the classroom method for handing that load back to your kid, one system at a time.",
    cta: 'Save my seat',
    meta: '60 minutes · Live',
    photoCaption: 'Sean Kane · 14 years in the classroom',
  },

  ticker: [
    'While brains develop, systems bridge the gap',
    'High expectations. High support.',
    'Behavior is communication, failure is feedback',
    'Less mutual management. More room for relationship.',
    'Kids become responsible by succeeding, not by being reminded',
  ],

  learn: {
    eyebrow: 'In this free workshop',
    headline: "You'll learn how to",
    headlineAccent: 'teach independence',
    headlineAfter: 'instead of demanding it.',
    items: [
      { title: 'What executive function actually is', body: "The eleven skills your kid's prefrontal cortex is still building, when each one comes online, and why we keep mislabeling a skill gap as laziness or disrespect." },
      { title: "Why your reminders aren't working", body: "When a parent carries the remembering, the kid never has to. The cycle that turns 'unload the dishwasher' into 'why are you always on my case.'" },
      { title: 'How teachers diagnose the gap', body: "Behavior is communication. You'll learn the classroom move for spotting where a routine breaks down before you decide what to do about it." },
      { title: 'How to hand the job back', body: 'One recurring problem in your house, turned into a system your kid can run. Firm standard, first-draft strategy, and a plan for stepping away.' },
    ],
  },

  who: {
    eyebrow: 'Who this is for',
    headline: 'Does any of this sound like',
    headlineAccent: 'your kitchen?',
    intro: "You're not in crisis. You're just always behind, and the same argument keeps showing up on schedule.",
    cta: 'Yes! Sign me up',
    items: [
      { quote: "I say it six times every morning and we're still late.", body: "You're not a nag. You've become the household's working memory, and you never applied for the job. Reminders are a system that runs on you." },
      { quote: 'How can a kid this smart be this careless?', body: "Straight-A student, bedroom like a bomb went off. Skills don't develop evenly, and the ones that lag look a lot like a character flaw from the outside." },
      { quote: 'The smallest request gets the biggest reaction.', body: "People have quietly stopped asking anything of your kid because it isn't worth the blowup. You'd like to ask again without starting a war." },
      { quote: "I've read the gentle parenting books. The mornings didn't change.", body: "Regulation and repair matter. But if the same fight happens every morning, maybe the fight isn't the thing to fix. The morning is." },
    ],
  },

  testimonials: {
    eyebrow: 'What other parents are saying',
    headline: 'Straight from the comments,',
    headlineAccent: 'no editing.',
    intro: 'Parents, teachers and therapists who found the videos first. Pulled from Instagram, spelling and all.',
    // Instagram comments, verbatim. Likes as shown in the design handoff.
    comments: [
      { handle: 'amra_blesing', likes: 13, text: "My son just started first year of middle school. And I don't know what would have happened if I didn't have your videos. Thanks (and from him as well) :)." },
      { handle: 'brendachaidezdiaz', likes: 0, text: "This really works. After many many months struggling with my now 14 year old, this has finally made a huge difference. Still a long way to go but no more struggles with wake ups or homework, still always a few minutes late to practice and a bit of stalling before bed time but it is a lot better. Why didn't I find this 2years ago!" },
      { handle: 'mahvelous_o', likes: 0, text: 'OMG!!!!!! My daughter has ADHD and I tried this tactic with her…it Works!!!! Thanks for suggestion!' },
      { handle: 'cringe4less', likes: 1, text: "First damn parenting voice on insta that's just made sense to me. Thank you for what you're doing, brother. And I say that as a licensed clinical therapist, with three kids of my own, and years of training on child development, parenting and co-regulation.. and you're teaching me with every video. Thank you thank you thank you." },
      { handle: 'earcandybyshea', likes: 2, text: "You are the first person I've ever heard that has actually sounded like you understand what we're going through and given some clear and concise points to help get through the day. Thank you!!!" },
      { handle: 'ravenmb', likes: 1, text: 'School started two weeks ago, but we implemented the to do list (you suggested in a different video) starting a few days before school. It has gone splendidly about 93% of the time (one day they fell back asleep and I had no clue, oops). Anyway, just here to say this works and I am thankful for your advice!' },
      { handle: 'sarahmwalsh53', likes: 2, text: 'Retired Lifetime clinical social worker here. You have a remarkable way of communicating complex concepts in such a warm and respectful manner. You have a gift.' },
      { handle: 'morganbrandonmiller', likes: 6, text: "Your content is some of the best on the internet that I've found. I'm a parent of two neurodivergent kids 12 and 8 and you're changing my life and theirs. Thank you." },
      { handle: 'paigemaddex', likes: 4, text: "I am therapist with a small private practice in northwest indiana. i can't thank you enough for these reels. As a parent of four, it is changing my parenting style — as a therapist, it's helping me coach others." },
      { handle: 'chalksfire', likes: 11, text: "I'm near tears in gratitude for finding this account today. Thank you for your thoughtful preparation of these videos- I know I am not the only ADHD mom who spends at least one small portion of every day feeling helpless, hopeless and desperately sad for how hard my kid's life seems like it's going to be. Your evidence based and actionable advice is so comforting. Thank you!!" },
    ],
  },

  bonus: {
    stamp: 'Show up live',
    headline: 'Attend live and take home',
    headlineAccent: 'the Sunday meeting agenda.',
    paragraphs: [
      "Twenty-five minutes, once a week, four agenda items: what worked, what didn't, what's coming, who needs what. Stolen verbatim from a faculty meeting. It's the one ritual that keeps every other system in our house honest.",
      "You get the printable agenda plus my notes on running it with kids who'd rather be anywhere else. Live attendees only — the replay won't include it.",
    ],
    cta: 'Save my spot',
    cardEyebrow: 'The Sunday meeting · 25 min',
    agenda: ['What worked', "What didn't", "What's coming", 'Who needs what'],
  },

  faq: {
    eyebrow: 'Questions',
    headline: 'Have questions?',
    headlineAccent: "I've got answers.",
    cta: "Let's do this",
    items: [
      { q: 'Is this actually live, or is it a recording?', a: "It's live. That's me, in real time, on Wednesday, October 7 at 6pm Central (7pm Eastern). Not a recording with a \"live\" badge slapped on it. And bring your questions. The real ones. The \"what do I do when he says 'I got it' and then doesn't\" ones. I'll answer as many as I can." },
      { q: "I'm not sure this is really for me. Who is the workshop for?", a: "It's for parents of middle schoolers, and kids about to get there, who are tired of being the reminder system for the whole house. You don't need a diagnosis, a partner who's on board, or a kid who's excited about any of this. You just need to be a little curious whether there's a better way than reminding louder. There is, and that's what we'll dig into." },
      { q: 'My kid has ADHD. Or I do. Is this still for us?', a: "Yes. Some of the most-liked questions on my videos aren't about kids at all. They're parents asking how to stick to routines when they have ADHD too. Every kid's planning brain is under construction until about 25, and kids with ADHD are further behind on the build. That means more scaffolding, not a lower bar. And for you, it means building a structure that doesn't depend on you remembering everything." },
      { q: "I've already read the parenting books. Will I actually learn anything new?", a: "Probably. Most parenting advice comes from psychologists and therapists, and a lot of it is great. I read it too. But I spent 14 years teaching kids 10 to 15, and educators know something that isn't being said in the research or on parent blogs. We know how to get a kid to finish the essay they just threw in the trash. Not with a better talk. With structure. And you'll get real examples of what that sounds like on a school morning, not just what it's called." },
      { q: "What if I can't make it live?", a: "Sign up anyway and I'll send you the replay. But the parents who show up live get one extra thing: my free Sunday night meeting agenda. It's a simple plan for sitting down with your kid on Sunday night to map out the week, so the hard stuff doesn't sneak up on anybody. It's only for people who are there live." },
      { q: 'Wait, is this really free?', a: "Really free. At the end, I'll tell you about Autopilot, my five-week course, for anyone who wants to go further. If that's not for you, no hard feelings. You'll still leave with things you can try in your house this week." },
    ],
  },

  note: {
    eyebrow: 'A note from Sean',
    headline: 'I taught middle school for 14 years.',
    headlineAccent: 'Then I had three sons.',
    photoCaption: 'Sean Kane · Austin, TX',
    // {emphasis} is replaced with `emphasis`, styled as inline emphasis.
    paragraphs: [
      "I know why you're here. I've been yelled at by a kid I was trying to help. I've watched a kid fall apart over a basic request and wondered, what is his problem? And then — good grief, what is my problem?",
      "Think about your favorite teacher. Not the easy one. The one who made you feel seen, capable and respected, and who still expected something from you every single day. You never saw the lesson plans. It wasn't magic. It was {emphasis}, prepared on purpose.",
      "I spent 14 years in the classroom learning how that works. I've spent the last few learning how to bring it home. Sixty minutes won't fix your mornings, but it will show you where to look — and I think that's the part nobody ever showed you.",
      'See you there.',
    ],
    emphasis: 'environment, development and collaboration',
    cta: 'Save my seat',
    meta: 'Free',
  },

  modal: {
    eyebrow: 'Free live workshop · Wednesday, October 7 · 6:00 pm',
    headline: "Your kid doesn't know it yet, but you just did",
    headlineAccent: 'something big',
    headlineAfter: 'for them.',
    intro: "That's what great teachers do: they plan ahead. Pop in your name and email, and I'll send your link for Wednesday, October 7 at 6pm Central (7pm Eastern). I'll remind you before we go live, too. You've got enough to remember.",
    smallPrint: "Come live and you'll get my free Sunday night meeting agenda.",
  },

  // The form inside the modal posts to /api/workshop-register/, which
  // registers the person with Zoom (meeting ZOOM_WORKSHOP_MEETING_ID) and
  // adds them to Kit. Replaced the EasyWebinar widget on 2026-09-19.
  form: {
    nameLabel: 'First name',
    namePlaceholder: 'First name',
    emailLabel: 'Email address',
    emailPlaceholder: 'Email address',
    button: 'Save my seat',
    buttonBusy: 'Saving your seat…',
    errorName: 'Pop your first name in so I know who I\u2019m talking to.',
    errorInvalid: 'That email doesn\u2019t look right. Mind checking it?',
    errorServer: 'Something went wrong on my end. Try that once more?',
  },

  // Calendar buttons on the thank-you page. Times are UTC:
  // 6:00 pm CDT on Wed Oct 7 = 23:00 UTC; the workshop runs 60 minutes.
  event: {
    startUtc: '2026-10-07T23:00:00Z',
    endUtc: '2026-10-08T00:00:00Z',
    calendarTitle: 'Autopilot free live workshop with Sean Kane',
    calendarDescription: 'Show up live and get the Sunday meeting agenda.',
  },

  // Thank-you page (/workshop/thank-you/).
  // Thank-you page (/workshop/thank-you/). Copy and layout from the design
  // handoff "Autopilot Confirmation" (2026-09-15), in
  // Plans/2026-09-15-autopilot-confirmation-design-handoff/.
  thankYou: {
    eyebrow: "You're in",
    headline: "You're on the list.",
    headlineAccent: 'See you Wednesday.',
    dek: "Your link is on its way to your inbox right now. If it isn't there in ten minutes, check promotions — that's where I usually end up.",
    // Shown when this page has no personal link to work with (a reload in a
    // new tab, private browsing, or a hiccup registering with Zoom).
    dekNoLink: "Check your inbox for your link. If it isn't there in ten minutes, check promotions — that's where I usually end up — or just reply and I'll send it again.",
    dateLine: 'Wednesday, October 7',
    timeLine: '6:00 pm Central · 7:00 pm Eastern',
    calendarIntro: 'Add it to your calendar. Your link is saved in the event.',
    calendarIntroNoLink: 'Add it to your calendar. Your link is in your email.',
    google: 'Google Calendar',
    apple: 'Apple Calendar',
    outlook: 'Outlook',
    inAppNote: 'Opened this inside Instagram or TikTok? Open it in Safari or Chrome to add it to Apple Calendar.',
    // {emphasis} is replaced with `bonusEmphasis`, styled as accent.
    bonus: "Come live and I'll hand you my {emphasis}. The replay doesn't include it.",
    bonusEmphasis: 'Sunday meeting agenda',
    signoff: '— Sean',
    copyright: '© 2026 Growth Mindset Parenting',
    siteLabel: 'growthmindsetparenting.com',
  },
};
