// content/essays/collapsing-cruelty.js
// The "Collapsing Cruelty" freebie, as a web page.
// Served at /freebies/collapsing-cruelty/read/ — linked from the Kit delivery email.
//
// Uses the same block types as capable.js, plus four for the toolkit:
//   h3        — small tracked subhead inside a section
//   tips      — short chips in a two-column grid (wide: true spans both)
//   phrases   — italic lines with an orange bar on the left
//   exchange  — kid says / you say pairs
//   followup  — numbered list of questions

export const COLLAPSING_CRUELTY_ESSAY = {
  slug: 'collapsing-cruelty',
  eyebrow: 'Collapsing Cruelty',
  titleLead: 'Collapsing',
  titleItalic: 'cruelty',
  dek: 'How parents can disrupt the function inside sibling cruelty and conflict.',
  topBanner: {
    src: '/images/autopilot-banner.png',
    mobileSrc: '/images/autopilot-banner-mobile.png',
    alt: 'Autopilot: a 5 week course built to help parents stop overfunctioning and develop their kids\' executive functioning. Join the waitlist.',
  },
  topCtaNote: 'Kids don’t learn executive function by being reminded. They learn it by succeeding inside good systems. Autopilot is my five-week course on building those systems at home. Launches in October. The waitlist hears first.',
  inside: [
    'Why cruelty is rewarding, and why that reward can be collapsed',
    'How to interrupt, separate and follow through without escalating',
    'Scripts for the moment, the pushback and the follow up',
  ],
  byline: 'Growth Mindset Parenting · Fourteen years in middle school classrooms · Three boys at home',
  metaTitle: 'Collapsing Cruelty: How Parents Can Disrupt Sibling Cruelty',
  metaDescription: 'An essay by Sean Kane for parents of middle schoolers: why sibling cruelty keeps paying off, and how to interrupt, separate and follow through without escalating. Scripts included.',

  sections: [
    {
      num: '01',
      label: 'In front of us',
      blocks: [
        { type: 'p', text: 'Cruelty between classmates is something parents rarely witness in real time. We see the aftermath when our children come home aggressive, withdrawn, angry, or in tears. We feel its impact without seeing the moment it happened.' },
        { type: 'p', text: 'Cruelty between siblings is different. It happens in front of us. It unfolds in the kitchen, in the car, in the hallway. And when it becomes patterned, it can feel like something is tearing a family apart from the inside. Parents begin to question the integrity of one child, fear for the safety and well-being of another, and quietly wonder where they went wrong.' },
        { type: 'p', text: 'Psychologists and clinicians offer clear warnings about the long-term damage of persistent patterns of cruelty. But in practice, it is often educators who stand on the front line of daily intervention. Educational research gives us a practical lens: ==cruelty continues when it is rewarded, and it collapses when it is consistently interrupted.==' },
      ],
    },
    {
      num: '02',
      label: 'The reward',
      headingLead: 'Where does it',
      headingItalic: 'come from?',
      blocks: [
        { type: 'p', text: 'The inclination toward cruelty in middle school isn’t mysterious. Like most maladaptive behaviors, it’s rewarding.' },
        { type: 'p', text: 'As children move into early adolescence, their drive for independence, identity, and social status intensifies. They are acutely aware of hierarchy. They notice who holds influence and who does not. In their own homes, they already observe power structures — parents hold authority, older siblings often hold leverage, younger siblings have less control. As their desire for autonomy grows, so does their experimentation with power.' },
        { type: 'strong', text: 'Cruelty is an efficient power grab. It establishes hierarchy quickly. It creates immediate control. It often produces a small but potent social reward — laughter, attention, influence, control.' },
        { type: 'p', text: 'Nearly every middle school child is quietly wrestling with insecurity, belonging, or identity, and that reward can feel stabilizing. Research on social learning and reinforcement theory consistently shows that behaviors followed by social reward are likely to be repeated. If ridicule produces belonging, it becomes functional.' },
        { type: 'p', text: 'We can understand that desire ==without permitting the behavior.==' },
      ],
    },
    {
      num: '03',
      label: 'The interruption',
      headingLead: 'How to disrupt cruelty: start early.',
      headingItalic: 'Interrupt consistently.',
      blocks: [
        { type: 'p', text: 'Veteran teachers recognize these patterns almost instantly. The most effective rarely see sustained bullying, not because it never begins, but because they interrupt it clearly and follow through without hesitation.' },
        { type: 'p', text: 'When cruelty is immediately deflated, it loses its reward. The behavior meant to generate status instead generates social correction. Over time, that shift in reinforcement changes the pattern.' },
        { type: 'strong', text: 'Parents have to initiate that.' },
        { type: 'p', text: 'Intervention does not require anger or long explanations. It requires clarity. A firm direction to stop, without accusation or debate, communicates that emotional safety is non-negotiable.' },
        { type: 'quotes', items: ['“We don’t speak to each other that way.”'] },
        { type: 'p', text: 'We can support interruption with separation. You can’t hit a target you don’t have access to, and separate spaces facilitate nervous system regulation and safety. The immediate separation of the parties is a strong behavioral cue, beyond the verbal cue, that indicates this is antisocial, dysfunctional behavior.' },
        { type: 'p', text: 'The first person we interact with is the victim. We define and affirm their right to safety, and help them regulate. Once again, we are reinforcing to the aggressor ==“this does not gain status, connection, or energy.”== The priority belongs to the other child.' },
        { type: 'p', text: 'We don’t leave the aggressor to linger in shame, but cruelty is not a socially healthy habit. A moment alone allows regulation to give way to self-awareness; both are essential precursors to accountability.' },
      ],
    },
    {
      num: '04',
      label: 'Differentiation',
      headingLead: 'What’s normal? What’s harmful?',
      headingItalic: 'What if it’s two-sided?',
      blocks: [
        { type: 'p', text: 'Among siblings, much of what we see is normal conflict — episodic disagreements where both parties escalate. These spats are often over resources, toys, time, space, attention, and create conflict.' },
        { type: 'p', text: 'Many parents are inclined to say, “let them sort it out,” and while I agree, we have to be judicious. Sorting things equitably, or kindly, is a skilled process and may go off the rails without pattern correction.' },
        { type: 'p', text: 'When aggression becomes one-sided — persistent name-calling, mockery, exclusion — when it moves from occasional to intentional, we are no longer looking at simple conflict. We are looking at a dynamic. A hierarchy, in which one sibling affirms their status by putting another down.' },
        { type: 'strong', text: 'When persistent, unchallenged aggression becomes normalized, bullies emerge inside households, not just playgrounds.' },
        { type: 'p', text: 'At times, kids will escalate each other. By the time a parent intervenes, there are two clear aggressors who have made no rights, and multiple wrongs. Separation is the starting point. We jump straight to direct removal from shared space and make it clear to both parties this is a time to regulate and prepare for accountability.' },
        { type: 'p', text: 'In these moments, each child will look to absolve their wrongs by pointing at the other child. This isn’t functional. ==Our homes are not a courtroom,== and if a child refuses that, insists on it, then parents don’t engage. We repeatedly redirect away from the past and towards solution. The solution is in two individuals being individually accountable and thinking about what each needs to do differently.' },
        { type: 'p', text: 'However, the subtle, casual, daily dismissals are harder to parse. Many older siblings aren’t going to be mean in the outright, visible way, but they may be intolerant, impatient, and reactive towards a younger sibling. Eye rolls, negative comments, impatience, and a general tone of intolerance hang off of older siblings and make a younger sibling feel small.' },
        { type: 'p', text: 'While this can feel understandable, the missing ingredients are rooted in two higher order skills — impulse control and self-awareness. Using our judgment we can decide to interrupt firmly, or subtly. Perhaps we skip ahead to separation, encouraging the two to give each other space.' },
        { type: 'p', text: 'We can use whatever tool is needed to bring the aggressor to self-control and self-awareness.' },
        { type: 'p', text: 'But the interruption and separation are starting points; behaviors like this demand follow up and repair so they don’t become patterns. Direct conversation about impulse control illustrates to the child that ==resisting the urge to comment, correct or react is kindness.== They may be fully self-aware that they feel annoyed or irritated, but they must understand that those feelings are not a permission slip towards cruelty.' },
      ],
    },
    {
      num: '05',
      label: 'Consequences',
      headingLead: 'Follow through',
      headingItalic: 'and fallout',
      blocks: [
        { type: 'p', text: 'If cruelty has already become functional for a child, resistance is predictable. Children do not voluntarily give up strategies that reliably produce reward.' },
        { type: 'p', text: 'Consistent consequences are essential. Behavioral research makes something very clear: ==consistency shapes behavior more effectively than intensity.== Moderate consequences applied reliably are more powerful than dramatic consequences applied sporadically.' },
        { type: 'p', text: 'In adolescence, consequences may include removal of devices, loss of privileges, or restitution through structured responsibility. The specific form matters less than the predictability. The message is simple: harmful behavior reduces freedom.' },
        { type: 'strong', text: 'In families, backlash is common. Children feel safe enough to object, blame, and escalate. Expect it. Hold your ground. Being dysregulated or annoyed does not justify creating harm.' },
        { type: 'p', text: 'When boundaries are inconsistent, reactions intensify. When they are clear and steady, friction decreases over time.' },
      ],
    },
    {
      num: '06',
      label: 'Repair',
      headingLead: 'Repair and',
      headingItalic: 'skill building',
      blocks: [
        { type: 'p', text: 'Parents understandably want to restore peace quickly. Apologies and repair conversations are valuable, but they cannot be rushed and they cannot replace accountability.' },
        { type: 'p', text: 'The child who was harmed needs clarity that they did not deserve that treatment. They deserve space to regulate and to feel safe again on their own terms.' },
        { type: 'p', text: 'Repair begins with acknowledgment of harm and moves toward understanding. Each child practices naming their feelings and recognizing impact. But consequence remains in place so that the learning endures. ==Emotional resolution does not erase behavioral responsibility.==' },
        { type: 'p', text: 'Ultimately, the goal is skill development. We help children recognize the early signals of annoyance, jealousy, frustration, insecurity, and embarrassment. We teach them to interrupt their own reactions, to tolerate discomfort, and to practice restraint. Over time, external adult interruption becomes an internal narrative and provides space for regulation.' },
        { type: 'p', text: 'At the same time, we deliberately build status in healthier directions. We reinforce kindness, humor, generosity, cooperation, vulnerability, and competence. A child with a secure sense of belonging and self-worth has less need to manufacture hierarchy through harm.' },
        { type: 'p', text: 'Cruelty collapses when it no longer produces reward and when healthier forms of influence feel more powerful.' },
        { type: 'strong', text: 'Consistency remains the intervention. Calm clarity remains the method. Emotional safety remains the standard.' },
      ],
    },
    {
      num: '07',
      label: 'Toolkit',
      className: 'es-toolkit',
      headingLead: 'Scripts',
      headingItalic: 'and tips',
      blocks: [
        { type: 'p', text: 'What to say in the moment, what to say when they push back, and what to ask once everyone has cooled off.' },
        { type: 'h3', text: 'As the parent…' },
        { type: 'tips', items: [
          { text: 'Be brief' },
          { text: 'Be firm and clear' },
          { text: 'Name the behavior' },
          { text: 'Don’t debate' },
          { text: 'Don’t ask questions' },
          { text: 'Don’t escalate emotions' },
          { text: 'Separation facilitates safety', wide: true },
          { text: 'Regulation and awareness are precursors to accountability', wide: true },
          { text: 'Impulse control is a form of kindness', wide: true },
        ] },
        { type: 'h3', text: 'Interruption phrases' },
        { type: 'phrases', items: [
          '“No. We won’t speak to anyone that way.”',
          '“Stop. That’s unkind and an unacceptable way to speak.”',
          '“Not okay. I won’t allow you to speak to your brother that way.”',
          '“If you can’t say something kind or kindly, say nothing please.”',
        ] },
        { type: 'h3', text: 'Objection phrases' },
        { type: 'exchange', items: [
          { kid: '“You don’t understand… like they’re so annoying.”', you: '“You might be right. Feeling annoyed is normal, but being annoyed isn’t permission to be unkind. If you need space, I can help with that.”' },
          { kid: '“This is crazy. You always take their side because they are younger.”', you: '“I’m not choosing sides. I’m responsible for everyone’s safety in this house. When words become harmful, I step in. I also want to help you productively manage what you’re feeling.”' },
          { kid: '“But what about what he said to me?! Didn’t you hear that?!?!”', you: '“I heard it. We’ll address that too. Right now, I’m talking about what you said. We each take responsibility for our own words.”' },
          { kid: '“Oh my god, you don’t even care. Like you don’t understand at all.”', you: '“I care enough to set boundaries around safety. Speaking respectfully is how we protect everyone here. I’m listening — we just won’t talk that way.”' },
          { kid: '“She is such a dramatic baby. I didn’t even say anything that bad. OMG, lol.”', you: '“You control what you say. You don’t control how it lands or how it feels. If your words hurt someone, we adjust them.”' },
          { kid: '“I said I was sorry!! OMG.”', you: '“I appreciate the apology. That tells me you understand something wasn’t okay. Now the goal is to change the behavior so we don’t repeat it.”' },
        ] },
        { type: 'h3', text: 'During follow up' },
        { type: 'followup', items: [
          '“Do you know why I pulled you aside? What happened?”',
          '“What was your intention in saying that or doing that?”',
          '“What do you think their intention is?”',
          '“Do you feel like you are treating them this way on purpose? Or is this incidental?”',
          '“Are you aware of the effect these have on them? What effect do you think those choices have on them?”',
          '“Is there something else you need them to understand? How can you communicate that in a healthy way?”',
          '“How can you control yourself in the future? What can I do or say to stop you or support you?”',
        ] },
      ],
    },
  ],

  next: {
    num: '08',
    label: 'From Growth Mindset Parenting',
    headingLead: 'Tired of reminding?',
    headingItalic: 'Autopilot',
    headingTail: 'moves the management of your kid’s life from you to them.',
    blocks: [
      { type: 'p', text: 'A five-week live course for parents of middle schoolers. One process at a time, without lowering the standard and without walking away. Launches live in October, with weekly office hours for the pushback and fallout.' },
    ],
    ctaLead: 'The waitlist hears first and gets access to the free workshop.',
    ctaLabel: 'Join the Autopilot waitlist',
    // Tagged so waitlist joins from this page show up in the "GMP Link Tracker" sheet (UTM tab).
    ctaHref: '/autopilot/?utm_source=website&utm_medium=essay&utm_campaign=autopilot-waitlist&utm_content=collapsing-cruelty-essay',
    signoffByline: 'Growth Mindset Parenting · Austin, TX',
    colophon: 'From Growth Mindset Parenting — the same practices Sean used in room 201, now at the kitchen table. Built on educational research, fourteen years in middle school classrooms, and three boys at home.',
  },
};
