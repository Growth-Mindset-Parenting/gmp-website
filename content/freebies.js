// content/freebies.js

// Kit form IDs — one form per freebie; the form's automation emails the PDF.
// release-replay-repair-return: Kit form doesn't exist yet — created in Task 9.
// Until its real ID is pasted in, the subscribe API rejects that slug (by design;
// never silently subscribe someone to the wrong guide).
export const FREEBIES = {
  '4s-flowchart': {
    slug: '4s-flowchart',
    kitFormId: '9609498',
    title: 'The 4S Flowchart',
    heroHeadline: 'Your kid actually talks to you on the car ride home.',
    heroHeadlineItalic: 'car ride home',
    heroSubhead: 'Most middle school parents haven\'t had that conversation in months. This free, eight-page guide is the four-move sequence that makes it happen. Use it tonight.',
    microCopy: 'Free. Part of a 250K community and counting. No spam — I read every reply.',
    microCopyBold: '250K',
    painPoints: [
      '“Every answer is a groan, an eye-roll, or ‘broooo.’”',
      '“I’m stuck between snapping at them and just handing over the iPad.”',
      '“Every feeling turns into a fight — or a lecture I didn’t mean to give.”',
      '“‘You’re fine’ keeps falling out of my mouth — and I hate it.”',
    ],
    painPointsCloser: '…then this guide was written for you.',
    painPointsCloserItalic: 'you',
    outcomesHeading: 'What changes at your kitchen table.',
    outcomesHeadingItalic: null,
    outcomes: [
      { title: 'Real conversations, not one-word answers', description: 'Your kid starts telling you what’s actually going on, instead of “fine” and a shrug.' },
      { title: 'Fewer standoffs after school', description: 'Big feelings stop spiralling into a fight — or a lecture you didn’t mean to give.' },
      { title: 'A kid who can name what they feel', description: 'They trade “lame” and “whatever” for words that actually move the moment forward.' },
      { title: 'Calm you can actually hold onto', description: 'You walk into the hard moments knowing what to say — and when to step back.' },
    ],
    seanHeading: 'I ran a room of thirteen-year-olds for fourteen years.',
    seanHeadingItalic: 'thirteen-year-olds',
    seanBio: 'I taught middle-school English for fourteen years before I had three boys of my own. This guide is the same move I used to turn a roomful of thirteen-year-old groans into actual work — rewritten for the kitchen table.',
    modalEyebrow: 'The 4S Flowchart · free',
    coverTitle: 'The 4S Flowchart',
    coverTitleItalic: 'Flowchart',
    coverDescriptor: 'Turning middle-school emotions into action, out loud, in real time.',
    pageCount: '8 pages',
    metaTitle: 'The 4S Flowchart — Free Guide for Parents of Middle Schoolers',
    metaDescription: 'A free 8-page guide for parents of middle schoolers: the four-move sequence that turns groans and eye-rolls into real conversation. Get it tonight.',
  },

  'five-minute-meeting': {
    slug: 'five-minute-meeting',
    kitFormId: '9538575',
    title: 'The Five-Minute Meeting',
    heroHeadline: 'Five minutes that build a kid who runs their own afternoon.',
    heroHeadlineItalic: 'their own afternoon',
    heroSubhead: 'Right now the whole afternoon runs through you. This free, 14-page guide is a five-minute conversation — three questions — that hands the planning back to them. Run it tonight.',
    microCopy: 'Free. Part of a 250K community and counting. No spam — I read every reply.',
    microCopyBold: '250K',
    painPoints: [
      '“I trip over their shoes on the way to nag about the homework — again.”',
      '“Every afternoon is me managing their whole to-do list.”',
      '“‘I’ll do it later’ becomes 9pm and a meltdown.”',
      '“I’m exhausted from being their external hard drive.”',
    ],
    painPointsCloser: '…then this guide was written for you.',
    painPointsCloserItalic: 'you',
    outcomesHeading: 'What changes by this afternoon.',
    outcomesHeadingItalic: 'this afternoon',
    outcomes: [
      { title: 'A kid who runs their own afternoon', description: 'They plan the homework, the priorities, and the timing — without you hovering over every step.' },
      { title: 'The end of the nightly homework war', description: 'Five minutes in the car replaces an hour of nagging at the kitchen table.' },
      { title: 'Planning muscles that actually grow', description: 'They build the time-sense and follow-through instead of borrowing yours every day.' },
      { title: 'Calmer evenings for everyone', description: 'Fewer 9pm meltdowns, fewer reminders, more room to just be their parent.' },
    ],
    seanHeading: 'Fourteen years in room 201. Three sons at home.',
    seanHeadingItalic: 'room 201',
    seanBio: 'I taught middle-school English for fourteen years before I had three boys of my own. This guide is the same coaching move I used at a student’s desk — shrunk to fit a car ride and an afternoon.',
    modalEyebrow: 'The five-minute meeting · free',
    coverTitle: 'The five-minute meeting',
    coverTitleItalic: 'meeting',
    coverDescriptor: 'Three questions. Five minutes. One calmer afternoon.',
    pageCount: '14 pages',
    metaTitle: 'The Five-Minute Meeting — Free Guide for Parents of Middle Schoolers',
    metaDescription: 'A free 14-page guide: the five-minute conversation that builds executive function and hands your middle schooler\'s afternoon back to them.',
  },

  'release-replay-repair-return': {
    slug: 'release-replay-repair-return',
    kitFormId: null, // set in Task 9 once the Kit form exists — page renders, but subscribe is rejected until then
    title: 'Release, Replay, Repair, Return',
    heroHeadline: 'The relationship isn’t built in the fights. It’s built in the repair.',
    heroHeadlineItalic: 'repair',
    heroSubhead: 'Most blowups end the same way — you both move on, nothing repaired. This free, 10-page guide is the four-step conversation that turns the fight into the thing that brings you closer.',
    microCopy: 'Free. Part of a 250K community and counting. No spam — I read every reply.',
    microCopyBold: '250K',
    painPoints: [
      '“We both say things we regret, then just… move on.”',
      '“I apologize, they shrug, and nothing actually changes.”',
      '“It’s the same blowup, on a loop.”',
      '“I don’t know how to come back after I’ve lost it.”',
    ],
    painPointsCloser: '…then this guide was written for you.',
    painPointsCloserItalic: 'you',
    outcomesHeading: 'What changes after the next fight.',
    outcomesHeadingItalic: 'next fight',
    outcomes: [
      { title: 'A way back after the blowup', description: 'You know exactly what to do in the ten minutes after a fight, instead of just moving on.' },
      { title: 'Fights that make you closer', description: 'The rupture becomes the moment your kid learns you always come back.' },
      { title: 'An end to the same fight on a loop', description: 'You solve the problem underneath instead of re-running the same argument.' },
      { title: 'A kid who learns to repair', description: 'They watch you own your part first — and start owning theirs.' },
    ],
    seanHeading: 'Fourteen years in room 201. Three sons at home.',
    seanHeadingItalic: 'room 201',
    seanBio: 'I taught middle school for fourteen years before I had three boys of my own. This guide is the loop I ran after every blowup — with a room of thirty, and now with three. Built on the research, and a lot of practice.',
    modalEyebrow: 'The repair guide · free',
    coverTitle: 'Release, replay, repair, return',
    coverTitleItalic: 'repair, return',
    coverDescriptor: 'The four-step conversation that repairs a rupture.',
    pageCount: '10 pages',
    metaTitle: 'Release, Replay, Repair, Return — Free Guide for Parents of Middle Schoolers',
    metaDescription: 'A free 10-page guide: the four-step conversation that turns a blowup with your middle schooler into something that actually brings you closer.',
  },

  'six-middle-skills': {
    slug: 'six-middle-skills',
    kitFormId: '9544138', // was 'field-guide' in the old (never-deployed) subscribe route
    title: 'The Six Middle Skills',
    heroHeadline: 'The skills that turn a kid into an adult.',
    heroHeadlineItalic: 'adult',
    heroSubhead: 'What looks like attitude at twelve is almost always a skill still loading. This free, 8-page field guide is a new lens for the slammed doors and one-word answers — and what each is quietly building toward.',
    microCopy: 'Free. Part of a 250K community and counting. No spam — I read every reply.',
    microCopyBold: '250K',
    painPoints: [
      '“Homework turns into a nightly battle.”',
      '“The door slams and I’m not sure what I did.”',
      '“Same fight about the phone, every single day.”',
      '“They’ve just… checked out, and I can’t reach them.”',
    ],
    painPointsCloser: '…then this field guide was written for you.',
    painPointsCloserItalic: 'you',
    outcomesHeading: 'What changes when you see it differently.',
    outcomesHeadingItalic: 'see it differently',
    outcomes: [
      { title: 'A new way to read your kid', description: 'You start seeing a skill still loading instead of an attitude that needs correcting.' },
      { title: 'The end of “what’s wrong with my kid”', description: 'Defiance, laziness, and drama turn into signals you can actually work with.' },
      { title: 'Less reacting, more noticing', description: 'You catch what’s developing under the behavior before it becomes a fight.' },
      { title: 'A calmer, closer house', description: 'When you meet the skill instead of the symptom, the whole home settles.' },
    ],
    seanHeading: 'Fourteen years in room 201. Three sons at home.',
    seanHeadingItalic: 'room 201',
    seanBio: 'I taught middle-school English for fourteen years before I had three boys of my own. This guide is the lens I used to tell the difference between a kid being difficult and a kid building something — rewritten for the kitchen table.',
    modalEyebrow: 'The six middle skills · free',
    coverTitle: 'The six middle skills',
    coverTitleItalic: 'middle skills',
    coverDescriptor: 'A lens for what your middle schooler is quietly building.',
    pageCount: '8 pages',
    metaTitle: 'The Six Middle Skills — Free Field Guide for Parents of Middle Schoolers',
    metaDescription: 'A free 8-page field guide: the six skills your middle schooler is still building, what each one looks like, and the move that\'s yours to make.',
  },
};

export function getFreebie(slug) {
  return FREEBIES[slug] || null;
}

export function getAllFreebies() {
  return Object.values(FREEBIES);
}