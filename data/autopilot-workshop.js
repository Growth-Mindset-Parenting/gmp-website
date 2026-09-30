// Autopilot free workshop registration page (/workshop/) — all copy and
// business values live here. Copy is final from the design handoff
// "Autopilot Webinar" (2026-09-15); testimonials are verbatim, typos
// included, emoji removed — do not correct.
//
// The workshop runs twice (same content), on open Zoom links — no Zoom
// registration; everyone who signs up gets both links. `sessions` holds the
// times and links and feeds the thank-you page, the calendar invites and the
// popup hand-over. `eventDate` (nav pill, hero, closing note), the FAQ
// answer and the modal intro spell the times out in words — change all of
// them together. Nobody gets a bonus for attending live (Katie, 2026-09-29):
// never promise one.

export const WORKSHOP = {
  eventDate: 'Sun Oct 4, 6pm CT · Mon Oct 5, 12pm CT',
  copyright: '© 2026 Growth Mindset Parenting · growthmindsetparenting.com',
  legalLinks: [
    { label: 'Privacy policy', href: '/privacy/' },
    { label: 'Terms & conditions', href: '/terms/' },
  ],

  nav: { pill: 'Free live workshop' },

  hero: {
    eyebrow: 'Free live workshop for parents of middle schoolers',
    headline: 'From Reminders to',
    headlineAccent: 'Responsibility',
    dek: "Mornings, homework, chores, the dishwasher — you remember, you remind, they flip. In this workshop, I'll share how everyday demand turns into rupture and how we can look to education to build capacity and reduce strain.",
    cta: 'Save my seat',
    metaLine: 'Live Sun, Oct 4 at 6pm or Mon, Oct 5 at noon CT',
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
      { title: "What's actually going on with my kid", body: 'How rapid adolescent development in middle school collides with daily demand' },
      { title: "Why your reminders aren't working", body: 'How every reminder to unload the dishwasher makes it worse and leads to a fight' },
      { title: 'How teachers diagnose the gap', body: "Behavior is communication. You'll learn what educators see when learning breaks down and how they decide what to do about it." },
      { title: 'How to hand the job back', body: 'What high standards and high support really look like in our homes' },
    ],
  },

  who: {
    eyebrow: 'Who this is for',
    headline: 'Does any of this sound like',
    headlineAccent: 'your kitchen?',
    intro: "You're not in crisis. You just need a new lens, and a different tool.",
    cta: 'Yes! Sign me up',
    items: [
      { quote: "I say it six times every morning and we're still late.", body: "You're not a nag. You've become the household's working memory, and you never applied for the job. Reminders are a system that runs on you." },
      { quote: 'How can a kid this smart be this careless?', body: "Straight-A student, bedroom like a bomb went off. Skills don't develop evenly, and the ones that lag look a lot like a character flaw from the outside." },
      { quote: 'The smallest request gets the biggest reaction.', body: "People have quietly stopped asking anything of your kid because it isn't worth the blowup. You'd like to ask again without starting a war." },
      { quote: "I've tried connection and repair and endless conversation. The mornings didn't change.", body: "Regulation and repair matter. But if the same fight happens every morning, maybe the fight isn't the thing to fix. The system is." },
    ],
  },

  testimonials: {
    eyebrow: 'What parents are saying',
    headline: 'Real changes,',
    headlineAccent: 'in real houses.',
    intro: 'More than 350,000 parents follow Sean for what 14 years of teaching middle schoolers taught him: how to get kids to do hard things on their own. Here’s what happened when they tried it at home.',
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

  faq: {
    eyebrow: 'Questions',
    headline: 'Have questions?',
    headlineAccent: "I've got answers.",
    cta: "Let's do this",
    items: [
      { q: 'Is this actually live, or is it a recording?', a: "It's live. Twice. Once Sunday, October 4 at 6pm Central. And again on Monday, October 5 at 12PM Central. I know things for parents are chaotic. Just pick the time that works best for you. Come to either one." },
      { q: "I'm not sure this is really for me. Who is the workshop for?", a: "It's for parents of a kid who is in the middle- capable and kind, but can't manage the daily systems. Parents who are tired of being the system. You don't need a diagnosis, a partner who's on board, or a kid who's excited about any of this. You just need to be a little curious whether there's a better way than reminding louder. There is, and that's what we'll dig into." },
      { q: 'My kid has ADHD. Or I do. Is this still for us?', a: "Yes. Some of the most-liked questions on my videos aren't about kids at all. They're parents asking how to stick to routines when they have ADHD too. Every kid's planning brain is under construction until about 25, and kids with ADHD are further behind on the build. That means more scaffolding, not a lower bar. And for you, it means building a structure that doesn't depend on you remembering everything." },
      { q: "I've already read the parenting books. Will I actually learn anything new?", a: "Probably. Most parenting advice comes from psychologists and therapists, and a lot of it is great. I read it too. But I spent 14 years teaching kids 10 to 15, and educators know something that isn't being said in the research or on parent blogs. We know how to get a kid to finish the essay they just threw in the trash. Not with a better talk. With structure. And you'll get real examples of what that sounds like on a school morning, not just what it's called." },
      { q: "What if I can't make it live?", a: "Sign up anyway. You'll get the links for both times, and if neither one works, I'll send you the replay." },
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
    metaLine: 'Live Sun, Oct 4 at 6pm or Mon, Oct 5 at noon CT',
  },

  modal: {
    eyebrow: 'Free live workshop · Two live sessions',
    headline: "Your kid doesn't know it yet, but you just did",
    headlineAccent: 'something big',
    headlineAfter: 'for them.',
    intro: "That's what great teachers do: they plan ahead. Pop in your email, and I'll send you links for both sessions, so you can come to whichever fits. I'll remind you before we go live, too. You've got enough to remember.",
    smsPrint: 'By adding your number you agree to receive text reminders about this workshop from Growth Mindset Parenting. Msg & data rates may apply. Reply HELP for help, STOP to cancel.',
    smsLinks: [
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' },
    ],
  },

  // The form inside the modal posts to /api/workshop-register/, which adds
  // them to Kit. (Until 2026-09-29 it also registered them with Zoom; the
  // meetings are open links now.)
  form: {
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    // Optional. The placeholder carries the promise, so typing a number IS
    // the opt-in (no separate tick box — Katie's call, 2026-09-21). The
    // fine print under the form carries the rates/STOP notice the carriers
    // want to see when we register a texting number.
    phoneLabel: 'Mobile (optional)',
    phonePlaceholder: "I'll text you a reminder",
    button: 'Save my seat',
    buttonBusy: 'Saving your seat…',
    errorInvalid: 'That email doesn\u2019t look right. Mind checking it?',
    errorPhone: 'That number looks short. Ten digits, or leave it blank.',
    errorServer: 'Something went wrong on my end. Try that once more?',
  },

  // The two live sessions. Times are UTC (October is CDT, UTC-5); each runs
  // 60 minutes. The join links are the same for everyone (registration is
  // off in Zoom), so they are safe to show on the page and put in calendar
  // invites. The last session's end is when the site popup hands over to the
  // sales popup. Meeting IDs, passcodes and one-tap numbers were read from
  // Zoom on 2026-09-29; re-copy them if a meeting is ever recreated.
  sessions: [
    {
      key: 'sun',
      dateLine: 'Sunday, October 4',
      // The two-up card in the signup pop-up.
      shortDate: 'Sunday, Oct 4',
      shortTime: '6pm Central · 7pm Eastern',
      timeLine: '6:00 pm Central · 7:00 pm Eastern',
      startUtc: '2026-10-04T23:00:00Z',
      endUtc: '2026-10-05T00:00:00Z',
      joinUrl: 'https://us06web.zoom.us/j/89340579247?pwd=SfEsMXPb1WsSWZhC1PLlrsTbeB0k41.1',
      meetingId: '893 4057 9247',
      passcode: '685774',
      oneTapMobile: [
        '+16469313860,,89340579247#,,,,*685774#',
        '+13017158592,,89340579247#,,,,*685774#',
      ],
    },
    {
      key: 'mon',
      dateLine: 'Monday, October 5',
      shortDate: 'Monday, Oct 5',
      shortTime: 'Noon Central · 1pm Eastern',
      timeLine: '12:00 pm Central · 1:00 pm Eastern',
      startUtc: '2026-10-05T17:00:00Z',
      endUtc: '2026-10-05T18:00:00Z',
      joinUrl: 'https://us06web.zoom.us/j/86840949467?pwd=T9HLK2flEMZHYujQYROLefWQde9Cs2.1',
      meetingId: '868 4094 9467',
      passcode: '050190',
      oneTapMobile: [
        '+16469313860,,86840949467#,,,,*050190#',
        '+13017158592,,86840949467#,,,,*050190#',
      ],
    },
  ],

  // Shared by both calendar invites.
  calendar: {
    // Same as the Zoom meeting title.
    title: 'From Reminders to Responsibility: Free Live Workshop with Sean Kane',
    description: 'Same workshop both times. Come to whichever fits your week.',
    // Zoom's US dial-in numbers — the same list for both meetings.
    dialInNumbers: [
      '+1 646 931 3860', '+1 301 715 8592', '+1 305 224 1968', '+1 309 205 3325',
      '+1 312 626 6799', '+1 646 558 8656', '+1 386 347 5053', '+1 507 473 4847',
      '+1 564 217 2000', '+1 669 444 9171', '+1 669 900 6833', '+1 689 278 1000',
      '+1 719 359 4580', '+1 253 205 0468', '+1 253 215 8782', '+1 346 248 7799',
      '+1 360 209 5623',
    ],
  },

  // Thank-you page (/workshop/thank-you/). Copy and layout from the design
  // handoff "Autopilot Confirmation" (2026-09-15), in
  // Plans/2026-09-15-autopilot-confirmation-design-handoff/.
  thankYou: {
    eyebrow: "You're in",
    headline: "Here's to the kid who",
    headlineAccent: 'remembers on their own.',
    dek: "Your Zoom links are on their way to your inbox. Not there in ten minutes? Check promotions — that's where I usually end up.",
    sessionsIntro: 'Same workshop both times. Come to whichever fits your week.',
    join: 'Zoom link',
    calendarIntro: 'Add it to your calendar:',
    google: 'Google',
    apple: 'Apple',
    outlook: 'Outlook',
    inAppNote: 'Opened this inside Instagram or TikTok? Open it in Safari or Chrome to add it to Apple Calendar.',
    // Text-reminder box. Shown only to people who registered by clicking the
    // invite email's button (they never saw the form's phone field). Posts to
    // /api/workshop-register/, same as the form; the fine print is the form's
    // smsPrint, word for word.
    sms: {
      headline: 'Want a text before we go live?',
      intro: "Add your number and I'll text you a reminder.",
      emailLabel: 'Email',
      phoneLabel: 'Mobile',
      phonePlaceholder: '(512) 555-0123',
      button: 'Text me a reminder',
      buttonBusy: 'Saving…',
      done: "Got it. I'll text you a reminder. See you soon.",
      errorEmail: 'Pop in the email you signed up with.',
      errorPhone: 'That number looks short. Ten digits, please.',
      errorServer: 'Something went wrong on my end. Try that once more?',
    },
    signoff: '— Sean',
    copyright: '© 2026 Growth Mindset Parenting',
    siteLabel: 'growthmindsetparenting.com',
  },
};
