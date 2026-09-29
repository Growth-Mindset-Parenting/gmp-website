// Single source of truth for the refund guarantee.
//
// Autopilot (2026-09-29, Katie): its own refund terms live on the sales page
// (data/autopilot-sales.js) and win for that product — attend the first two
// lessons, run one Plug + Play playbook, email hello@ with the worksheet
// within 14 days of the cohort start. Refunds always go to hello@.
//
// The standard across every Growth Mindset product (2026-08-27, Katie):
//   - 14 days, matching the Amy Porterfield model
//   - the clock starts when ACCESS starts, not when money changes hands
//   - the effort bar is only ever what has actually been delivered by the
//     deadline — the first two modules, never "the whole course"
//
// Both the course page and the terms page read from here, so the wording
// cannot drift between them. The two Kajabi checkout themes must be updated
// by hand to match (they cannot pull from this site):
//   $499  offer BFeFvsHP -> theme 2166487087
//   plan  offer QYzJYerk -> theme 2166486730
export const GUARANTEE = {
  days: 14,
  heading: 'Risk-free 14-day guarantee',
  body: [
    'Two weeks in, you’ll have worked through the first two modules and tried something real with your kid. That’s enough to know whether this is going to help.',
    'If it isn’t — if you’ve done the work and you don’t feel any more confident about these years — email Sean, tell him what you tried, and he’ll refund you in full.',
    'You bring the commitment. We’ll take the risk.',
  ],
  preorderNote: 'Pre-ordering? Your two weeks start the day the course opens, not the day you buy.',
  short: '14-day guarantee',
  email: 'hello@growthmindsetparenting.com',
};
