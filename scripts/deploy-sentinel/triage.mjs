#!/usr/bin/env node
/**
 * Deploy Sentinel — deterministic triage (no AI).
 *
 * Runs inside the deploy-sentinel.yml workflow when a Vercel deployment
 * reports failure via GitHub's deployment_status event. Responsibilities:
 *
 *   1. Parse the event → repo, branch, sha, environment, deployment host.
 *   2. Fetch the build log tail from the Vercel API.
 *   3. Dedupe against open Ops Platform items (the ops item IS the state
 *      store — its existence means "this branch+sha was already handled",
 *      and [sentinel:*] markers in its detail record what happened).
 *   4. File or update the ops item.
 *   5. Emit step outputs telling the workflow what to do next.
 *
 * Outputs (written to $GITHUB_OUTPUT):
 *   action        one of: agent | skip-duplicate | sentinel-branch-failed
 *   prod          "true" when the failed deployment targeted Production
 *   retry_allowed "true" only on the FIRST failure of a branch+sha (and
 *                 never for Production — the agent must not touch prod)
 *   item_id       ops item UUID
 *   branch / sha7 / deployment_host — context for the agent step
 *
 * State model across runs (multi-run tested in triage.test.mjs):
 *   run 1 (new branch+sha)      → file item, action=agent, retry allowed
 *   run 2 (same branch+sha)     → update item, action=agent, retry NOT
 *                                 allowed (the retry already failed) — unless
 *                                 [sentinel:diagnosed] is present, then skip
 *   run 3 (new sha, same branch)→ fresh item, fresh cycle
 *
 * Env: OPS_API_URL, OPS_API_TOKEN (required); VERCEL_TOKEN (log fetch);
 *      VERCEL_API_BASE, VERCEL_TEAM_ID (overridable for tests);
 *      SENTINEL_EVENT_PATH (defaults to GITHUB_EVENT_PATH);
 *      SENTINEL_SMOKE=1 marks the filed item [SMOKE] for workflow_dispatch
 *      end-to-end tests; SENTINEL_OUT_DIR for the log excerpt file.
 */

import { readFileSync, writeFileSync, appendFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OPS_API_URL = requireEnv("OPS_API_URL");
const OPS_API_TOKEN = requireEnv("OPS_API_TOKEN");
const VERCEL_TOKEN = process.env.VERCEL_TOKEN ?? "";
const VERCEL_API_BASE = process.env.VERCEL_API_BASE ?? "https://api.vercel.com";
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID ?? "team_COIeZMUBv3i9JwoSnR8gMbof";
const WORKSPACE = "growth-mindset";
const SMOKE = process.env.SENTINEL_SMOKE === "1";
const OUT_DIR = process.env.SENTINEL_OUT_DIR ?? "/tmp/deploy-sentinel";
const LOG_TAIL_LINES = 150;

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required env: ${name}`);
    process.exit(1);
  }
  return v;
}

function setOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
  }
  console.log(`output: ${key}=${value}`);
}

// Fail fast on a hung API rather than stalling to the job timeout.
const FETCH_TIMEOUT = { signal: AbortSignal.timeout(30_000) };

async function opsRequest(method, path, body) {
  const res = await fetch(`${OPS_API_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${OPS_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    ...FETCH_TIMEOUT,
  });
  if (!res.ok) {
    throw new Error(
      `ops API ${method} ${path} → ${res.status}: ${(await res.text()).slice(0, 300)}`,
    );
  }
  return res.json();
}

async function fetchBuildLogTail(host, rawTargetUrl) {
  // branchRef/commitMessage come from Vercel's deployment meta. They matter
  // because GitHub's deployment.ref for Vercel-created deployments is the
  // COMMIT SHA, not the branch name (confirmed live 2026-07-13) — without
  // meta, the sentinel/* loop guard and fix-PR base branch would never match.
  const none = (text) => ({ text, deploymentId: "", branchRef: "", commitMessage: "" });
  if (!VERCEL_TOKEN) return none("(no VERCEL_TOKEN — build log unavailable)");
  try {
    const headers = { Authorization: `Bearer ${VERCEL_TOKEN}` };
    let dep = await (
      await fetch(`${VERCEL_API_BASE}/v13/deployments/${host}?teamId=${VERCEL_TEAM_ID}`, {
        headers,
        ...FETCH_TIMEOUT,
      })
    ).json();
    if (!dep.id) {
      // For failed deployments Vercel's target_url may point at the
      // vercel.com inspector page rather than the deployment host — fall
      // back to a dpl_* id embedded in the URL path.
      const dplMatch = (rawTargetUrl ?? "").match(/dpl_[A-Za-z0-9]+/);
      if (dplMatch) {
        dep = await (
          await fetch(
            `${VERCEL_API_BASE}/v13/deployments/${dplMatch[0]}?teamId=${VERCEL_TEAM_ID}`,
            { headers, ...FETCH_TIMEOUT },
          )
        ).json();
      }
    }
    if (!dep.id) return none(`(deployment lookup failed: ${JSON.stringify(dep).slice(0, 200)})`);
    const meta = {
      deploymentId: dep.id,
      branchRef: dep.meta?.githubCommitRef ?? "",
      commitMessage: dep.meta?.githubCommitMessage ?? "",
    };
    const events = await (
      await fetch(
        `${VERCEL_API_BASE}/v3/deployments/${dep.id}/events?limit=2000&builds=1&teamId=${VERCEL_TEAM_ID}`,
        { headers, ...FETCH_TIMEOUT },
      )
    ).json();
    if (!Array.isArray(events)) {
      return { text: `(log fetch failed: ${JSON.stringify(events).slice(0, 200)})`, ...meta };
    }
    const lines = events
      .map((e) => e?.payload?.text ?? e?.text)
      .filter((t) => typeof t === "string" && t.trim() !== "");
    return {
      text: lines.slice(-LOG_TAIL_LINES).join("\n") || "(build log empty)",
      ...meta,
    };
  } catch (err) {
    return none(`(build log fetch error: ${err.message})`);
  }
}

