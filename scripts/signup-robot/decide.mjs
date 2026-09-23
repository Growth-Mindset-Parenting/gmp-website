// What the signup robot does with one run's results, given the ops items
// already open. Pure — no network — so the multi-run behaviour is testable.
//
// The ops item is the robot's only memory between hourly runs:
//   broken, no open item   → file one, start the fixer agent
//   broken, item open      → leave it (no duplicate, no second agent run)
//   working, item open     → close it (a recovered form stops shouting)

export const TITLE_PREFIX = '[signup-robot]';

// Filed by the workflow when the robot itself crashes. Any run that gets far
// enough to decide() is proof it works again.
export const ROBOT_FAILED_TITLE = `${TITLE_PREFIX} the robot itself failed`;

export function itemTitle(key) {
  return `${TITLE_PREFIX} ${key} signup is broken`;
}

function detailFor(r) {
  const what =
    r.status === 'error'
      ? `The robot could not run this check, so the signup is unverified (not the same as fine).`
      : `A real test signup did not arrive in Kit correctly.`;
  return (
    `${what}\n\nForm: ${r.label}\nWhat happened: ${r.detail}\n\n` +
    `Filed automatically by the hourly signup robot (.github/workflows/signup-robot.yml). ` +
    `It closes itself the first run this signup works again.`
  );
}

export function decide(results, openItems) {
  const plan = { file: [], close: [], stillBroken: [], runAgent: false };
  for (const r of results) {
    const title = itemTitle(r.key);
    const open = openItems.find((i) => i.title === title && i.status !== 'done');
    const broken = r.status !== 'pass';
    if (broken && !open) plan.file.push({ key: r.key, title, detail: detailFor(r) });
    else if (broken && open) plan.stillBroken.push(open.id);
    else if (!broken && open) plan.close.push(open.id);
  }
  for (const i of openItems) {
    if (i.title === ROBOT_FAILED_TITLE && i.status !== 'done') plan.close.push(i.id);
  }
  plan.runAgent = plan.file.length > 0;
  return plan;
}
