/* @ds-bundle: {"format":4,"namespace":"GrowthMindsetParentingDesignSystem_019dd4","components":[],"sourceHashes":{"reference/letter-data.jsx":"22e14b91a256","reference/practices.jsx":"c164ba041acd","ui_kits/website/chrome.jsx":"13309ac729fb","ui_kits/website/pages.jsx":"eb9babec69f4","ui_kits/website/sections.jsx":"ba823f938955"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GrowthMindsetParentingDesignSystem_019dd4 = window.GrowthMindsetParentingDesignSystem_019dd4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// reference/letter-data.jsx
try { (() => {
/* global React */

// LETTERS_CATALOG — slug-keyed registry of every letter the archive lists.
// `body` is an array of paragraph strings. The reader page renders them as
// drop-cap-first prose. A handful are written out in full; the rest get a
// generated body that reuses the dek + title so the page still reads like
// an article (placeholder until Sean writes them).

const LC_BUILD = ({
  title,
  dek
}) => [dek, `I keep coming back to this one. It’s the kind of thing I’d have rolled my eyes at, in my second year of teaching, and that I now think about every Saturday at the kitchen table. So here’s the long version, written plainly.`, `Start with what you can see, not what you assume. The kid in front of you is doing something — pacing, slamming a cabinet, not making eye contact. That behavior is information. It is rarely the message itself.`, `In the classroom I learned to name the behavior out loud, neutrally, before I corrected it. “You’re standing up. You walked away from your desk. Help me understand.” Eight words, no edge. The same eight words work at the kitchen table. They buy you the three seconds you need to choose your next move on purpose, instead of by reflex.`, `The mistake I made for years — and still make on bad weeks — is mistaking my own reaction for the situation. The situation is the kid. My reaction is mine. They are not the same emergency. Most of the practice we teach in The Workshop is just learning to keep them separate.`, `Here’s the small, repeatable version of this letter, the version you can actually use on a Tuesday: notice, name, narrow. Notice the behavior. Name it without judgment. Narrow your response to the next thirty seconds — not the rest of the night, not the rest of the week, just what you say next.`, `That’s it. That’s the whole letter. The fancy version is six paragraphs and three subheads. The kitchen-table version is three words. Use the one that fits the day you’re having.`];
const LETTERS_CATALOG = {
  // ── 2026 ──────────────────────────────────────────────────────────────────
  "i-taught-middle-school-twelve-years": {
    year: "2026",
    date: {
      d: "Jan",
      n: "12",
      full: "January 12, 2026"
    },
    type: "essay",
    tag: "Essay",
    readTime: "11 min read",
    title: "I taught middle school for twelve years. Then I had three sons.",
    dek: "What the classroom got right about kids that the parenting books got wrong — and the six practices I brought home with me.",
    img: "../assets/sean-teaching.jpg",
    meta: "Most-read · 4,820 reads",
    related: ["be-the-weather", "three-to-one-explained", "sunday-meeting"],
    body: ["I taught seventh-grade English in a room with thirty-one chairs, twenty-nine of which were usually full, and a poster of Maya Angelou that someone had laminated badly so it always looked like she was sweating. I taught there for twelve years. Then I had a son. Then two more.", "The first thing I learned, when I came home from school the first time and tried to talk to my own four-year-old the way I’d talked to my students — calmly, with structure, with a clear next step — was that the parenting books had it almost exactly backwards. The books told me to feel my feelings, to repair the connection, to use my soft voice. None of which is wrong. All of which is downstream.", "Upstream, in the classroom, was the actual practice: a small set of moves a teacher makes a thousand times a day, until they’re not moves at all, until they’re just how the room runs. That practice, transferred home, is the entire thing this newsletter is about. So this is the long version. The orientation letter, if you like.", "Here are the six things I brought home with me.", "**One. Be the weather.** The mood the adult in the room walks in with is the climate everybody else has to live in for the next hour. You don’t set the mood by announcing it. You set it by being it. If you walk in calm, the room is calm. If you walk in wound up, the room is wound up six minutes later, and you’ll blame the kids for it.", "**Two. Inspect, don’t expect.** “Go get ready for school” is not an instruction. It’s a hope. The instruction is: backpack zipped, shoes on, lunch in the bag, by the door. And then you check, every time, for two weeks, until checking isn’t necessary. This is the most boring practice in the whole catalog and the one that buys back the most marriage.", "**Three. Three to one.** For every one correction, three observations of growth. Not compliments — observations. “You started your homework without me asking.” “You used your fork the whole meal.” “You apologized first.” Three to one is the only feedback ratio that survives contact with a 9-year-old who is also tired.", "**Four. Model the work, don’t announce it.** I do, we do, you do. The teacher does it once. The teacher and the student do it together. The student does it alone. Four weeks, and they own it. We do this for fractions and for loading the dishwasher; the scaffold is the same.", "**Five. Repair on purpose.** The rupture is going to happen. The repair is the practice. The two-minute script we use, every time, after every blow-up: I’m sorry I yelled. I was overwhelmed. That wasn’t fair to you. Here’s what I’ll try next time. Then we hug, then we move on. Two minutes. The kid learns that an adult can be wrong out loud and still be the adult.", "**Six. The Sunday meeting.** Twenty-five minutes, once a week, four agenda items: what worked, what didn’t, what’s coming, who needs what. Stolen verbatim from a faculty meeting. It is the single thing that has done the most for our marriage, and we did not invent it; the eighth-grade math department did, in 2014, in a windowless room next to the library.", "That’s the framework. The rest of the archive — every Saturday note, every essay — is just one of those six, dressed up in a different week.", "If you’re new here, welcome. The Saturday letter is free, plainspoken, and lands in your inbox once a week. If you want the long version of any of the six practices, the course is here when you want it; if you don’t, the practices and the letters together cover most of what you’d need.", "I’ll see you Saturday."]
  },
  "rule-vs-ritual": {
    year: "2026",
    date: {
      d: "Apr",
      n: "26",
      full: "April 26, 2026"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "On the difference between a rule and a ritual",
    dek: "A rule tells you what not to do. A ritual tells you what to do instead.",
    meta: "12 replies",
    related: ["two-minute-repair", "kitchen-table-debrief", "sunday-meeting"],
    body: ["A rule tells you what not to do. A ritual tells you what to do instead. We have almost none of the first and a lot of the second, and I think it’s the only reason our weeks survive.", "“No screens at the table” is a rule. It generates an argument every meal for two weeks, and then a slow, sour resentment forever after. “We do high-low at dinner — one high, one low, everyone gets a turn” is a ritual. It generates a meal. The screen problem disappears, not because it was solved, but because it was replaced.", "Most of the parenting moments I’m proudest of started as somebody else’s rule that I converted into a ritual after it failed three Tuesdays in a row.", "Try this on the next thing that’s annoying you: instead of writing down what they should stop doing, write down what they should do instead. Make it small. Make it physical. Make it the same every time. Run it for two weeks. Tell me what changes."]
  },
  "inspect-dont-expect-7am": {
    year: "2026",
    date: {
      d: "Apr",
      n: "12",
      full: "April 12, 2026"
    },
    type: "essay",
    tag: "Essay",
    readTime: "8 min read",
    title: "What “inspect, don’t expect” looks like at 7am with three kids and a packed lunch",
    dek: "The unsexy logistics of standards — a Tuesday morning, photographed.",
    meta: "Cited by Edutopia",
    related: ["i-taught-middle-school-twelve-years", "back-to-school-routines", "modeling-is-curriculum"]
  },
  "two-minute-repair": {
    year: "2026",
    date: {
      d: "Apr",
      n: "5",
      full: "April 5, 2026"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "2 min read",
    title: "The two-minute repair script we use after every rupture",
    dek: "I’m sorry I yelled. I was overwhelmed. Here’s what I’ll try next time.",
    meta: "Reader favorite",
    related: ["repair-after-worst-night", "rule-vs-ritual", "be-the-weather"],
    body: ["Here it is, the whole script, written out, no editorializing:", "**1. Name what happened, factually.** “I yelled. I slammed the cabinet. I walked out of the room.” No hedging.", "**2. Take responsibility, not blame.** “That wasn’t fair to you. I was overwhelmed and I took it out on the wrong person.” You can be overwhelmed and still be the adult who chose what to do with it.", "**3. Say what you’ll try next time.** “Next time I feel myself getting there, I’m going to step into the hallway for a minute before I say anything.” Specific. Small. Repeatable.", "**4. Hug, or sit close, and end it.** Two minutes, tops. Don’t make them comfort you. Don’t go fishing for absolution. Move on with your day.", "We do this every time. The kids have started doing it back to me, almost word for word, after the small ruptures of their own. That is the entire point."]
  },
  "stopped-saying-good-job": {
    year: "2026",
    date: {
      d: "Mar",
      n: "29",
      full: "March 29, 2026"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "Why I stopped saying “good job” — and what I say instead",
    dek: "Three observations beat one compliment, every time.",
    meta: "Popular",
    related: ["three-to-one-explained", "praise-doesnt-inflate"]
  },
  "three-to-one-explained": {
    year: "2026",
    date: {
      d: "Mar",
      n: "15",
      full: "March 15, 2026"
    },
    type: "essay",
    tag: "Essay",
    readTime: "12 min read",
    title: "Three to one, explained: a teacher’s ratio for praise that actually builds resilience",
    dek: "Why three observations of growth for every correction is the only feedback rule that survives contact with a 9-year-old.",
    meta: "Long read",
    related: ["stopped-saying-good-job", "i-taught-middle-school-twelve-years"]
  },
  "kitchen-table-debrief": {
    year: "2026",
    date: {
      d: "Mar",
      n: "8",
      full: "March 8, 2026"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "4 min read",
    title: "The kitchen-table debrief",
    dek: "Three questions, fifteen minutes, every Sunday night. The whole thing.",
    related: ["sunday-meeting", "rule-vs-ritual"]
  },
  "on-meltdowns": {
    year: "2026",
    date: {
      d: "Mar",
      n: "1",
      full: "March 1, 2026"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "On meltdowns, mine included",
    dek: "I had three this week. Two were mine.",
    related: ["repair-after-worst-night", "two-minute-repair"]
  },
  "co-parenting-teaching-team": {
    year: "2026",
    date: {
      d: "Feb",
      n: "16",
      full: "February 16, 2026"
    },
    type: "essay",
    tag: "Essay",
    readTime: "9 min read",
    title: "Co-parenting like a teaching team: the planning meeting that saved our Sundays",
    dek: "Twenty minutes a week, four agenda items, fewer arguments by Wednesday.",
    meta: "Reader favorite",
    related: ["sunday-meeting", "marriage-behind-parenting"]
  },
  "cooler-not-punishment": {
    year: "2026",
    date: {
      d: "Feb",
      n: "9",
      full: "February 9, 2026"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "2 min read",
    title: "The cooler is not a punishment",
    dek: "The cool-down corner is a tool, not a time-out. Here’s the difference.",
    related: ["staying-in-your-lane"]
  },
  "worst-parent-teacher-conference": {
    year: "2026",
    date: {
      d: "Feb",
      n: "2",
      full: "February 2, 2026"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "5 min read",
    title: "What I learned from my worst parent-teacher conference",
    dek: "I was the parent. Not the teacher. Ouch.",
    meta: "Ouch",
    related: ["apologies-properly"]
  },
  "be-the-weather": {
    year: "2026",
    date: {
      d: "Jan",
      n: "26",
      full: "January 26, 2026"
    },
    type: "essay",
    tag: "Essay",
    readTime: "7 min read",
    title: "Be the weather: why the parent’s mood is the family’s climate",
    dek: "If you bring a storm, you’ll get a storm back. Every time. The most important practice, written plainly.",
    meta: "Top of the archive",
    related: ["i-taught-middle-school-twelve-years", "two-minute-repair", "three-to-one-explained"],
    body: ["If you bring a storm, you’ll get a storm back. Every time. This is not a metaphor I’m proud of, exactly — it sounds a little Hallmark — but I’ve watched it play out in thirty-one classrooms and three sons and I’ve never seen it fail.", "The mood you walk in with is the room’s climate for the next hour. The kids didn’t make the climate. You did. They are reacting to weather, the way humans react to weather — by getting cold, or hot, or running for cover.", "When I started teaching, I thought the most important first move was to control the room. I’d walk in tight, eyes scanning, voice already a little raised, ready to nip the chaos. The chaos always came. Of course it did. I was the chaos.", "Year four, my mentor — a sixty-year-old woman who taught chemistry and had been doing this since before I was born — told me to walk into the room thirty seconds before the bell, sit at my desk, and read a book. Just read. She said: the kids will read the book with their eyes before they sit down. They’re not actually reading it. They’re reading you.", "She was right. The room got quieter. Not all at once, not the first day, but week by week. I had been performing control. She was modeling calm.", "The kitchen-table version of this: when I walk in the door at 6:10 with my shoulders around my ears, my kids find a way to be wound up by 6:25. When I walk in the door, drop my bag, and sit down at the counter for ninety seconds before I say a word, the night goes differently. I am not faking calm; I am giving myself ninety seconds to actually become it. The difference is measurable. The difference is the night.", "This is the whole practice. Be the weather. Not “fake the weather,” not “suppress the weather” — actually become the climate you want to live in for the next hour, and then walk into the room as that climate. The kids will follow. They always do.", "If this is the only letter of mine you ever read, this is the one. Everything else I write is a footnote on this."]
  },
  // ── 2025 ──────────────────────────────────────────────────────────────────
  "what-i-got-wrong-2025": {
    year: "2025",
    date: {
      d: "Dec",
      n: "21",
      full: "December 21, 2025"
    },
    type: "essay",
    tag: "Essay",
    readTime: "14 min read",
    title: "What I got wrong in 2025 — and what I’m keeping",
    dek: "Year in review, in the form of a teaching evaluation written for myself.",
    meta: "Year-end",
    related: ["i-taught-middle-school-twelve-years", "be-the-weather"]
  },
  "holiday-discipline": {
    year: "2025",
    date: {
      d: "Dec",
      n: "14",
      full: "December 14, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "Holiday discipline without the dread",
    dek: "The two rituals we run from Thanksgiving to New Year’s — and the rule we don’t.",
    related: ["rule-vs-ritual"]
  },
  "before-walking-through-door": {
    year: "2025",
    date: {
      d: "Dec",
      n: "7",
      full: "December 7, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "2 min read",
    title: "Three things I do before walking through the door",
    dek: "Ninety seconds in the driveway. The cheapest, best parenting investment I make.",
    related: ["be-the-weather"]
  },
  "modeling-is-curriculum": {
    year: "2025",
    date: {
      d: "Nov",
      n: "23",
      full: "November 23, 2025"
    },
    type: "essay",
    tag: "Essay",
    readTime: "10 min read",
    title: "Modeling is the curriculum: I do, we do, you do, at home",
    dek: "The teaching scaffold that makes a kid independent in three steps and four weeks.",
    meta: "Practice 05",
    related: ["i-taught-middle-school-twelve-years", "back-to-school-routines"]
  },
  "lie-of-gentle-parenting": {
    year: "2025",
    date: {
      d: "Nov",
      n: "16",
      full: "November 16, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "4 min read",
    title: "On the lie of “gentle parenting”",
    dek: "Soft voices and clear standards are not opposites. They are the same thing.",
    meta: "Spicy",
    related: ["three-to-one-explained"]
  },
  "sibling-fights-refereed": {
    year: "2025",
    date: {
      d: "Nov",
      n: "9",
      full: "November 9, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "Sibling fights, refereed by a teacher",
    dek: "The four moves I learned in a 7th-grade hallway that I now use in my own.",
    related: ["staying-in-your-lane"]
  },
  "sunday-meeting": {
    year: "2025",
    date: {
      d: "Oct",
      n: "26",
      full: "October 26, 2025"
    },
    type: "essay",
    tag: "Essay",
    readTime: "11 min read",
    title: "The Sunday meeting: how families plan a week without losing it",
    dek: "The 25-minute ritual that makes Mondays make sense — stolen verbatim from a faculty meeting.",
    meta: "Reader favorite",
    related: ["co-parenting-teaching-team", "kitchen-table-debrief"]
  },
  "catch-them-being-good": {
    year: "2025",
    date: {
      d: "Oct",
      n: "19",
      full: "October 19, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "2 min read",
    title: "What “catch them being good” looks like in a noisy car",
    dek: "Three observations on the drive home. Every time. Even when you don’t feel like it.",
    related: ["three-to-one-explained"]
  },
  "grandparents-disagreements": {
    year: "2025",
    date: {
      d: "Oct",
      n: "12",
      full: "October 12, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "On grandparents and gentle disagreements",
    dek: "The two-sentence script we use when grandma overrides the rule. It works.",
    related: ["co-parenting-teaching-team"]
  },
  "homework-battles": {
    year: "2025",
    date: {
      d: "Oct",
      n: "5",
      full: "October 5, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "2 min read",
    title: "Homework battles, again",
    dek: "The same fight, the third Tuesday in a row. What I changed.",
    related: ["inspect-dont-expect-7am"]
  },
  "back-to-school-routines": {
    year: "2025",
    date: {
      d: "Sep",
      n: "21",
      full: "September 21, 2025"
    },
    type: "essay",
    tag: "Essay",
    readTime: "9 min read",
    title: "Back-to-school: the four routines I install in week one",
    dek: "Backpacks, breakfast, bedtime, big-feelings — the four that determine the rest of the year.",
    meta: "Most shared",
    related: ["modeling-is-curriculum", "inspect-dont-expect-7am"]
  },
  "apologies-properly": {
    year: "2025",
    date: {
      d: "Sep",
      n: "14",
      full: "September 14, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "On apologies, properly",
    dek: "What I owe my kids when I’m wrong. And what I don’t.",
    related: ["two-minute-repair", "repair-after-worst-night"]
  },
  "the-first-day": {
    year: "2025",
    date: {
      d: "Sep",
      n: "7",
      full: "September 7, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "2 min read",
    title: "The first day",
    dek: "I cried in the car. I’m not sorry.",
    related: []
  },
  "screens-sane-conversation": {
    year: "2025",
    date: {
      d: "Aug",
      n: "24",
      full: "August 24, 2025"
    },
    type: "essay",
    tag: "Essay",
    readTime: "8 min read",
    title: "Screens: a sane conversation with a teenager",
    dek: "The agreement we wrote, the backslide we managed, and the language that worked.",
    meta: "Cited",
    related: ["rule-vs-ritual", "lie-of-gentle-parenting"]
  },
  "summer-endings": {
    year: "2025",
    date: {
      d: "Aug",
      n: "17",
      full: "August 17, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "Summer endings, gently",
    dek: "The last week of camp. The first week of school. The bridge in between.",
    related: ["the-first-day"]
  },
  "no-without-saying-no": {
    year: "2025",
    date: {
      d: "Aug",
      n: "10",
      full: "August 10, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "How to say no without saying no a hundred times",
    dek: "The teacher’s redirect, brought to the toy aisle.",
    related: ["rule-vs-ritual"]
  },
  "boredom-as-feature": {
    year: "2025",
    date: {
      d: "Aug",
      n: "3",
      full: "August 3, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "2 min read",
    title: "On boredom as a feature",
    dek: "The kid said “I’m bored.” I said “good.” Here’s what happened next.",
    related: []
  },
  "discipline-curriculum": {
    year: "2025",
    date: {
      d: "Jul",
      n: "20",
      full: "July 20, 2025"
    },
    type: "essay",
    tag: "Essay",
    readTime: "13 min read",
    title: "Discipline isn’t a reaction. It’s a curriculum.",
    dek: "The seven micro-habits I teach the way I taught fractions: small, slow, repeated.",
    meta: "Long read",
    related: ["modeling-is-curriculum", "three-to-one-explained"]
  },
  "staying-in-your-lane": {
    year: "2025",
    date: {
      d: "Jul",
      n: "13",
      full: "July 13, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "On staying in your lane during meltdowns",
    dek: "Their feeling. Your job. Don’t mix them up.",
    related: ["on-meltdowns"]
  },
  "camp-not-babysitting": {
    year: "2025",
    date: {
      d: "Jul",
      n: "6",
      full: "July 6, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "2 min read",
    title: "Camp is not babysitting; here’s what to ask",
    dek: "Five questions I ask before I sign the deposit check.",
    related: []
  },
  "raising-boys": {
    year: "2025",
    date: {
      d: "Jun",
      n: "22",
      full: "June 22, 2025"
    },
    type: "essay",
    tag: "Essay",
    readTime: "10 min read",
    title: "Raising boys without being weird about it",
    dek: "On muscle, manners, and the long game of making a man you’d want to live with.",
    meta: "Most-read of 2025",
    related: ["i-taught-middle-school-twelve-years", "modeling-is-curriculum"]
  },
  "fathers-day-unsentimental": {
    year: "2025",
    date: {
      d: "Jun",
      n: "15",
      full: "June 15, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "Father’s Day, the unsentimental version",
    dek: "Thanks. I’ll do better. That’s the whole speech.",
    related: []
  },
  "bedtime-stall": {
    year: "2025",
    date: {
      d: "Jun",
      n: "8",
      full: "June 8, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "2 min read",
    title: "The bedtime stall, decoded",
    dek: "It’s never about the water. It’s never about the second story.",
    related: ["rule-vs-ritual"]
  },
  "praise-doesnt-inflate": {
    year: "2025",
    date: {
      d: "Jun",
      n: "1",
      full: "June 1, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "On praise that doesn’t inflate",
    dek: "Observation, not compliment. The line is sharper than it sounds.",
    related: ["three-to-one-explained", "stopped-saying-good-job"]
  },
  "twelve-years-of-seventh-graders": {
    year: "2025",
    date: {
      d: "May",
      n: "18",
      full: "May 18, 2025"
    },
    type: "essay",
    tag: "Essay",
    readTime: "9 min read",
    title: "What twelve years of seventh graders taught me about my own three",
    dek: "The patterns that aren’t age-specific. The ones that are. The ones I keep mistaking for each other.",
    meta: "Anchor essay",
    related: ["i-taught-middle-school-twelve-years", "raising-boys"]
  },
  "mothers-day-kitchen": {
    year: "2025",
    date: {
      d: "May",
      n: "11",
      full: "May 11, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "2 min read",
    title: "Mother’s Day, in the kitchen",
    dek: "She made the eggs. We made the day. Mostly.",
    related: []
  },
  "letting-them-fail": {
    year: "2025",
    date: {
      d: "May",
      n: "4",
      full: "May 4, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "On letting them fail — a small, weekly dose",
    dek: "A scraped knee, a forgotten lunchbox, a missing trumpet. The vaccine schedule.",
    related: []
  },
  "repair-after-worst-night": {
    year: "2025",
    date: {
      d: "Apr",
      n: "20",
      full: "April 20, 2025"
    },
    type: "essay",
    tag: "Essay",
    readTime: "7 min read",
    title: "The repair, after the worst night of the week",
    dek: "What I said. What I should have said. The script I keep on the fridge.",
    meta: "Practice 06",
    related: ["two-minute-repair", "apologies-properly"]
  },
  "on-crying": {
    year: "2025",
    date: {
      d: "Apr",
      n: "13",
      full: "April 13, 2025"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "On crying — mine, theirs, the difference",
    dek: "Both belong at the kitchen table. Neither belongs in the driver’s seat.",
    related: ["staying-in-your-lane"]
  },
  // ── 2024 ──────────────────────────────────────────────────────────────────
  "quit-my-dream-classroom": {
    year: "2024",
    date: {
      d: "Dec",
      n: "15",
      full: "December 15, 2024"
    },
    type: "essay",
    tag: "Essay",
    readTime: "12 min read",
    title: "Why I quit my dream classroom to figure out my own kitchen table",
    dek: "On leaving teaching after twelve years, and what I went home to actually do.",
    meta: "Origin story",
    related: ["i-taught-middle-school-twelve-years"]
  },
  "what-books-got-wrong": {
    year: "2024",
    date: {
      d: "Nov",
      n: "10",
      full: "November 10, 2024"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "What I thought parenting books got wrong",
    dek: "The thing they keep underselling. The thing they keep oversharing.",
    related: ["i-taught-middle-school-twelve-years"]
  },
  "plan-week-like-teacher": {
    year: "2024",
    date: {
      d: "Oct",
      n: "13",
      full: "October 13, 2024"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "4 min read",
    title: "On planning your week like a teacher",
    dek: "Sunday night, twenty minutes, four columns. The whole system.",
    related: ["sunday-meeting", "kitchen-table-debrief"]
  },
  "three-sons-three-styles": {
    year: "2024",
    date: {
      d: "Sep",
      n: "29",
      full: "September 29, 2024"
    },
    type: "essay",
    tag: "Essay",
    readTime: "9 min read",
    title: "Three sons, three styles, three lesson plans",
    dek: "Why “one-size-fits-all” parenting fails the way “one-size-fits-all” teaching fails.",
    meta: "Reader favorite",
    related: ["i-taught-middle-school-twelve-years", "modeling-is-curriculum"]
  },
  "listening-past-first-sentence": {
    year: "2024",
    date: {
      d: "Aug",
      n: "25",
      full: "August 25, 2024"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "2 min read",
    title: "On listening past the first sentence",
    dek: "The thing they actually want to tell you is in sentence three. Always.",
    related: []
  },
  "saying-yes-to-fewer": {
    year: "2024",
    date: {
      d: "Jul",
      n: "21",
      full: "July 21, 2024"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "Saying yes more, but to fewer things",
    dek: "The discipline is in the saying-no, every time, to the things that don’t matter.",
    related: []
  },
  "first-thing-after-kindergarten": {
    year: "2024",
    date: {
      d: "Jun",
      n: "16",
      full: "June 16, 2024"
    },
    type: "essay",
    tag: "Essay",
    readTime: "8 min read",
    title: "The first thing I taught my eldest after he hit kindergarten",
    dek: "Not a fact. A practice. The one that mattered most.",
    related: ["modeling-is-curriculum"]
  },
  "marriage-behind-parenting": {
    year: "2024",
    date: {
      d: "May",
      n: "12",
      full: "May 12, 2024"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "4 min read",
    title: "On the marriage behind the parenting",
    dek: "If the two of you aren’t aligned, the kids will negotiate against you. Every time.",
    related: ["co-parenting-teaching-team", "sunday-meeting"]
  },
  "teacher-hacks-brought-home": {
    year: "2024",
    date: {
      d: "Apr",
      n: "7",
      full: "April 7, 2024"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "3 min read",
    title: "Teacher hacks, brought home",
    dek: "Seven moves I made every Tuesday in 7B that work just as well at the kitchen table.",
    related: ["i-taught-middle-school-twelve-years"]
  },
  "what-i-wish-id-known": {
    year: "2024",
    date: {
      d: "Mar",
      n: "10",
      full: "March 10, 2024"
    },
    type: "essay",
    tag: "Essay",
    readTime: "6 min read",
    title: "What I wish I’d known the day my first son was born",
    dek: "Twelve years of teaching, distilled to four sentences.",
    meta: "First essay",
    related: ["i-taught-middle-school-twelve-years"]
  },
  "why-i-started-writing": {
    year: "2024",
    date: {
      d: "Feb",
      n: "4",
      full: "February 4, 2024"
    },
    type: "note",
    tag: "Saturday note",
    readTime: "2 min read",
    title: "Why I started writing on Saturdays",
    dek: "I needed somewhere to put the week. This is where it lives.",
    related: []
  }
};

// Fill in placeholder bodies for letters whose body isn’t yet written.
Object.keys(LETTERS_CATALOG).forEach(slug => {
  const l = LETTERS_CATALOG[slug];
  if (!l.body || !l.body.length) l.body = LC_BUILD(l);
  l.slug = slug;
});
window.LETTERS_CATALOG = LETTERS_CATALOG;
})(); } catch (e) { __ds_ns.__errors.push({ path: "reference/letter-data.jsx", error: String((e && e.message) || e) }); }

// reference/practices.jsx
try { (() => {
/* global React */

const v6Practices = [{
  n: "01",
  tag: "Foundations",
  title: "Be the weather",
  body: "The mood you carry is the climate they live in. Calm parent, calm room \u2014 it's not magic, it's contagion, and it's the practice everything else rests on.",
  pull: "If you bring a storm, you'll get a storm back. Every time.",
  script: "Pause at the door. Three breaths. Walk in like the kind of person you'd want to live with.",
  time: "5\u201310 min, daily"
}, {
  n: "02",
  tag: "Regulation",
  title: "Use the cooler",
  body: "Adrenaline and cortisol don't write good consequences. The cooler is the gap between feeling and response \u2014 a deliberate pause where you stop reacting and start designing.",
  pull: "Hot decisions rot. Cool ones keep.",
  script: "\u201cI hear you. I need a minute. We'll talk in five.\u201d Then actually take five.",
  time: "When triggered"
}, {
  n: "03",
  tag: "Standards",
  title: "Inspect, don't expect",
  body: "Expectation is passive. Inspection is the work. Kids rise to what gets noticed and named, not what gets wished for from the couch.",
  pull: "What you tolerate, you teach. What you inspect, you raise.",
  script: "\u201cShow me your plate. Show me your homework. Show me your shoes.\u201d Cheerful, not punitive.",
  time: "Built into transitions"
}, {
  n: "04",
  tag: "Praise",
  title: "Three to one",
  body: "Three observations of growth for every correction. Name the behavior, not the kid. \u2018You worked hard on that\u2019 beats \u2018you're so smart\u2019 every time.",
  pull: "Praise the move, not the trait.",
  script: "\u201cYou tried it twice before asking for help. That's exactly the muscle.\u201d",
  time: "All day"
}, {
  n: "05",
  tag: "Skill\u2011building",
  title: "I do, we do, you do",
  body: "Modeling is teaching. The fastest way to make a kid independent is to be embarrassingly explicit about how the thing is done, do it together, then step away.",
  pull: "Independence is taught. Confusion is what we hand them otherwise.",
  script: "\u201cWatch me. Now do it with me. Now I'll watch you. I'll be in the next room.\u201d",
  time: "20 min, once per skill"
}, {
  n: "06",
  tag: "Repair",
  title: "Bad moment, great opportunity",
  body: "Meltdowns are feedback loops. The repair afterward is the actual lesson \u2014 and it's the one that makes them brave enough to try the hard thing again tomorrow.",
  pull: "The lesson lives in the apology, not the argument.",
  script: "\u201cI lost it earlier. Here's what I should have done. Can we try the rest of tonight again?\u201d",
  time: "Within 2 hrs of rupture"
}];
function V6PracOptionA() {
  return /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-a-list"
  }, v6Practices.map(p => /*#__PURE__*/React.createElement("a", {
    className: "v6-prac-a-row",
    href: "#",
    key: p.n
  }, /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-a-num"
  }, p.n), /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-a-tag"
  }, p.tag), /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-a-text"
  }, /*#__PURE__*/React.createElement("h3", null, p.title), /*#__PURE__*/React.createElement("p", null, p.body)), /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-a-arrow"
  }, p.time, " \u2192"))));
}
function V6PracOptionB() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const active = v6Practices[activeIdx];
  return /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-b"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-b-list"
  }, v6Practices.map((p, i) => /*#__PURE__*/React.createElement("a", {
    className: "v6-prac-b-item" + (i === activeIdx ? " is-active" : ""),
    href: "#",
    key: p.n,
    onClick: e => {
      e.preventDefault();
      setActiveIdx(i);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "v6-prac-b-item-num"
  }, p.n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-b-item-tag"
  }, p.tag), /*#__PURE__*/React.createElement("h3", {
    className: "v6-prac-b-item-h3"
  }, p.title))))), /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-b-detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-b-detail-num"
  }, active.n), /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-b-detail-tag"
  }, active.tag), /*#__PURE__*/React.createElement("h2", null, active.title), /*#__PURE__*/React.createElement("p", null, active.body), /*#__PURE__*/React.createElement("p", {
    className: "v6-prac-b-pull"
  }, "\u201C", active.pull, "\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"Cormorant Garamond",Georgia,serif',
      fontStyle: 'italic',
      fontSize: '18px',
      color: 'var(--ink-soft)',
      marginBottom: 8
    }
  }, "The script:"), /*#__PURE__*/React.createElement("p", null, active.script), /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-b-detail-foot"
  }, /*#__PURE__*/React.createElement("span", null, "Practice cadence: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--ink)'
    }
  }, active.time)), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--accent)',
      textDecoration: 'none',
      fontWeight: 600
    }
  }, "Read the full piece \u2192"))));
}
function V6PracOptionC() {
  return /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-c"
  }, v6Practices.map(p => /*#__PURE__*/React.createElement("article", {
    className: "v6-prac-c-block",
    key: p.n
  }, /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-c-card"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-c-card-tag"
  }, p.tag, " \xB7 Practice ", p.n), /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-c-card-num"
  }, p.n)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Cormorant Garamond",Georgia,serif',
      fontStyle: 'italic',
      fontSize: 24,
      lineHeight: 1.3
    }
  }, "\u201C", p.pull, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--sans)',
      fontSize: 13,
      letterSpacing: '0.04em',
      color: 'var(--ink-soft)',
      marginTop: 'auto',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, p.time), /*#__PURE__*/React.createElement("span", null, "\u2193 read"))), /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-c-text"
  }, /*#__PURE__*/React.createElement("h3", null, p.title), /*#__PURE__*/React.createElement("p", null, p.body), /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-c-script"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-c-script-label"
  }, "The script \u2014 what to actually say"), /*#__PURE__*/React.createElement("p", {
    className: "v6-prac-c-script-line"
  }, "\u201C", p.script, "\u201D"))))));
}
const PRAC_OPTIONS = [{
  id: "A",
  label: "Option A \u2014 Long-scroll index",
  desc: "All six on one page, scannable, link to detail"
}, {
  id: "B",
  label: "Option B \u2014 Index + detail pane",
  desc: "Sticky list left, click to expand inline"
}, {
  id: "C",
  label: "Option C \u2014 Single deep-dive",
  desc: "Six full color cards, alternating, no detail page"
}];
function V6PracticesPage() {
  const [opt, setOpt] = React.useState("A");
  const current = PRAC_OPTIONS.find(o => o.id === opt);
  return /*#__PURE__*/React.createElement("article", {
    className: "v6-page",
    "data-theme": "terracotta"
  }, /*#__PURE__*/React.createElement(V6PageNav, {
    active: "practices"
  }), /*#__PURE__*/React.createElement(V6PageHead, {
    eyebrow: "The Practices",
    title: "Six things I do every day \u2014 in the classroom, and at home.",
    meta: [{
      b: "06",
      l: "Practices"
    }, {
      b: "12 yrs",
      l: "Tested with kids"
    }, {
      b: "5 min",
      l: "Average read"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    className: "v6-prac-opt-banner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v6-prac-opt-banner-tag"
  }, "Showing"), /*#__PURE__*/React.createElement("b", null, current.label, "."), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: 'var(--ink-soft)'
    }
  }, current.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, PRAC_OPTIONS.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    onClick: () => setOpt(o.id),
    style: {
      padding: '6px 16px',
      borderRadius: 999,
      border: o.id === opt ? '1.5px solid var(--accent)' : '1px solid var(--rule)',
      background: o.id === opt ? 'var(--accent)' : 'var(--paper)',
      color: o.id === opt ? 'var(--paper)' : 'var(--ink)',
      fontFamily: 'var(--sans)',
      fontWeight: 600,
      fontSize: 13,
      cursor: 'pointer'
    }
  }, o.id)))), opt === "A" && /*#__PURE__*/React.createElement(V6PracOptionA, null), opt === "B" && /*#__PURE__*/React.createElement(V6PracOptionB, null), opt === "C" && /*#__PURE__*/React.createElement(V6PracOptionC, null), /*#__PURE__*/React.createElement(V6PageFoot, null));
}
window.V6PracticesPage = V6PracticesPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "reference/practices.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/chrome.jsx
try { (() => {
/* global React */

// ── Top nav bar ─────────────────────────────────────────────────────────────
function GMPNav({
  active,
  onNav
}) {
  const links = [{
    id: "home",
    label: "Home"
  }, {
    id: "practices",
    label: "Practices"
  }, {
    id: "letters",
    label: "Letters"
  }, {
    id: "course",
    label: "Course"
  }, {
    id: "about",
    label: "About"
  }];
  return /*#__PURE__*/React.createElement("nav", {
    className: "kit-nav"
  }, /*#__PURE__*/React.createElement("a", {
    className: "kit-mark",
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("home");
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit-mark-glyph"
  }, "G"), /*#__PURE__*/React.createElement("span", {
    className: "kit-mark-text"
  }, "Growth Mindset Parenting")), /*#__PURE__*/React.createElement("div", {
    className: "kit-nav-links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: "#",
    className: "kit-nav-link" + (active === l.id ? " is-active" : ""),
    onClick: e => {
      e.preventDefault();
      onNav(l.id);
    }
  }, l.label))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "kit-nav-cta",
    onClick: e => {
      e.preventDefault();
      onNav("subscribe");
    }
  }, "Subscribe"));
}

