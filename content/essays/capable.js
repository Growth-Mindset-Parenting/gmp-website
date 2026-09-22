// content/essays/capable.js
// The "Capable" freebie, as a web page (replaces the PDF download).
// Served at /freebies/capable/read/ — linked from the Kit delivery email.
//
// Block types:
//   p       — body paragraph (serif). Wrap words in ==double equals== to make
//             them an orange highlight.
//   strong  — bold sans-serif paragraph (the "say it louder" lines)
//   lines   — short stacked lines with no gap between them
//   quotes  — big italic quotes (section 01 opener)
//   dashes  — the italic "—Did you brush your teeth?" list; last item is orange
//   asks    — the arrow question list with rules between items

export const CAPABLE_ESSAY = {
  slug: 'capable',
  eyebrow: 'Capable',
  titleLead: 'My kid is capable, so why am I still',
  titleItalic: 'doing everything?',
  dek: 'Our kids are smart, funny, and increasingly independent. And yet they are driving us to burnout. Here’s the problem hiding inside this phase, and one thing to look at differently this week.',
  bannerHref: '/autopilot/?utm_source=website&utm_medium=essay&utm_campaign=autopilot-waitlist&utm_content=capable-essay-banner',
  byline: 'Growth Mindset Parenting · Fourteen years in middle school classrooms · Three boys at home',
  metaTitle: 'My Kid Is Capable, So Why Am I Still Doing Everything?',
  metaDescription: 'An essay by Sean Kane for parents of middle schoolers: why capable kids still depend on you for everything, and one thing to look at differently this week.',

  sections: [
    {
      num: '01',
      label: 'Standing in the kitchen',
      blocks: [
        { type: 'quotes', items: [
          '“I’ve told you a thousand times.”',
          '“What is going to get you to understand?”',
          '“You need to start handling some of this on your own.”',
        ] },
        { type: 'p', text: 'We’re standing in the kitchen having just yelled across the house for the fourth time about the homework that isn’t done, the chore abandoned on a list on the fridge, trying to leave on time for the sports practice they somehow aren’t ready for.' },
        { type: 'strong', text: 'And there is this frustration itching inside of us that wants to scream, “I need you to step up and handle your own business.”' },
        { type: 'p', text: 'But we don’t, because we’re thoughtful parents. So we grit our teeth, grab the water bottle ourselves, and sigh about how much there is left to do. We’re overstimulated and overcompensating for a kid who we know is way more capable than this.' },
        { type: 'p', text: 'That’s what makes this phase so exhausting.' },
        { type: 'p', text: 'Our kids are smart. They are funny and interesting and increasingly independent. They can learn complicated things, manage friendships, memorize every player on an NBA roster, negotiate for 30 minutes about why they should be allowed to stay up later, and navigate technology better than we can.' },
        { type: 'p', text: 'And yet they are driving us to burnout, because we are still somehow saying:' },
        { type: 'dashes', items: [
          'Did you brush your teeth?',
          'Where is your backpack?',
          'You have practice in 20 minutes.',
          'Please unload the dishwasher.',
          'Seriously, the dishwasher.',
          'Did you finish the homework?',
        ] },
        { type: 'p', text: 'And eventually, that gets old. We are carrying an enormous amount of the thinking for everyone in our house, while the kids who want us to stop telling them what to do still depend on us to tell them what to do.' },
        { type: 'strong', text: 'We pop and yell, “I don’t ask you for much!” and take the iPad and the freedom because maybe that will finally make the point. Our kid stomps off to the room that hasn’t been cleaned in two weeks thinking, “I can’t do anything right and my parents are insane.”' },
        { type: 'p', text: 'Then everybody cools off, we repair, but tomorrow we do some version of the same thing again.' },
        { type: 'p', text: 'For a long time, people have said: this is just part of raising middle schoolers. ==It doesn’t have to be.==' },
      ],
    },
    {
      num: '02',
      label: 'The gap we fill',
      headingLead: 'The problem hiding',
      headingItalic: 'inside this phase',
      headingBreak: true,
      blocks: [
        { type: 'p', text: 'As kids get older, they want more control over their own lives. This is normal and we want it for them, too.' },
        { type: 'p', text: 'But their lives get much harder to manage.' },
        { type: 'p', text: 'There is more homework, more sports, more complicated schedules, more friends, more requests, more devices, more things to remember and more places where we expect them to contribute.' },
        { type: 'strong', text: 'We end up with a kid asking us to back off at almost exactly the same moment that we are looking at their life thinking, “I absolutely cannot back off. Have you seen what happens when I stop reminding you?”' },
        { type: 'p', text: 'That puts parents in an exhausting position.' },
        { type: 'p', text: 'When our kids can’t manage something, we fill the gap.' },
        { type: 'p', text: 'We remember practice. We check homework. We watch the clock. We ask about the backpack. We remind them about the dishwasher. We tell them they have ten minutes left. We notice the shoes sitting in the bedroom when everyone else is already in the car.' },
        { type: 'p', text: 'We do this because it works, but ==executive function problems only grow when we do the work.==' },
      ],
    },
    {
      num: '03',
      label: 'The cost',
      headingLead: 'There is a',
      headingItalic: 'distinct cost.',
      blocks: [
        { type: 'p', text: 'We replace our kid’s prefrontal cortex and do all of the thinking. We do all of the monitoring around the tasks they are capable of doing. Their autonomy lags because we replace it. The only thing our kids are learning is that they should be doing things when they are begged and barked at. That’s not functional growth, and the dysfunction has consequences.' },
        { type: 'p', text: 'Kids end up dependent when they want to be independent. Parents end up exhausted, frustrated and resentful. We lecture, and we plead. We punish, then bribe. They yell, then repair.' },
        { type: 'p', text: 'Relationships with our kids strain under the weight of laundry baskets, backpacks, and dirty towels. We spend so much time and energy trying to initiate basic tasks, and manage the emotions that come with it. ==Connection gets replaced by executive demand.==' },
        { type: 'p', text: 'And even though all of this starts to feel intensely personal, a lot of what we are fighting about is much more practical than that. There are skills our kids are still developing, and there are skills we were never taught, or never taught how to help them develop.' },
      ],
    },
    {
      num: '04',
      label: 'Knowing vs. doing',
      headingLead: 'This is why',
      headingItalic: 'executive function',
      headingTail: 'matters',
      blocks: [
        { type: 'p', text: 'Executive functions are the skills we use to organize and direct our own behavior.' },
        { type: 'p', text: 'They help us remember what we need, start something when it is time to start, ignore distractions, keep track of where we are in a process, notice when we’re falling behind, change the plan when something isn’t working, and eventually finish what we started.' },
        { type: 'p', text: 'We use these skills constantly as adults, often without realizing it.' },
        { type: 'p', text: 'Our kids are still learning how, and most of us were never taught how to teach them.' },
        { type: 'p', text: 'If we were lucky, we picked these skills up from routines, from a highly organized adult in our own childhood, from school, or simply from enough experience doing things ourselves that we eventually became capable.' },
        { type: 'p', text: 'So when our kid isn’t doing something they are clearly old enough to do, we tend to reach for the tools we do have that create urgency or resolution.' },
        { type: 'lines', items: [
          'We remind. Then we remind loudly.',
          'We lecture. We say, You need to be more responsible.',
          'We take the phone. We threaten their freedom.',
        ] },
        { type: 'p', text: 'And the conversation ends with them yelling, “I KNOW, DAD!!! GAHD.”' },
        { type: 'p', text: 'They do know, they do care, but the knowing and caring isn’t the problem, it’s in the doing. The gap between knowing what to do and doing it is in executive function. Psychologist Russell Barkley defines executive function problems as ==performance problems, not knowledge problems.==' },
        { type: 'p', text: 'Our kids know how much we do, they know we care and they want to help. They know they need to be more responsible. Every tool we reached for — the reminder, the lecture, the consequence — was aimed at what they know. But that was never the problem. The doing is skill rooted in the executive functions. ==That’s when my teacher brain took over.==' },
      ],
    },
    {
      num: '05',
      label: 'The teacher brain',
      headingLead: 'We know how to',
      headingItalic: 'teach things',
      blocks: [
        { type: 'strong', text: 'If I had a student who couldn’t write an essay, I would never say, “You are in seventh grade. You know how to write an essay.”' },
        { type: 'p', text: 'Even if that was the hope or expectation, we have to meet a kid where they are.' },
        { type: 'p', text: 'I would look at what I was asking the kid to do and figure out where the process was falling apart.' },
        { type: 'p', text: 'Can they come up with an idea but not organize it? Can they write a paragraph but not connect five of them? Do they understand the book but freeze when they see a blank page?' },
        { type: 'p', text: 'Then I would build enough support around that part of the process that the kid could practice doing it successfully.' },
        { type: 'lines', items: [
          'I wouldn’t lower the standard.',
          'I wouldn’t write the essay for them.',
          '**I would teach them to assemble the skills.**',
        ] },
        { type: 'p', text: 'For some reason, we don’t always think about family life this way.' },
        { type: 'strong', text: 'We tell kids to be responsible as though responsibility is something they should eventually decide to start doing. But I’m increasingly convinced that responsibility is something we can teach.' },
        { type: 'p', text: 'Not by doing everything for our kids, and not by suddenly backing away and waiting for them to figure it out.' },
        { type: 'p', text: 'There is a huge space between those two things. And ==that space is where a lot of family life can get much easier.==' },
      ],
    },
    {
      num: '06',
      label: 'This week',
      headingLead: 'Look at one thing',
      headingItalic: 'differently',
      headingTail: 'this week',
      blocks: [
        { type: 'p', text: 'Pick one thing you are constantly reminding your kid about. Don’t fix it, just note what you have to do to make it happen.' },
        { type: 'p', text: 'Maybe it’s the morning routine. Maybe it’s the afternoon. Maybe it’s homework, or chores, or lights out.' },
        { type: 'p', text: 'Then ask yourself:' },
        { type: 'asks', items: [
          'Why am I still doing this for them?',
          'What am I doing that they can do?',
          'What’s the cost?',
          'What has to change?',
        ] },
        { type: 'p', text: 'The regular demands of chores, homework, mornings and schedules arrive every day like some kind of surprise, and we use reminders, urgency and eventually emotion to hold everything together.' },
        { type: 'strong', text: 'The problem isn’t that our kids aren’t caring or capable. We never really thought about how to move the management of their lives from us to them.' },
        { type: 'p', text: 'That is a very different problem to solve, an objective, procedural and skills centered problem we can teach and they can learn.' },
      ],
    },
  ],

  next: {
    num: '07',
    label: 'What comes next',
    headingLead: 'That’s what I built',
    headingItalic: 'Autopilot',
    headingTail: 'for.',
    blocks: [
      { type: 'p', text: 'If you did the exercise above, you’re now holding a list of everything you do to make one task happen. The reminding, the checking, the clock-watching, the noticing.' },
      { type: 'p', text: 'That list is the gap. Not a character flaw in your kid, not a failure in you. It’s a handoff of skills nobody ever designed.' },
      { type: 'p', text: 'Autopilot is where we design it. Five weeks, one process at a time, moving the management of your kid’s life from you to them without lowering the standard and without walking away. ==A teacher’s answer to the stress of being a parent.==' },
      { type: 'p', text: 'The goal isn’t a perfect kid or house. It’s a kid who can increasingly run their own life, and a parent who knows how to help them do it.' },
      { type: 'p', text: 'Because we don’t actually want to spend these years having a better argument about the dishwasher. We just need them to help load it without the argument.' },
      { type: 'p', text: 'The course launches live in October. I won’t just teach, I’ll also run office hours every week where we handle all our kids’ pushback and fallout because we know knowing is different than doing.' },
    ],
    ctaLead: 'The waitlist hears first, gets access to the free workshop.',
    ctaLabel: 'Join the Autopilot waitlist',
    // Tagged so waitlist joins from this page show up in the "GMP Link Tracker" sheet (UTM tab).
    ctaHref: '/autopilot/?utm_source=website&utm_medium=essay&utm_campaign=autopilot-waitlist&utm_content=capable-essay',
    signoffByline: 'Growth Mindset Parenting · Austin, TX',
    colophon: 'From Growth Mindset Parenting — the same practices Sean used in room 201, now at the kitchen table. Built on educational research, fourteen years in middle school classrooms, and three boys at home.',
  },
};
