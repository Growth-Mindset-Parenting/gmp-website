import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseNewsletter } from './newsletter-parse.mjs';

// The 10.16 tab, as the Google Docs API hands it over: one line per paragraph,
// no blank lines between them, with Sean's drafting notes above and below.
const DRAFT_NOTES_TAB = [
  'Subject lines',
  'Curiosity: What my son saw in the World Series',
  'Tension: Your kid is going to throw wild pitches',
  'Promise: Your one job in the middle school years',
  'My pick: Tension. It reframes the thing parents dread.',
  'Openers',
  'Curiosity: We are not baseball people.',
  'Tension: Right now your kid is standing on a mound.',
  'Promise: If you\'ve ever wondered what your actual job is.',
  'I’m not a huge baseball guy. But the World Series starts today.',
  '“Yeah. No,” I stared dumbfounded as the pitcher reset.',
  'I couldn\'t imagine it.',
  '“Try that again.” There’s a good chance they will slow down.',
  'Editor’s notes',
  'Citation fix (important): The term you were reaching for is the imaginary audience.',
].join('\n');

test('drafting notes above and below the letter are not published', () => {
  const { letter } = parseNewsletter(DRAFT_NOTES_TAB, '10.16');
  assert.equal(letter.title, 'I’m not a huge baseball guy. But the World Series starts today.');
  assert.equal(letter.slug.startsWith('subject-lines'), false);
  const all = letter.body.join('\n');
  assert.doesNotMatch(all, /Subject lines|Openers|My pick|Curiosity:|Editor|Citation fix/);
});

test('each doc paragraph stays its own paragraph when there are no blank lines', () => {
  const { letter } = parseNewsletter(DRAFT_NOTES_TAB, '10.16');
  assert.deepEqual(letter.body, [
    'I’m not a huge baseball guy. But the World Series starts today.',
    '“Yeah. No,” I stared dumbfounded as the pitcher reset.',
    'I couldn\'t imagine it.',
    '“Try that again.” There’s a good chance they will slow down.',
  ]);
});

test('a normal tab still parses the same way', () => {
  const tab = ['Skill: Resilience', '', 'My favorite Parents', '', 'I have one dad friend.', '', '-Sean', '', 'Note 1: thread idea'].join('\n');
  const { letter } = parseNewsletter(tab, '10.8');
  assert.equal(letter.title, 'My favorite Parents');
  assert.equal(letter.slug, 'my-favorite-parents');
  assert.equal(letter.topic, 'resilience');
  assert.deepEqual(letter.body, ['My favorite Parents', 'I have one dad friend.']);
});

test('notes in a shape the parser does not know are refused, not published', () => {
  const tab = ['Hooks', 'Curiosity: one', 'Tension: two', 'The letter starts here.', 'Second paragraph.'].join('\n');
  const result = parseNewsletter(tab, '11.21');
  assert.equal(result.letter, null);
  assert.match(result.error, /notes/i);
});

test('an empty tab gives no letter and no error', () => {
  assert.deepEqual(parseNewsletter('\n\n', '11.28'), { letter: null, error: null });
});

test('other ways of writing the notes are caught too', () => {
  const body = ['The letter starts here.', 'Second paragraph.'];
  // Heading with a colon, labelled options: skipped cleanly.
  let r = parseNewsletter(['Openers:', 'Curiosity: one', ...body].join('\n'), '11.21');
  assert.deepEqual(r.letter.body, body);
  // Editors' notes / bare Notes: heading ends the letter.
  for (const heading of ['Editors’ notes', 'Notes:', 'Editor notes']) {
    r = parseNewsletter([...body, heading, 'Fix the citation.'].join('\n'), '11.21');
    assert.deepEqual(r.letter.body, body, heading);
  }
  // Numbered options under a heading: refused.
  r = parseNewsletter(['Subject lines', '1. First idea', '2. Second idea', ...body].join('\n'), '11.21');
  assert.equal(r.letter, null);
  assert.match(r.error, /notes/i);
  // Unknown label line on top: refused.
  r = parseNewsletter(['Ideas for the hook:', ...body].join('\n'), '11.21');
  assert.equal(r.letter, null);
});
