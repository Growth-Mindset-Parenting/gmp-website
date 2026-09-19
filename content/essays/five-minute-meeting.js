// content/essays/five-minute-meeting.js
// The "Five Minute Meeting" freebie, as a web page.
// Served at /freebies/five-minute-meeting/read/ — shown in the freebie popup
// and linked from the Kit delivery email.
//
// Uses the existing block types from capable.js and collapsing-cruelty.js.
// No new types: each script question and each fallout is an h3 + body + phrase.

// Tagged so waitlist joins from this page show up as their own row in the
// "GMP Link Tracker" sheet (UTM tab).
const WAITLIST_HREF = '/autopilot/?utm_source=website&utm_medium=essay&utm_campaign=autopilot-waitlist&utm_content=five-minute-meeting-essay';

export const FIVE_MINUTE_MEETING_ESSAY = {
  slug: 'five-minute-meeting',
  eyebrow: 'The Five Minute Meeting',
  titleLead: 'The five minute',
  titleItalic: 'meeting',
  dek: 'A simple, repeatable conversation that helps your kid build executive function, without taking over their afternoon.',
  topCtaNote: 'Autopilot is Sean’s five-week live course for parents of middle schoolers. It moves the management of your kid’s life from you to them, one routine at a time. Launches in October; the waitlist hears first.',
  inside: [
    'Why struggle is how executive function gets built',
    'The three questions, in order',
    'What to say when it doesn’t go smoothly',
  ],
  byline: 'Growth Mindset Parenting · Fourteen years in middle school classrooms · Three boys at home',
  metaTitle: 'The Five Minute Meeting: Build Your Middle Schooler’s Executive Function',
  metaDescription: 'An essay by Sean Kane for parents of middle schoolers: the three-question afternoon conversation that builds executive function, plus what to say when your kid pushes back.',

  sections: [
    {
      num: '01',
      label: 'Why this matters',
      headingLead: 'The messy work of building',
      headingItalic: 'executive function',
      blocks: [
        { type: 'p', text: 'We know the prefrontal cortex is developing in early adolescence. What we forget is that our job isn’t to protect it — it’s to train it.' },
        { type: 'p', text: 'If we want our middle schooler to come home, put the shoes away, eat something that isn’t Takis, finish the homework, and get to practice on time, we have to help them build that scaffolding inside their own head.' },
        { type: 'p', text: 'It might start with narrating steps and writing checklists. But as they get older, our job shifts from handing them executive function to facilitating it.' },
        { type: 'p', text: 'That’s a slow, uneven process. One we rarely have patience for after tripping on their shoes on the way to remind them, again, about the homework they haven’t finished.' },
        { type: 'p', text: 'Here’s the thing educational research keeps making clear: ==struggle is the beginning of durable learning.== One of our jobs in middle school is to invite the struggle that comes with organizing our kid’s mental load.' },
        { type: 'strong', text: 'Our responsibility is to create just the right amount of stress — enough that they begin to develop skills that are just beyond their reach. Too much support and we end up doing the thinking for them. Too little structure and they’re dysregulated and feel incapable.' },
        { type: 'p', text: 'Brain development is a process of pruning and myelination. Removal and reinforcement. The circuits that fire, wire together. What doesn’t get used gets cut. Use it or lose it.' },
        { type: 'p', text: 'So if we tell our 13-year-old what to do every afternoon, the part of their brain that forms priorities, builds task lists, and manages time never gets used. Those skills atrophy.' },
        { type: 'p', text: 'Our job is to find the space that feels just out of reach. This is the ==Zone of Proximal Development== — the idea that growth happens in tasks just beyond someone’s current skill level. Things a young person can’t quite complete alone, but can complete with structure and support.' },
        { type: 'p', text: 'Our middle schoolers want independence. We want independence for them. But the road there runs through a rocky stretch of learning to manage responsibilities alongside needs and wants. Prioritization and emotional regulation become non-negotiable skills.' },
        { type: 'p', text: 'Which is why it’s not enough to ask “What do you have to do?” We also have to let them process the emotional roadblocks before they hit them. And we have to help them map the work onto a realistic time frame — because when demand escapes the time we actually have, stress spikes and urgency multiplies the load.' },
        { type: 'p', text: 'Below is a simple framework for starting that conversation.' },
      ],
    },
    {
      num: '02',
      label: 'The framework',
      headingLead: 'What it is, when to do it,',
      headingItalic: 'how it should feel',
      blocks: [
        { type: 'p', text: 'Your goal is to let kids narrate these questions and answers in their own head — so they can facilitate their own mental load, make effective choices with their time, and process the feelings that come with it.' },
        { type: 'h3', text: 'What' },
        { type: 'p', text: 'A casual, routine five-minute conversation that facilitates autonomy and task completion — and meets the developmental needs of a middle school kid. Done well, it doesn’t create conflict. ==It creates ownership, independent autonomy, and greater capacity.==' },
        { type: 'h3', text: 'When' },
        { type: 'p', text: 'Timing matters. You can’t launch this after your kid has crashed out. Use moments when they’re regulated. Repair after dysregulation, then come back.' },
        { type: 'h3', text: 'How' },
        { type: 'p', text: 'Cooperative, supportive, empathetic, action-oriented. Think of the boss who has your back. The teacher at your desk. The coach after a strikeout.' },
        { type: 'h3', text: 'The tone, in three voices' },
        { type: 'p', text: 'Borrow from people who’ve already done this for you.' },
        { type: 'strong', text: '“I trust you. What’s next? You lead, I’ll support.”' },
        { type: 'phrases', items: [
          '“How do I get you there?” — the boss on deadline.',
          '“Perfect, tell me what we’re working on.” — the teacher at your desk.',
          '“What pitches did you see out there?” — the coach after a strikeout.',
        ] },
      ],
    },
    {
      num: '03',
      label: 'The script',
      headingLead: 'Three questions.',
      headingItalic: 'In order.',
      blocks: [
        { type: 'p', text: 'You don’t need to memorize anything. The shape is what matters: ask, prioritize, check the temperature.' },
        { type: 'h3', text: '1 · The initial ask: open the door' },
        { type: 'p', text: 'A simple, neutral question. No agenda yet — just an invitation.' },
        { type: 'phrases', items: ['“Hey, when we get back home, what do you have to do this afternoon? Walk me through what you have going on.”'] },
        { type: 'h3', text: '2 · The priority: map demand to time' },
        { type: 'p', text: 'Help them be realistic about what the afternoon will actually require.' },
        { type: 'phrases', items: ['“What’s the most important or annoying thing, do you think? How long do you expect this stuff to take?”'] },
        { type: 'h3', text: '3 · Temperature check: name the feeling' },
        { type: 'p', text: 'Process the emotional roadblocks before they hit. Short. Sincere.' },
        { type: 'phrases', items: ['“Sounds good. How do you feel about all that?”'] },
      ],
    },
    {
      num: '04',
      label: 'When it doesn’t go smoothly',
      headingLead: 'Seven common fallouts,',
      headingItalic: 'and what to say',
      blocks: [
        { type: 'p', text: 'Not every conversation lands. Here’s how to read the pushback and keep moving.' },

        { type: 'h3', text: '1 · Their phone' },
        { type: 'p', text: 'These questions will make a kid uncomfortable. Phones make a kid comfortable. You can’t have a complex talk about task orientation while a kid is scrolling. Get the device away first.' },
        { type: 'p', text: '**The trick:** the phone goes away before the conversation starts — not after. You can’t out-talk a screen, so don’t try.' },
        { type: 'phrases', items: ['“Hey, can you put your phone in the spot? Or I can. Want to have a quick planning conversation?”'] },

        { type: 'h3', text: '2 · “But first I want to…”' },
        { type: 'p', text: 'Video games, tablets, and phones won’t expand mental capacity after school — they stimulate and dysregulate. Snacks, naps, exercise, music can help. Screens before tasks make your job 2× harder.' },
        { type: 'p', text: '**The trick:** first things first. If it matters to their development, the screen doesn’t get to stand in the way.' },
        { type: 'phrases', items: ['“Yeah, we’ll start with the stuff you listed. With a clear plan like that, it should be easy. Once it’s done, you can grab your phone for 30 minutes before practice.”'] },

        { type: 'h3', text: '3 · Grumble, huff, eye-roll' },
        { type: 'p', text: 'Probably age-appropriate. Tolerate it briefly, laugh it off, rally them. Expressive is fine — rude is not. Invite them back into the conversation, give them scaffolding to find momentum.' },
        { type: 'p', text: '**The trick:** don’t take the body language personally. A kid can be expressive without being rude — what you’re protecting is forward momentum, not their mood.' },
        { type: 'phrases', items: ['“Brutal. Unfair. Woeful. But also — done in probably 45 minutes. I’ll help.”'] },

        { type: 'h3', text: '4 · “Not right now, please.”' },
        { type: 'p', text: 'Respect a request for time, but watch for emotion used as an opt-out. Help them name what they need before they get back on task. Doomscrolling isn’t regulation — it’s stimulation.' },
        { type: 'p', text: '**The trick:** make clear the timeline isn’t negotiable. You’ll have to be annoying. ==Capacity doesn’t grow in comfort.==' },
        { type: 'phrases', items: ['“Sounds like a break and a snack first. That’s fair. Ten minutes or fifteen?”'] },

        { type: 'h3', text: '5 · “IDK.” Shrug.' },
        { type: 'p', text: 'Non-participation in their own life is not an option — but a shrug may mean they’re tired, hungry, overwhelmed, or genuinely can’t put their finger on it. Don’t ascribe malicious intent. Add scaffolding.' },
        { type: 'p', text: '**The trick:** be genuine in your engagement with their “I don’t know.” Treat it as missing information, not refusal — and supply the scaffolding (folder, calendar, snack) that helps them find it.' },
        { type: 'phrases', items: ['“Okay, cool. Let’s sit down and unpack a couple of folders real fast — that’ll help jog your memory. The calendar in the kitchen has your schedule.”'] },

        { type: 'h3', text: '6 · Clueless' },
        { type: 'p', text: 'More normal than we think. Don’t flip out. Go class by class. Walk through normal afterschool routines. Take this as a signal that they need conversation on a regular basis to master their schedule and routines.' },
        { type: 'p', text: '**The trick:** your calm is what gets them to a place where this isn’t so common. You wouldn’t get exasperated by a kid who forgot a math operation — you’d help them master it. Same here.' },
        { type: 'phrases', items: ['“It’s Monday. Last Monday you had a snack, did your math, put away the laundry, dinner at 6, baseball at 7. So — what’s different today?”'] },

        { type: 'h3', text: '7 · “Leave me alone. You’re annoying.”' },
        { type: 'p', text: 'That’s not an option. Demand may be uncomfortable but that’s how we grow. The rudeness is two missing skills: social cooperation and emotional regulation. Repair, then reprogram.' },
        { type: 'p', text: '**The trick:** read this as data, not defiance — they’ve decided that being dysregulated gives them the right to be rude. Name it, set the limit, then come back. That’s the reprogramming.' },
        { type: 'phrases', items: ['“You’re irritated, but don’t speak to me that way. I’ll stop talking. Give you a minute to zone out on the couch and reset when we get home. Then we’ll start the conversation again in twenty minutes. I’m sure it’ll go better.”'] },
      ],
    },
    {
      num: '05',
      label: 'Keep these in your pocket',
      headingLead: 'Five reminders for',
      headingItalic: 'the hard afternoons',
      blocks: [
        { type: 'asks', items: [
          'Too much support and you do the thinking for them. Too little structure and they’re dysregulated. Aim for just beyond reach.',
          'The phone goes away first. Always.',
          'Tone is everything. Cooperative, supportive, action-oriented. Never adversarial.',
          'Repair after the crash-out, then come back to the conversation. You always get another shot.',
          'This is a practice, not a fix. Run it Monday. Run it Tuesday. The reps are the point.',
        ] },
        { type: 'strong', text: 'Inspect, don’t expect. Three observations of growth for every correction.' },
      ],
    },
  ],

  next: {
    num: '06',
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
