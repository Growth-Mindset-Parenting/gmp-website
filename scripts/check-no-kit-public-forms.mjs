// Build guard: no form may post to Kit's public form endpoint from the browser.
//
// On 2026-09-23 the home page field guide form posted to
// app.kit.com/forms/<id>/subscriptions. Kit silently held some of those
// signups for a reCAPTCHA the site never showed, but still answered 200, so
// visitors were told "It's on its way" and got nothing. Every form now posts
// to /api/subscribe/ or /api/waitlist/ (Kit's server API, never held).
// This check fails the build if the old pattern comes back.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIRS = ['app', 'components', 'lib'];
const PATTERN = /app\.kit\.com\/forms/;
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(jsx?|tsx?|mjs)$/.test(name)) {
      readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
        if (PATTERN.test(line)) hits.push(`${p}:${i + 1}: ${line.trim()}`);
      });
    }
  }
}
DIRS.forEach(walk);

if (hits.length) {
  console.error('\nBuild blocked: a form posts to Kit\'s public form endpoint (app.kit.com/forms).');
  console.error('Kit silently drops some of those signups. Post to /api/subscribe/ instead.\n');
  hits.forEach((h) => console.error('  ' + h));
  process.exit(1);
}
console.log('check-no-kit-public-forms: ok');
