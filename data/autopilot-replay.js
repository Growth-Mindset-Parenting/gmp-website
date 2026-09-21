// Autopilot workshop replay page (/workshop/replay/) — all copy and links live
// here. Layout from the design handoff "Webinar Replay" (2026-09-15).
//
// The handoff's headline and subhead were placeholders; these match the
// workshop page (data/autopilot-workshop.js).
//
// Dates come from the launch plan (marketing-os src/lib/launch/plan-data.ts),
// which is the source of truth: the cart closes Fri 16 Oct at 9pm CT, and the
// replay comes down at midnight on Fri 9 Oct — 48 hours after the workshop.
// An earlier version of this file carried a Mon 19 Oct / 8pm CT cart close,
// left over from the pre-2026-09 date set. Change both lines together.

export const REPLAY = {
  // Replay embed URL (YouTube / Vimeo / Zoom recording). Empty shows the
  // "coming soon" card instead of a video.
  videoUrl: '',
  // Where the button goes: the Autopilot sales page.
  salesUrl: '/autopilot/',

  eyebrow: 'Limited time replay · available until Friday, October 9',
  headline: "Stop being your kid's",
  headlineAccent: 'prefrontal cortex.',
  subhead:
    "Mornings, homework, chores, the dishwasher — you remember it, you remind about it, you check again. In this 60-minute workshop I show you the classroom method for handing that load back to your kid, one system at a time.",
  videoTitle: "Workshop replay: Stop being your kid's prefrontal cortex",
  videoPlaceholder: 'The replay will be posted here soon.',
  cta: 'Enroll in Autopilot',
  ctaNote: 'Cart closes Friday, October 16 at 9pm CT',
  copyright: '© 2026 Growth Mindset Parenting',
  siteLabel: 'growthmindsetparenting.com',
};
