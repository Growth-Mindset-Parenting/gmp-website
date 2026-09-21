// Checks the waitlist source mapping. Run: node scripts/test-waitlist-source.mjs
// Needs Node >= 22.7 (it imports a .js file from a package with no
// "type": "module", which older Node will not read as a module).
import { waitlistSourceKey, WL_FROM_TAGS } from '../lib/waitlist-source.js';

const cases = [
  // The links we hand out: utm_content decides.
  [{ utm_content: 'capable-manychat', utm_medium: 'dm' }, 'capable'],
  [{ utm_content: 'script-manychat', utm_medium: 'dm' }, 'script'],
  [{ utm_content: 'five-minute-meeting-manychat', utm_medium: 'dm' }, 'script'],
  [{ utm_content: 'feelings-manychat' }, 'feelings'],
  [{ utm_content: 'bored-manychat' }, 'bored'],
  [{ utm_content: 'repair-manychat' }, 'repair'],
  [{ utm_content: 'guide-manychat' }, 'guide'],
  [{ utm_content: 'capable-essay', utm_medium: 'essay' }, 'essay-capable'],
  [{ utm_content: 'five-minute-meeting-essay' }, 'essay-five-minute-meeting'],
  [{ utm_content: 'collapsing-cruelty-essay' }, 'essay-collapsing-cruelty'],
  [{ utm_content: 'link_in_bio', utm_source: 'linktree' }, 'bio'],
  [{ utm_content: 'banner', utm_source: 'website' }, 'banner'],

  // utm_content wins over the medium fallback.
  [{ utm_content: 'capable-manychat', utm_medium: 'email' }, 'capable'],

  // Capitalisation and stray spaces are the same link.
  [{ utm_content: ' Capable-ManyChat ' }, 'capable'],

  // No utm_content: fall back to the medium, then the source.
  [{ utm_medium: 'email', utm_source: 'newsletter' }, 'newsletter'],
  [{ utm_medium: 'banner', utm_source: 'website' }, 'banner'],
  [{ utm_medium: 'cpc', utm_source: 'facebook' }, 'ads'],
  [{ utm_medium: 'bio', utm_source: 'linktree' }, 'bio'],
  [{ utm_source: 'linktree' }, 'bio'],

  // Untagged traffic is still accounted for, never dropped.
  [{ utm_source: 'instagram.com', utm_medium: 'referral' }, 'other'],
  [{}, 'other'],
  [undefined, 'other'],

  // Junk must not throw.
  [{ utm_content: 42, utm_medium: null }, 'other'],
  [null, 'other'],

  // Values that exist on every object must not be mistaken for a source.
  [{ utm_content: 'constructor' }, 'other'],
  [{ utm_content: '__proto__' }, 'other'],
  [{ utm_medium: 'tostring' }, 'other'],
];

let failed = 0;
for (const [fields, expected] of cases) {
  const got = waitlistSourceKey(fields);
  const ok = got === expected;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${JSON.stringify(fields)} -> ${got}${ok ? '' : ` (expected ${expected})`}`);
}

// Every source key must have a Kit tag id behind it.
for (const [, expected] of cases) {
  if (!WL_FROM_TAGS[expected]) {
    console.log(`FAIL  no Kit tag id for source key "${expected}"`);
    failed++;
  }
}

console.log(`\n${cases.length} cases, ${failed} failed`);
process.exit(failed ? 1 : 0);
