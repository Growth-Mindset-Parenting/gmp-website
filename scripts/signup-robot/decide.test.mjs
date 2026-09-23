// Multi-run tests for the signup robot's filing decisions.
// Run: npm run test:signup-robot
//
// The ops item IS the robot's memory between hourly runs, so every case here
// feeds one run's output (the items it filed or closed) into the next run.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decide, itemTitle, ROBOT_FAILED_TITLE } from './decide.mjs';

const pass = (key) => ({ key, label: key, status: 'pass', detail: 'ok' });
const fail = (key) => ({ key, label: key, status: 'fail', detail: 'never reached Kit' });

// A tiny in-memory ops tracker that applies decide()'s plan, like robot.mjs does.
function tracker() {
  let items = [];
  let n = 0;
  return {
    open: () => items.filter((i) => i.status !== 'done'),
    all: () => items,
    run(results) {
      const plan = decide(results, this.open());
      for (const f of plan.file) items.push({ id: `item-${++n}`, title: f.title, detail: f.detail, status: 'ready' });
      for (const id of plan.close) items = items.map((i) => (i.id === id ? { ...i, status: 'done' } : i));
      return plan;
    },
  };
}

test('run 1: a broken signup is filed once and the fixer agent is started', () => {
  const t = tracker();
  const plan = t.run([pass('waitlist'), fail('newsletter')]);
  assert.equal(plan.file.length, 1);
  assert.equal(plan.file[0].title, itemTitle('newsletter'));
  assert.equal(plan.runAgent, true);
  assert.equal(t.open().length, 1);
});

test('run 2: still broken → no duplicate item, no second agent run', () => {
  const t = tracker();
  t.run([fail('newsletter')]);
  const plan = t.run([fail('newsletter')]);
  assert.equal(plan.file.length, 0);
  assert.equal(plan.runAgent, false);
  assert.deepEqual(plan.stillBroken, [t.open()[0].id]);
  assert.equal(t.open().length, 1);
});

test('run 3: signup works again → the open item closes itself', () => {
  const t = tracker();
  t.run([fail('newsletter')]);
  t.run([fail('newsletter')]);
  const plan = t.run([pass('newsletter')]);
  assert.equal(plan.close.length, 1);
  assert.equal(t.open().length, 0);
  assert.equal(plan.runAgent, false);
});

test('run 4: breaks again after recovering → a fresh item and a fresh agent run', () => {
  const t = tracker();
  t.run([fail('newsletter')]);
  t.run([pass('newsletter')]);
  const plan = t.run([fail('newsletter')]);
  assert.equal(plan.file.length, 1);
  assert.equal(plan.runAgent, true);
  assert.equal(t.all().length, 2);
  assert.equal(t.open().length, 1);
});

test('each signup type is tracked on its own', () => {
  const t = tracker();
  t.run([fail('waitlist'), fail('newsletter')]);
  assert.equal(t.open().length, 2);
  const plan = t.run([pass('waitlist'), fail('newsletter')]);
  assert.equal(plan.close.length, 1);
  assert.equal(t.open()[0].title, itemTitle('newsletter'));
});

test('a check that could not run is filed too — unverified is not the same as fine', () => {
  const t = tracker();
  const plan = t.run([{ key: 'six-middle-skills', label: 'Six Middle Skills', status: 'error', detail: 'Kit read failed' }]);
  assert.equal(plan.file.length, 1);
  assert.match(plan.file[0].detail, /could not run/i);
});

test('other open items on the tracker are never touched', () => {
  const plan = decide([pass('newsletter')], [{ id: 'x', title: 'Something unrelated', status: 'ready' }]);
  assert.deepEqual(plan.close, []);
});

test('all passing with nothing open → nothing to do', () => {
  const plan = decide([pass('waitlist'), pass('newsletter')], []);
  assert.deepEqual(plan, { file: [], close: [], stillBroken: [], runAgent: false });
});

test('the robot recovering from its own crash closes the "robot itself failed" item', () => {
  const plan = decide([pass('newsletter')], [{ id: 'crash', title: ROBOT_FAILED_TITLE, status: 'ready' }]);
  assert.deepEqual(plan.close, ['crash']);
  assert.equal(plan.runAgent, false);
});
