// Checks the popup switches itself at the right moments.
//
// The popups hand over to each other off the clock, with no one pressing
// anything — so the only thing standing between a correct hand-over and a
// wrong one is this arithmetic. Two of the three boundaries fall in the middle
// of launch week, and one of them lands an hour after Sean finishes teaching
// live, which is the worst possible time to find out it was an hour off.
//
// Run it with:  npx tsx Scripts/popup-phase-check.mjs
// (tsx, because data/site-popup.js imports without a file extension.)

// A dynamic import, not a static one: this project's package.json has no
// "type": "module", so a static named import of a .js file is read as CommonJS
// and the named export is not found.
const { phaseAt } = await import('../data/site-popup.js');

// Central time in October is UTC-5. Each case is the exact UTC instant.
const CASES = [
  ['2026-09-29T12:00:00Z', null, 'the day before it opens'],
  ['2026-09-30T04:59:00Z', null, 'one minute before Sep 30 starts in Texas'],
  ['2026-09-30T05:01:00Z', 'workshop', 'one minute after Sep 30 starts'],
  ['2026-10-07T22:59:00Z', 'workshop', 'an hour before the workshop begins'],
  ['2026-10-07T23:59:00Z', 'workshop', 'while the workshop is running'],
  ['2026-10-08T00:01:00Z', 'sales', 'one minute after the workshop ends'],
  ['2026-10-12T15:00:00Z', 'sales', 'the middle of cart week'],
  ['2026-10-17T01:59:00Z', 'sales', 'one minute before the cart closes'],
  ['2026-10-17T02:01:00Z', null, 'one minute after the cart closes'],
];

let failed = 0;
for (const [iso, expected, label] of CASES) {
  const actual = phaseAt(Date.parse(iso));
  const ok = actual === expected;
  if (!ok) failed += 1;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(42)} expected=${String(expected).padEnd(9)} actual=${actual}`,
  );
}

if (failed) {
  console.error(`\n${failed} boundary/boundaries wrong.`);
  process.exit(1);
}
console.log('\nAll popup phase boundaries correct.');