function parseEvent() {
  const path = process.env.SENTINEL_EVENT_PATH ?? process.env.GITHUB_EVENT_PATH;
  if (!path) throw new Error("No event payload path (SENTINEL_EVENT_PATH / GITHUB_EVENT_PATH)");
  const event = JSON.parse(readFileSync(path, "utf8"));
  const status = event.deployment_status ?? {};
  const targetUrl = status.target_url ?? "";
  return {
    repo: event.repository?.full_name ?? "unknown/unknown",
    branch: event.deployment?.ref ?? "unknown",
    sha7: (event.deployment?.sha ?? "0000000").slice(0, 7),
    environment: status.environment ?? "Preview",
    state: status.state ?? "unknown",
    host: targetUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, ""),
    targetUrl,
  };
}

async function main() {
  const ev = parseEvent();
  const isProd = /^prod/i.test(ev.environment);
  const smokePrefix = SMOKE ? "[SMOKE] " : "";

  mkdirSync(OUT_DIR, { recursive: true });
  const {
    text: logTail,
    deploymentId,
    branchRef,
    commitMessage,
  } = await fetchBuildLogTail(ev.host, ev.targetUrl);
  writeFileSync(join(OUT_DIR, "build-log.txt"), logTail);

  // GitHub's deployment.ref for Vercel deployments is the commit SHA —
  // Vercel's own meta carries the real branch name. Prefer it everywhere
  // (title stability, loop guard, agent's fix-PR base).
  const branch = branchRef || ev.branch;
  const title = `${smokePrefix}[deploy-sentinel] ${ev.repo} ${branch} @ ${ev.sha7}`;
  console.log(`Triage: ${title} (env=${ev.environment}, state=${ev.state})`);

  setOutput("prod", String(isProd));
  setOutput("branch", branch);
  setOutput("sha7", ev.sha7);
  setOutput("deployment_host", ev.host);
  setOutput("deployment_id", deploymentId);

  const { items } = await opsRequest("GET", `/api/ops/items?workspace=${WORKSPACE}`);

  // Loop guard: a failed build on one of the sentinel's OWN fix branches
  // must never spawn another fix branch. File for a human instead —
  // once per branch+sha (guard items dedupe like everything else).
  // Two independent signals (defense in depth, since branch resolution
  // depends on the Vercel meta being present): the resolved branch name,
  // and the sentinel's own commit-message prefix.
  const isSentinelOwnWork =
    branch.startsWith("sentinel/") || commitMessage.startsWith("[deploy-sentinel] fix:");
  if (isSentinelOwnWork) {
    const guardTitle = `${smokePrefix}[deploy-sentinel] own fix-PR build failed: ${ev.repo} ${branch} @ ${ev.sha7}`;
    let item = items.find((i) => i.title === guardTitle && i.status !== "done");
    if (!item) {
      ({ item } = await opsRequest("POST", "/api/ops/items", {
        workspace: WORKSPACE,
        title: guardTitle,
        detail:
          `The sentinel's fix branch itself failed to build — no further automated fixes will be attempted (loop guard).\n` +
          `Deployment: https://${ev.host}\n\nBuild log tail:\n\`\`\`\n${logTail.slice(-3000)}\n\`\`\``,
        needs_human: "katie",
        priority: "high",
      }));
    }
    setOutput("action", "sentinel-branch-failed");
    setOutput("retry_allowed", "false");
    setOutput("item_id", item.id);
    return;
  }

  // Dedupe: an open (not done) item with this exact title means this
  // branch+sha already went through at least one sentinel cycle.
  const existing = items.find((i) => i.title === title && i.status !== "done");

  if (!existing) {
    const detail =
      `Vercel deployment failed.\n` +
      `Repo: ${ev.repo}\nBranch: ${branch}\nCommit: ${ev.sha7}\nEnvironment: ${ev.environment}\n` +
      `Deployment: https://${ev.host}\n\nBuild log tail:\n\`\`\`\n${logTail.slice(-3000)}\n\`\`\``;
    const { item } = await opsRequest("POST", "/api/ops/items", {
      workspace: WORKSPACE,
      title,
      detail,
      urgent: isProd,
      priority: isProd ? "high" : "medium",
      ...(isProd ? { needs_human: "katie" } : {}),
    });
    setOutput("action", "agent");
    // Production deployments are never auto-retried or auto-modified.
    setOutput("retry_allowed", String(!isProd));
    setOutput("item_id", item.id);
    return;
  }

  if ((existing.detail ?? "").includes("[sentinel:diagnosed]")) {
    // Already diagnosed once — don't burn agent runs re-diagnosing the same
    // commit. The ops item is already in front of a human.
    setOutput("action", "skip-duplicate");
    setOutput("retry_allowed", "false");
    setOutput("item_id", existing.id);
    return;
  }

  // Same branch+sha failed again (e.g. after the sentinel's one retry).
  // Escalate to diagnosis; a second retry is never allowed.
  await opsRequest("PATCH", `/api/ops/items/${existing.id}`, {
    workspace: WORKSPACE,
    detail: `${existing.detail ?? ""}\n\n[sentinel:refailed] Same commit failed again — escalating to diagnosis (no more retries).`,
  });
  setOutput("action", "agent");
  setOutput("retry_allowed", "false");
  setOutput("item_id", existing.id);
}

main().catch((err) => {
  console.error(`Triage failed: ${err.message}`);
  process.exit(1);
});