// ── Marquee ticker ──────────────────────────────────────────────────────────
function GMPTicker() {
  const items = ["12 years teaching", "Three sons", "One Saturday letter", "4,820 subscribers", "Chicago made", "Plainspoken since 2024"];
  const doubled = [...items, ...items];
  return /*#__PURE__*/React.createElement("div", {
    className: "kit-ticker"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-ticker-track"
  }, doubled.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", null, it), /*#__PURE__*/React.createElement("span", {
    className: "kit-ticker-sep"
  }, "\xB7")))));
}

// ── Footer ──────────────────────────────────────────────────────────────────
function GMPFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "kit-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-footer-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: "kit-mark",
    href: "#"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit-mark-glyph"
  }, "G"), /*#__PURE__*/React.createElement("span", {
    className: "kit-mark-text"
  }, "Growth Mindset Parenting")), /*#__PURE__*/React.createElement("p", {
    className: "kit-footer-tag"
  }, "Plainspoken parenting from a former middle-school teacher.", /*#__PURE__*/React.createElement("br", null), "One Saturday letter a week. Free.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "kit-footer-h"
  }, "Read"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "The Saturday letter"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Essays"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "The Practices")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "kit-footer-h"
  }, "Learn"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "The course"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Office hours"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Workshops")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "kit-footer-h"
  }, "Sean"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "About"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Bookshelf"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Press"))), /*#__PURE__*/React.createElement("div", {
    className: "kit-footer-rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "kit-footer-base"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Sean Kane \xB7 Chicago, IL"), /*#__PURE__*/React.createElement("span", null, "Made on Saturdays at the kitchen table.")));
}
window.GMPNav = GMPNav;
window.GMPTicker = GMPTicker;
window.GMPFooter = GMPFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages.jsx
try { (() => {
/* global React, GMPNav, GMPTicker, GMPFooter, GMPHero, GMPPracticesGrid, GMPLatestLetters, GMPCourseStrip, GMPQuoteBlock, GMPSubscribeBlock */

const PRACTICES_FULL = [{
  n: "01",
  tag: "Foundations",
  title: "Be the weather",
  body: "The mood you carry is the climate they live in. Calm parent, calm room — it's not magic, it's contagion.",
  pull: "If you bring a storm, you'll get a storm back.",
  script: "Pause at the door. Three breaths. Walk in like the kind of person you'd want to live with.",
  time: "5–10 min, daily"
}, {
  n: "02",
  tag: "Regulation",
  title: "Use the cooler",
  body: "Adrenaline doesn't write good consequences. The cooler is the gap between feeling and response.",
  pull: "Hot decisions rot. Cool ones keep.",
  script: "\u201cI hear you. I need a minute. We'll talk in five.\u201d Then actually take five.",
  time: "When triggered"
}, {
  n: "03",
  tag: "Standards",
  title: "Inspect, don't expect",
  body: "Expectation is passive. Inspection is the work. Kids rise to what gets noticed and named.",
  pull: "What you tolerate, you teach.",
  script: "\u201cShow me your plate. Show me your homework. Show me your shoes.\u201d Cheerful, not punitive.",
  time: "Built into transitions"
}, {
  n: "04",
  tag: "Praise",
  title: "Three to one",
  body: "Three observations of growth for every correction. Name the behavior, not the kid.",
  pull: "Praise the move, not the trait.",
  script: "\u201cYou tried it twice before asking for help. That's exactly the muscle.\u201d",
  time: "All day"
}, {
  n: "05",
  tag: "Skill-building",
  title: "I do, we do, you do",
  body: "Modeling is teaching. Be embarrassingly explicit, then do it together, then step away.",
  pull: "Independence is taught. Confusion is the default.",
  script: "\u201cWatch me. Now do it with me. Now I'll watch you. I'll be in the next room.\u201d",
  time: "20 min, once per skill"
}, {
  n: "06",
  tag: "Repair",
  title: "Bad moment, great opportunity",
  body: "Meltdowns are feedback. The repair afterward is the actual lesson.",
  pull: "The lesson lives in the apology, not the argument.",
  script: "\u201cI lost it earlier. Here's what I should have done. Can we try the rest of tonight again?\u201d",
  time: "Within 2 hrs"
}];
function PracticesPage({
  onNav
}) {
  const [active, setActive] = React.useState(0);
  const p = PRACTICES_FULL[active];
  return /*#__PURE__*/React.createElement("article", {
    className: "kit-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-page-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gmp-eyebrow"
  }, "The Practices"), /*#__PURE__*/React.createElement("h1", {
    className: "kit-page-h1"
  }, "Six things I do every day \u2014 ", /*#__PURE__*/React.createElement("em", null, "in the classroom, and at home.")), /*#__PURE__*/React.createElement("div", {
    className: "kit-page-meta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "06"), /*#__PURE__*/React.createElement("span", null, "Practices")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "12 yrs"), /*#__PURE__*/React.createElement("span", null, "Tested with kids")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "5 min"), /*#__PURE__*/React.createElement("span", null, "Average read")))), /*#__PURE__*/React.createElement("div", {
    className: "kit-prac-detail-wrap"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "kit-prac-detail-list"
  }, PRACTICES_FULL.map((row, i) => /*#__PURE__*/React.createElement("a", {
    key: row.n,
    href: "#",
    className: "kit-prac-detail-item" + (i === active ? " is-active" : ""),
    onClick: e => {
      e.preventDefault();
      setActive(i);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit-prac-detail-num"
  }, row.n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "kit-prac-detail-tag"
  }, row.tag), /*#__PURE__*/React.createElement("h3", null, row.title))))), /*#__PURE__*/React.createElement("section", {
    className: "kit-prac-detail-pane"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-prac-detail-num kit-prac-detail-num-big"
  }, p.n), /*#__PURE__*/React.createElement("div", {
    className: "kit-prac-detail-tag"
  }, p.tag), /*#__PURE__*/React.createElement("h2", null, p.title), /*#__PURE__*/React.createElement("p", null, p.body), /*#__PURE__*/React.createElement("p", {
    className: "kit-prac-detail-pull"
  }, "\u201C", p.pull, "\u201D"), /*#__PURE__*/React.createElement("div", {
    className: "kit-prac-detail-script"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit-prac-detail-script-label"
  }, "The script \u2014 what to actually say"), /*#__PURE__*/React.createElement("p", null, "\u201C", p.script, "\u201D")), /*#__PURE__*/React.createElement("div", {
    className: "kit-prac-detail-foot"
  }, /*#__PURE__*/React.createElement("span", null, "Practice cadence: ", /*#__PURE__*/React.createElement("b", null, p.time)), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("letters");
    }
  }, "Read the full piece \u2192")))));
}
function LettersPage({
  onOpen
}) {
  const archive = [{
    y: "2026",
    items: [{
      d: "Apr",
      n: "26",
      tag: "Saturday note",
      read: "3 min",
      title: "On the difference between a rule and a ritual",
      dek: "A rule tells you what not to do. A ritual tells you what to do instead."
    }, {
      d: "Apr",
      n: "12",
      tag: "Essay",
      read: "8 min",
      title: "What \u201cinspect, don\u2019t expect\u201d looks like at 7am",
      dek: "The unsexy logistics of standards \u2014 a Tuesday, photographed."
    }, {
      d: "Apr",
      n: "5",
      tag: "Saturday note",
      read: "2 min",
      title: "The two-minute repair script we use after every rupture",
      dek: "\u201cI\u2019m sorry I yelled. I was overwhelmed. Here\u2019s what I\u2019ll try next time.\u201d"
    }, {
      d: "Mar",
      n: "29",
      tag: "Saturday note",
      read: "3 min",
      title: "Why I stopped saying \u201cgood job\u201d \u2014 and what I say instead",
      dek: "Three observations beat one compliment, every time."
    }, {
      d: "Mar",
      n: "15",
      tag: "Essay",
      read: "12 min",
      title: "Three to one, explained",
      dek: "Why three observations of growth for every correction is the only feedback rule that survives a 9-year-old."
    }, {
      d: "Feb",
      n: "16",
      tag: "Essay",
      read: "9 min",
      title: "Co-parenting like a teaching team",
      dek: "Twenty minutes a week, four agenda items, fewer arguments by Wednesday."
    }]
  }, {
    y: "2025",
    items: [{
      d: "Oct",
      n: "26",
      tag: "Essay",
      read: "11 min",
      title: "The Sunday meeting",
      dek: "How families plan a week without losing it. Stolen verbatim from a faculty meeting."
    }, {
      d: "Sep",
      n: "21",
      tag: "Essay",
      read: "9 min",
      title: "Back-to-school: the four routines I install in week one",
      dek: "Backpacks, breakfast, bedtime, big-feelings — the four that determine the rest of the year."
    }, {
      d: "Jun",
      n: "22",
      tag: "Essay",
      read: "10 min",
      title: "Raising boys without being weird about it",
      dek: "On muscle, manners, and the long game of making a man you'd want to live with."
    }]
  }];
  return /*#__PURE__*/React.createElement("article", {
    className: "kit-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-page-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gmp-eyebrow"
  }, "The Saturday letter \xB7 Archive"), /*#__PURE__*/React.createElement("h1", {
    className: "kit-page-h1"
  }, "Every Saturday, since ", /*#__PURE__*/React.createElement("em", null, "2024.")), /*#__PURE__*/React.createElement("p", {
    className: "kit-page-dek"
  }, "All of it, free, plainspoken. Saturday notes are short. Essays are longer. Both go out by email.")), archive.map(group => /*#__PURE__*/React.createElement("div", {
    key: group.y,
    className: "kit-archive-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-archive-year"
  }, group.y), /*#__PURE__*/React.createElement("div", {
    className: "kit-letters"
  }, group.items.map((L, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    className: "kit-letter",
    onClick: e => {
      e.preventDefault();
      onOpen && onOpen(L);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-letter-date"
  }, /*#__PURE__*/React.createElement("b", null, L.d), /*#__PURE__*/React.createElement("span", null, L.n)), /*#__PURE__*/React.createElement("div", {
    className: "kit-letter-tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit-letter-dot"
  }), L.tag), /*#__PURE__*/React.createElement("div", {
    className: "kit-letter-text"
  }, /*#__PURE__*/React.createElement("h4", null, L.title), /*#__PURE__*/React.createElement("p", null, L.dek)), /*#__PURE__*/React.createElement("div", {
    className: "kit-letter-read"
  }, L.read)))))));
}
function LetterReader({
  letter,
  onBack
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "kit-reader"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "kit-reader-back",
    onClick: e => {
      e.preventDefault();
      onBack();
    }
  }, "\u2190 All letters"), /*#__PURE__*/React.createElement("div", {
    className: "kit-reader-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gmp-eyebrow"
  }, letter.tag, " \xB7 ", letter.d, " ", letter.n, ", 2026"), /*#__PURE__*/React.createElement("span", {
    className: "kit-reader-read"
  }, letter.read)), /*#__PURE__*/React.createElement("h1", {
    className: "kit-reader-h1"
  }, letter.title), /*#__PURE__*/React.createElement("p", {
    className: "kit-reader-dek"
  }, letter.dek), /*#__PURE__*/React.createElement("div", {
    className: "kit-reader-byline"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/sean-square.jpg",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Sean Kane"), /*#__PURE__*/React.createElement("span", null, "Teacher \xB7 12 years \xB7 Dad of three"))), /*#__PURE__*/React.createElement("div", {
    className: "kit-reader-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "gmp-dropcap"
  }, "A rule tells you what not to do. A ritual tells you what to do instead. We have almost none of the first and a lot of the second, and I think it\u2019s the only reason our weeks survive."), /*#__PURE__*/React.createElement("p", null, "\u201CNo screens at the table\u201D is a rule. It generates an argument every meal for two weeks, and then a slow, sour resentment forever after. \u201CWe do high-low at dinner \u2014 one high, one low, everyone gets a turn\u201D is a ritual. It generates a meal. The screen problem disappears, not because it was solved, but because it was replaced."), /*#__PURE__*/React.createElement("p", null, "Most of the parenting moments I\u2019m proudest of started as somebody else\u2019s rule that I converted into a ritual after it failed three Tuesdays in a row."), /*#__PURE__*/React.createElement("blockquote", {
    className: "kit-reader-pull"
  }, "Try this on the next thing that\u2019s annoying you: instead of writing down what they should stop doing, write down what they should do ", /*#__PURE__*/React.createElement("em", null, "instead.")), /*#__PURE__*/React.createElement("p", null, "Make it small. Make it physical. Make it the same every time. Run it for two weeks. Tell me what changes.")), /*#__PURE__*/React.createElement("div", {
    className: "kit-reader-foot"
  }, /*#__PURE__*/React.createElement(GMPSubscribeBlock, null)));
}
function CoursePage() {
  const weeks = [{
    n: "01",
    title: "Be the weather",
    body: "Set the climate before you set the rules. Daily 90-second arrival ritual."
  }, {
    n: "02",
    title: "Use the cooler",
    body: "The deliberate pause. Why hot decisions rot."
  }, {
    n: "03",
    title: "Inspect, don't expect",
    body: "Standards as a daily check-in, not a wish."
  }, {
    n: "04",
    title: "Three to one",
    body: "The praise ratio. How to actually do it on a Tuesday."
  }, {
    n: "05",
    title: "I do, we do, you do",
    body: "The teacher's scaffold, brought to homework, dishes, manners."
  }, {
    n: "06",
    title: "Repair on purpose",
    body: "The two-minute script. The only practice that makes the others work."
  }];
  return /*#__PURE__*/React.createElement("article", {
    className: "kit-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-page-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gmp-eyebrow"
  }, "The Course \xB7 6 weeks \xB7 self-paced"), /*#__PURE__*/React.createElement("h1", {
    className: "kit-page-h1"
  }, "Parent like a teacher. ", /*#__PURE__*/React.createElement("em", null, "Without quitting your job.")), /*#__PURE__*/React.createElement("p", {
    className: "kit-page-dek"
  }, "Six weeks. One practice each week. A small private cohort, a weekly office hour, and homework you can actually do at the kitchen table."), /*#__PURE__*/React.createElement("div", {
    className: "kit-page-cta-row"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "gmp-btn gmp-btn-primary"
  }, "Join the next cohort \u2014 $149 \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "gmp-btn gmp-btn-link"
  }, "Or download the syllabus"))), /*#__PURE__*/React.createElement("div", {
    className: "kit-syllabus"
  }, weeks.map(w => /*#__PURE__*/React.createElement("div", {
    key: w.n,
    className: "kit-syllabus-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-syllabus-week"
  }, "Week", /*#__PURE__*/React.createElement("b", null, w.n)), /*#__PURE__*/React.createElement("div", {
    className: "kit-syllabus-text"
  }, /*#__PURE__*/React.createElement("h3", null, w.title), /*#__PURE__*/React.createElement("p", null, w.body))))), /*#__PURE__*/React.createElement("div", {
    className: "kit-faq"
  }, /*#__PURE__*/React.createElement("h3", null, "Common questions"), /*#__PURE__*/React.createElement("details", null, /*#__PURE__*/React.createElement("summary", null, "How much time per week?"), /*#__PURE__*/React.createElement("p", null, "Two hours, tops. One reading, one practice, one short reflection. You can do it in a single Sunday morning if you batch it.")), /*#__PURE__*/React.createElement("details", null, /*#__PURE__*/React.createElement("summary", null, "Is this for parents or teachers?"), /*#__PURE__*/React.createElement("p", null, "Both. About 40% of cohorts are teachers, 60% are parents, and the practices are identical. The room is the room.")), /*#__PURE__*/React.createElement("details", null, /*#__PURE__*/React.createElement("summary", null, "What if I miss a week?"), /*#__PURE__*/React.createElement("p", null, "Self-paced. Lifetime access. The cohort runs on Sundays, but the materials are yours forever."))));
}
function AboutPage() {
  return /*#__PURE__*/React.createElement("article", {
    className: "kit-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-about-hero"
  }, /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/sean-studio.jpg",
    alt: "Sean Kane"
  })), /*#__PURE__*/React.createElement("div", {
    className: "kit-about-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gmp-eyebrow"
  }, "About"), /*#__PURE__*/React.createElement("h1", {
    className: "kit-page-h1"
  }, "Hi, I\u2019m ", /*#__PURE__*/React.createElement("em", null, "Sean.")), /*#__PURE__*/React.createElement("p", null, "I taught seventh-grade English for twelve years in a room with thirty-one chairs and a poster of Maya Angelou that someone had laminated badly. Then I had a son. Then two more."), /*#__PURE__*/React.createElement("p", null, "This newsletter is the long version of what the classroom got right about kids that the parenting books got wrong."))), /*#__PURE__*/React.createElement("div", {
    className: "kit-about-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-about-stat"
  }, /*#__PURE__*/React.createElement("b", null, "12"), /*#__PURE__*/React.createElement("span", null, "years teaching")), /*#__PURE__*/React.createElement("div", {
    className: "kit-about-stat"
  }, /*#__PURE__*/React.createElement("b", null, "3"), /*#__PURE__*/React.createElement("span", null, "sons at home")), /*#__PURE__*/React.createElement("div", {
    className: "kit-about-stat"
  }, /*#__PURE__*/React.createElement("b", null, "4,820"), /*#__PURE__*/React.createElement("span", null, "readers")), /*#__PURE__*/React.createElement("div", {
    className: "kit-about-stat"
  }, /*#__PURE__*/React.createElement("b", null, "1"), /*#__PURE__*/React.createElement("span", null, "letter, every Saturday"))));
}
function HomePage({
  onNav,
  onOpenLetter
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "kit-home"
  }, /*#__PURE__*/React.createElement(GMPHero, null), /*#__PURE__*/React.createElement(GMPPracticesGrid, {
    onPick: () => onNav("practices")
  }), /*#__PURE__*/React.createElement(GMPQuoteBlock, null), /*#__PURE__*/React.createElement(GMPLatestLetters, {
    onOpen: onOpenLetter
  }), /*#__PURE__*/React.createElement(GMPCourseStrip, {
    onJoin: () => onNav("course")
  }), /*#__PURE__*/React.createElement(GMPSubscribeBlock, null));
}
window.HomePage = HomePage;
window.PracticesPage = PracticesPage;
window.LettersPage = LettersPage;
window.LetterReader = LetterReader;
window.CoursePage = CoursePage;
window.AboutPage = AboutPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.jsx
try { (() => {
/* global React */

function GMPHero() {
  return /*#__PURE__*/React.createElement("section", {
    className: "kit-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-hero-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gmp-eyebrow"
  }, "Saturday letter \xB7 No. 47"), /*#__PURE__*/React.createElement("h1", {
    className: "kit-hero-h1"
  }, "From ", /*#__PURE__*/React.createElement("em", null, "room 201"), " to the kitchen table."), /*#__PURE__*/React.createElement("p", {
    className: "kit-hero-dek"
  }, "Twelve years teaching seventh-grade English. Three sons at home. One Saturday note a week on what the classroom got right about kids \u2014 and what the parenting books didn't."), /*#__PURE__*/React.createElement("form", {
    className: "kit-hero-form",
    onSubmit: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "you@yourkitchen.com"
  }), /*#__PURE__*/React.createElement("button", null, "Subscribe \u2192")), /*#__PURE__*/React.createElement("p", {
    className: "kit-hero-fine"
  }, "Free. One letter a week. 4,820 parents and teachers reading.")), /*#__PURE__*/React.createElement("figure", {
    className: "kit-hero-fig"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/sean-hero.jpg",
    alt: "Sean Kane"
  }), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("span", {
    className: "kit-hero-figcap-name"
  }, "Sean Kane"), /*#__PURE__*/React.createElement("span", {
    className: "kit-hero-figcap-role"
  }, "Teacher \xB7 12 years \xB7 Dad of three"))));
}
function GMPPracticesGrid({
  onPick
}) {
  const rows = [{
    n: "01",
    tag: "Foundations",
    title: "Be the weather",
    body: "The mood you carry is the climate they live in."
  }, {
    n: "02",
    tag: "Regulation",
    title: "Use the cooler",
    body: "Adrenaline doesn't write good consequences."
  }, {
    n: "03",
    tag: "Standards",
    title: "Inspect, don't expect",
    body: "Expectation is passive. Inspection is the work."
  }, {
    n: "04",
    tag: "Praise",
    title: "Three to one",
    body: "Three observations of growth for every correction."
  }, {
    n: "05",
    tag: "Skill-building",
    title: "I do, we do, you do",
    body: "Independence is taught. Confusion is the default."
  }, {
    n: "06",
    tag: "Repair",
    title: "Bad moment, great opportunity",
    body: "The lesson lives in the apology, not the argument."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "kit-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gmp-eyebrow"
  }, "The Practices"), /*#__PURE__*/React.createElement("h2", {
    className: "kit-section-h2"
  }, "Six things I do every day \u2014 ", /*#__PURE__*/React.createElement("em", null, "in the classroom, and at home.")), /*#__PURE__*/React.createElement("p", {
    className: "kit-section-dek"
  }, "The whole framework, in six rows. Read one. Try it for a week. Tell me what changed.")), /*#__PURE__*/React.createElement("div", {
    className: "kit-practices"
  }, rows.map(p => /*#__PURE__*/React.createElement("a", {
    key: p.n,
    href: "#",
    className: "kit-prac-row",
    onClick: e => {
      e.preventDefault();
      onPick && onPick(p);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-prac-num"
  }, p.n), /*#__PURE__*/React.createElement("div", {
    className: "kit-prac-tag"
  }, p.tag), /*#__PURE__*/React.createElement("div", {
    className: "kit-prac-text"
  }, /*#__PURE__*/React.createElement("h3", null, p.title), /*#__PURE__*/React.createElement("p", null, p.body)), /*#__PURE__*/React.createElement("div", {
    className: "kit-prac-arrow"
  }, "Read \u2192")))));
}
function GMPLatestLetters({
  onOpen
}) {
  const letters = [{
    d: "Apr",
    n: "26",
    tag: "Saturday note",
    read: "3 min",
    title: "On the difference between a rule and a ritual",
    dek: "A rule tells you what not to do. A ritual tells you what to do instead."
  }, {
    d: "Apr",
    n: "12",
    tag: "Essay",
    read: "8 min",
    title: "What \u201cinspect, don\u2019t expect\u201d looks like at 7am",
    dek: "The unsexy logistics of standards \u2014 a Tuesday, photographed."
  }, {
    d: "Apr",
    n: "5",
    tag: "Saturday note",
    read: "2 min",
    title: "The two-minute repair script we use after every rupture",
    dek: "\u201cI\u2019m sorry I yelled. I was overwhelmed. Here\u2019s what I\u2019ll try next time.\u201d"
  }, {
    d: "Mar",
    n: "29",
    tag: "Saturday note",
    read: "3 min",
    title: "Why I stopped saying \u201cgood job\u201d \u2014 and what I say instead",
    dek: "Three observations beat one compliment, every time."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "kit-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gmp-eyebrow"
  }, "The Saturday letter \xB7 Latest"), /*#__PURE__*/React.createElement("h2", {
    className: "kit-section-h2"
  }, "One letter, every Saturday. ", /*#__PURE__*/React.createElement("em", null, "Plainspoken."))), /*#__PURE__*/React.createElement("div", {
    className: "kit-letters"
  }, letters.map((L, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    className: "kit-letter",
    onClick: e => {
      e.preventDefault();
      onOpen && onOpen(L);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-letter-date"
  }, /*#__PURE__*/React.createElement("b", null, L.d), /*#__PURE__*/React.createElement("span", null, L.n)), /*#__PURE__*/React.createElement("div", {
    className: "kit-letter-tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit-letter-dot"
  }), L.tag), /*#__PURE__*/React.createElement("div", {
    className: "kit-letter-text"
  }, /*#__PURE__*/React.createElement("h4", null, L.title), /*#__PURE__*/React.createElement("p", null, L.dek)), /*#__PURE__*/React.createElement("div", {
    className: "kit-letter-read"
  }, L.read)))), /*#__PURE__*/React.createElement("div", {
    className: "kit-section-foot"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "gmp-btn gmp-btn-ghost"
  }, "Browse the archive \u2192")));
}
function GMPCourseStrip({
  onJoin
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "kit-course"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-course-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gmp-eyebrow",
    style: {
      color: "var(--accent-soft)"
    }
  }, "The Course \xB7 6 weeks \xB7 self-paced"), /*#__PURE__*/React.createElement("h2", {
    className: "kit-course-h2"
  }, "Parent like a teacher. ", /*#__PURE__*/React.createElement("em", null, "Without quitting your job.")), /*#__PURE__*/React.createElement("p", null, "Six weeks. Six practices. A weekly cohort, a private feed, and the same homework I gave my seventh-graders \u2014 minus the trumpet recital."), /*#__PURE__*/React.createElement("div", {
    className: "kit-course-row"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "gmp-btn",
    style: {
      background: "var(--accent)",
      color: "var(--paper)",
      borderColor: "var(--accent)"
    },
    onClick: e => {
      e.preventDefault();
      onJoin && onJoin();
    }
  }, "Join the next cohort \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--paper)",
      fontWeight: 600,
      fontSize: 14,
      opacity: 0.85
    }
  }, "Or read the syllabus"))), /*#__PURE__*/React.createElement("div", {
    className: "kit-course-meta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "$149"), /*#__PURE__*/React.createElement("span", null, "once, lifetime access")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "6 weeks"), /*#__PURE__*/React.createElement("span", null, "self-paced cohort")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "1,240"), /*#__PURE__*/React.createElement("span", null, "parents enrolled"))));
}
function GMPQuoteBlock() {
  return /*#__PURE__*/React.createElement("section", {
    className: "kit-quote"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-quote-mark"
  }, "\u201C"), /*#__PURE__*/React.createElement("blockquote", null, "My wife used to say I had an unfair advantage. I didn\u2019t. I had ", /*#__PURE__*/React.createElement("em", null, "twelve years of practice"), " with other people\u2019s kids before I had any of my own."), /*#__PURE__*/React.createElement("div", {
    className: "kit-quote-attrib"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/sean-square.jpg",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Sean Kane"), /*#__PURE__*/React.createElement("span", null, "Teacher, twelve years \xB7 Dad of three"))));
}
function GMPSubscribeBlock() {
  return /*#__PURE__*/React.createElement("section", {
    className: "kit-subscribe"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit-subscribe-eyebrow"
  }, "The Saturday letter"), /*#__PURE__*/React.createElement("h2", {
    className: "kit-subscribe-h2"
  }, "One practice. One Saturday a month. ", /*#__PURE__*/React.createElement("em", null, "Free.")), /*#__PURE__*/React.createElement("p", null, "Joining 4,820 parents and teachers who like their advice plainspoken, short, and from someone who has actually run the room."), /*#__PURE__*/React.createElement("form", {
    className: "kit-subscribe-form",
    onSubmit: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "you@yourkitchen.com"
  }), /*#__PURE__*/React.createElement("button", null, "Subscribe \u2192")), /*#__PURE__*/React.createElement("p", {
    className: "kit-subscribe-fine"
  }, "No spam. Unsubscribe in one click. I read every reply."));
}
window.GMPHero = GMPHero;
window.GMPPracticesGrid = GMPPracticesGrid;
window.GMPLatestLetters = GMPLatestLetters;
window.GMPCourseStrip = GMPCourseStrip;
window.GMPQuoteBlock = GMPQuoteBlock;
window.GMPSubscribeBlock = GMPSubscribeBlock;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.jsx", error: String((e && e.message) || e) }); }

})();
