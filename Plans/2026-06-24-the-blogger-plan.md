# The Blogger — Implementation Plan

## Context

Growth Mindset Parenting website (`growthmindsetparenting.com`) — Next.js 14 site hosted on Vercel.  
Repo: `Growth-Mindset-Parenting/gmp-website`  
Local path: `/Users/katiewest/Documents/Growth_Mindset/Website/`

The Blogger is a new AI employee that auto-generates SEO blog posts on a schedule and lets Sean publish them with one click.

**Architecture:**
```
GitHub Actions cron (1st + 15th of month)
  → scripts/generate-blog-post.mjs
    → reads next topic from content/blog-queue.json
    → reads Sean's compiled content Google Doc for source material
    → calls Anthropic Claude API to generate 1,500-2,500 word post
    → writes draft as new tab in blog-draft Google Doc
    → sends email to sean@growthmindsetparenting.com with link + "Publish" button

Sean clicks Publish
  → /api/publish-post (Next.js API route on GMP website)
    → verifies HMAC token
    → reads blog draft Google Doc tab
    → formats and appends to content/letters.js
    → commits + pushes to GitHub
    → Vercel auto-deploys
```

**Key IDs:**
- Sean's compiled content Google Doc: `1WNFlx8kGrIhfUfQa4jc_t7lg6yo2v0n_073Ve44gASI` (tab IDs below)
- Sean's Voice Profile doc: `14KbA7RxOWrlE42xJtS0Rtjl90ABBSdJ_iYbMRxOWpUY`
- Sean's Parenting Thesis doc: `1oL-2IZLSXzXw_56qP697wFUfOwOjaEOYXgWvXBPY-4Y`
- Blog draft Google Doc: `1Mh5FR_j_FdDJ8Ec5PQFxvnSzxsFGKkY1jfQpKz81ows` ("GMP — Blog Drafts") — already created and shared with service account as writer
- GMP Drive folder: `1_ezhy48-jZZ-bc-PjY7Ht8zL-8Hx-hj5`
- Sean's email: `sean@growthmindsetparenting.com`

**Existing patterns to follow:**
- `content/letters.js` — the array this system appends to. All blog posts go here as type `'blog'`.
- `scripts/sync-newsletters.mjs` — shows how Google Docs API authentication works (GOOGLE_SERVICE_ACCOUNT_KEY env var, `google.auth.GoogleAuth`)
- `.github/workflows/sync-newsletters.yml` — shows the GitHub Actions pattern with `permissions: contents: write`
- Service account: `marketing-os-doc-reader@claude-tools-workspace.iam.gserviceaccount.com` — already has access to both the newsletter doc and drive folder

**The 6 valid skill slugs** (for `topic` field):
`emotional-literacy`, `resilience`, `reflection`, `relationship`, `autonomy`, `adaptation`

**Blog post differences from newsletter:**
- `type: 'blog'` (not `'essay'`)
- Length: 1,500–2,500 words minimum
- Structure: Scene → Reframe → Research → Practical close
- Has SEO focus: H2/H3 headings, target keyword in title + first paragraph + subheadings
- Internal links to related letters where relevant
- Body array: paragraphs can include markdown headings (`## Heading`) — the site renderer already handles this

## Global Constraints

- **Node.js ESM** — all scripts use `.mjs` and `import` syntax (matches existing `sync-newsletters.mjs`)
- **No hardcoded secrets** — all API keys, doc IDs, emails via environment variables
- **No new npm packages** unless strictly necessary — use existing `googleapis` (already in package.json). For email, use `nodemailer` only if already present; otherwise use a simple `fetch` to a webhook or the Anthropic API's native HTTP. Check `package.json` first.
- **HMAC token for publish route** — `crypto.createHmac('sha256', process.env.PUBLISH_SECRET)` — Node.js built-in, no extra package
- **Blog draft tab naming** — tab title = topic title only (e.g., `Executive Function in Middle Schoolers`). No date prefix.
- **Blog posts prepend to LETTERS array** — same as newsletters; newest first
- **Permissions: contents: write** — all GitHub Actions workflows that push must have this (already set in sync-newsletters.yml)
- **letters.js pattern** — new entries use `type: 'blog'`, field order matches existing entries

---

## Task 1: blog-queue.json

**File:** `content/blog-queue.json`

Create a JSON file containing the queue of 10 blog post topics. The generate script reads from this queue (takes the first `pending` entry, generates the post, then marks it `done`).

**Schema:**
```json
{
  "queue": [
    {
      "id": 1,
      "title": "Executive Function in Middle Schoolers",
      "slug": "executive-function-middle-schoolers",
      "topic": "reflection",
      "keyword": "executive function middle school",
      "status": "pending"
    }
  ]
}
```

**Fields:**
- `id` — sequential integer
- `title` — human-readable topic title (also used as blog draft tab name in Google Docs)
- `slug` — URL slug for the post (`/writing/<slug>`)
- `topic` — one of the 6 valid skill slugs
- `keyword` — primary SEO keyword phrase (best-guess; can be refined later)
- `status` — `"pending"` | `"generated"` | `"published"`

**The 10 topics (in this order):**

| # | Title | Topic | Keyword |
|---|-------|-------|---------|
| 1 | Executive Function in Middle Schoolers | reflection | executive function middle school |
| 2 | Why Your Kid Shuts Down Emotionally | emotional-literacy | why kids shut down emotionally |
| 3 | How to Respond When Your Kid Gets Defensive | relationship | how to respond to defensive child |
| 4 | Sibling Cruelty: What's Actually Happening | relationship | sibling cruelty middle school |
| 5 | Screen Time and the Adolescent Brain | resilience | screen time adolescent brain |
| 6 | When Your Kid Has Zero Motivation | resilience | middle schooler no motivation |
| 7 | School Anxiety in Middle School: What Parents Miss | emotional-literacy | school anxiety middle school |
| 8 | Puberty and Emotional Explosions | emotional-literacy | puberty emotional outbursts |
| 9 | Friendship Drama in 6th-8th Grade | relationship | middle school friendship drama |
| 10 | Why Adolescents Can't Fall Asleep | reflection | why teenagers can't sleep |

**Commit message:** `feat: add blog post queue with 10 topics`

---

## Task 2: Reference Docs for The Blogger

**Files to create (plain text, inside the website repo so GitHub Actions can read them):**

1. `scripts/blogger-reference/voice_rules.md`
2. `scripts/blogger-reference/seo_guidelines.md`

These are reference documents read by The Blogger (included in the Claude API prompt for post generation). They must be accurate, concise, and actionable.

**For voice_rules.md:**

Read Sean's Voice Profile doc (`14KbA7RxOWrlE42xJtS0Rtjl90ABBSdJ_iYbMRxOWpUY`) and synthesize it into rules. The doc contains Sean's writing style, banned words/phrases, storytelling patterns, and the Final Test. Extract and format as clear rules The Blogger can follow.

**For seo_guidelines.md:**

Write SEO rules for blog posts that work with Sean's voice. Key rules:
- Title must contain the primary keyword phrase
- First paragraph must contain the keyword phrase naturally
- Use H2 subheadings (2-4 per post) that contain keyword variations
- H3 for sub-points where helpful
- Length: 1,500–2,500 words
- Include 1-2 internal links to related letters on the site (`/writing/<slug>`) where naturally relevant
- Meta description: 150-160 characters, includes keyword, is a complete sentence
- No keyword stuffing — keyword appears 3-5 times total in the post body
- Structure: Scene-opener → Reframe → Research/evidence → Practical close

**Commit message:** `feat: add The Blogger reference docs (voice rules, SEO guidelines)`

---

## Task 3: generate-blog-post.mjs + generate-blog-post.yml

**Files:**
- `scripts/generate-blog-post.mjs` — the generation script
- `.github/workflows/generate-blog-post.yml` — GitHub Actions cron

### generate-blog-post.mjs

**What it does:**

1. Reads `content/blog-queue.json`
2. Finds the first entry with `status: "pending"` — if none, exits with "Queue empty"
3. Reads Sean's compiled content Google Doc (ID: `1WNFlx8kGrIhfUfQa4jc_t7lg6yo2v0n_073Ve44gASI`, tab `t.h4dg0a4tsta2` = Instructions tab, OR read the full doc without a tab ID to get default content) — actually, reads the doc content to get source material for the topic being generated. Read the full document (no tab ID, which returns the default body) OR read all tabs to collect Sean's writing examples. **Use the full doc** to give Claude broad source material.
4. Calls the Anthropic Claude API (`claude-sonnet-4-6`) to generate a 1,500-2,500 word blog post
5. Writes the generated post as a new tab in the blog draft Google Doc (doc ID from env var `BLOG_DRAFT_DOC_ID`). Tab name = the topic title (e.g., `Executive Function in Middle Schedulers`).
6. Updates the entry in `blog-queue.json` from `pending` → `generated`, adds `generatedAt` ISO timestamp and `draftTabTitle` (the tab name)
7. Writes the updated blog-queue.json back to disk
8. Sends a notification email to `NOTIFICATION_EMAIL` env var

**Anthropic API call:**

Use the Anthropic Messages API directly via `fetch` (no SDK needed — keeps dependencies minimal). Endpoint: `https://api.anthropic.com/v1/messages`. Auth header: `x-api-key: ${process.env.ANTHROPIC_API_KEY}`. Model: `claude-sonnet-4-6`. Max tokens: 4096.

The system prompt should include:
- Sean's voice rules (read from `Growth_Mindset/AI_Employees/The_Blogger/Reference/voice_rules.md` at script startup, relative to repo root)
- SEO guidelines (read from `Growth_Mindset/AI_Employees/The_Blogger/Reference/seo_guidelines.md`)

Wait — those reference files are in `Growth_Mindset/AI_Employees/`, NOT inside the website repo. The script runs in GitHub Actions from the website repo root. The reference docs need to either be:
  - **Inside the website repo** (better for GitHub Actions)
  - Or fetched from Google Drive

Reference docs live at `scripts/blogger-reference/` inside the website repo (so GitHub Actions can read them without extra setup).

The user prompt to Claude:
```
Write a blog post for growthmindsetparenting.com on this topic:

Title: {topic.title}
Primary keyword: {topic.keyword}
Skill tag: {topic.topic}

Source material from Sean's writing:
{google_doc_content}

Requirements:
- 1,500-2,500 words
- Follow Sean's voice exactly (see system prompt)
- Follow SEO guidelines (see system prompt)
- Output format: Return ONLY the blog post content as paragraphs separated by blank lines.
  Start with a scene-opening paragraph (no title heading — the title is separate).
  Use ## for H2 subheadings and ### for H3 subheadings where appropriate.
  Do not include a title line at the top.
```

The response is the blog post body. Parse it into paragraphs (split on double newlines).

**Email notification:**

Use `nodemailer` if already in package.json. If not, use the Gmail API (already available via `googleapis` which IS in package.json). Check package.json first.

Actually, to keep it simple: use `fetch` to send via a transactional email service, OR use the existing `googleapis` Gmail API. The simplest approach: use `nodemailer` with SMTP if the SMTP env vars exist, otherwise skip email and just log.

**Better approach:** Use the Gmail API via `googleapis` (already in package.json). Auth via service account with `gmail.send` scope. Send to `NOTIFICATION_EMAIL`. The email body:

```
Subject: New blog draft ready: {topic.title}

Sean,

Your blog draft is ready for review:

Topic: {topic.title}
Keyword: {topic.keyword}

[View Draft in Google Docs]({BLOG_DRAFT_DOC_URL})

[Publish to Website](https://growthmindsetparenting.com/api/publish-post?topic={topicId}&token={hmacToken})

The Blogger
```

The HMAC token = `crypto.createHmac('sha256', process.env.PUBLISH_SECRET).update(String(topic.id)).digest('hex')`.

**Wait — Gmail API via service account requires domain-wide delegation for impersonation.** This may not be set up. Simpler: use `nodemailer` with a Gmail app password. But we don't have that set up either.

**Simplest email approach:** Use the Resend API (`resend.com`) which is free for low volume. Single `fetch` call, no SDK needed. Set `RESEND_API_KEY` as a new secret.

OR: skip email in the initial build and just log that the draft is ready. The `BLOG_DRAFT_DOC_ID` gives Sean the URL. Katie can add email later.

**Decision: Use Resend for email.** One `fetch` call to `https://api.resend.com/emails`. Env var: `RESEND_API_KEY`. If not set, log a warning and continue (email is optional for the build to succeed).

**Env vars needed:**
- `GOOGLE_SERVICE_ACCOUNT_KEY` — already set
- `ANTHROPIC_API_KEY` — new
- `BLOG_DRAFT_DOC_ID` — new (must be created first)
- `NOTIFICATION_EMAIL` — new (`sean@growthmindsetparenting.com`)
- `RESEND_API_KEY` — new (optional for email)
- `PUBLISH_SECRET` — new (for HMAC)

### generate-blog-post.yml

```yaml
name: Generate Blog Post

on:
  schedule:
    - cron: '0 16 1 * *'   # 1st of month, 10am CT
    - cron: '0 16 15 * *'  # 15th of month, 10am CT
  workflow_dispatch:

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Generate blog post
        env:
          GOOGLE_SERVICE_ACCOUNT_KEY: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_KEY }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          BLOG_DRAFT_DOC_ID: ${{ secrets.BLOG_DRAFT_DOC_ID }}
          NOTIFICATION_EMAIL: ${{ secrets.NOTIFICATION_EMAIL }}
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          PUBLISH_SECRET: ${{ secrets.PUBLISH_SECRET }}
          SITE_URL: https://growthmindsetparenting.com
        run: node scripts/generate-blog-post.mjs
      - name: Commit updated blog-queue.json
        run: |
          git config user.email "blog-generator@growthmindsetparenting.com"
          git config user.name "Blog Generator Bot"
          git add content/blog-queue.json
          git diff --staged --quiet && echo "No changes" && exit 0
          git commit -m "Mark blog post generated: $(node -e "const q=JSON.parse(require('fs').readFileSync('content/blog-queue.json','utf8')); const e=q.queue.find(x=>x.status==='generated'&&x.generatedAt); console.log(e?.title??'unknown')")"
          git push
```

**Commit message:** `feat: add blog post generation script and GitHub Actions workflow`

---

## Task 4: Publish-Post API Route

**File:** `app/api/publish-post/route.js`

A Next.js Route Handler that Sean hits when he clicks "Publish" in his email.

**URL:** `GET /api/publish-post?id={topicId}&token={hmacToken}`

**What it does:**

1. Reads `id` and `token` from query params
2. Recomputes expected HMAC: `crypto.createHmac('sha256', process.env.PUBLISH_SECRET).update(id).digest('hex')`
3. If token doesn't match: return 401 JSON `{ error: 'Invalid token' }`
4. Reads `content/blog-queue.json` from the filesystem (this runs server-side in Next.js)
5. Finds the entry with matching `id` that has `status: 'generated'`
6. If not found: return 404 `{ error: 'Post not found or not ready' }`
7. Reads the blog draft tab from Google Docs (tab title = entry's `draftTabTitle`) using the service account
8. Parses the tab content into paragraphs (same logic as sync-newsletters.mjs `extractText`)
9. Generates the letters.js entry with `type: 'blog'`, `topic` from queue, today's date
10. Prepends it to `letters.js` (same replacement pattern as sync-newsletters.mjs)
11. Writes `letters.js` to disk
12. Marks the queue entry as `status: 'published'`, adds `publishedAt` timestamp
13. Writes `blog-queue.json` to disk
14. **Commits and pushes** the two changed files via the `child_process.exec` shell commands:
    ```
    git config user.email "publisher@growthmindsetparenting.com"
    git config user.name "Blog Publisher Bot"
    git add content/letters.js content/blog-queue.json
    git commit -m "Publish blog post: {title}"
    git push
    ```
    Then Vercel auto-deploys.
15. Returns 200 JSON `{ success: true, slug: '...', message: 'Post published!' }`

**Also return a success HTML page** (not just JSON) so when Sean opens the link in a browser he sees a human-readable "Your post is live!" message. Use `NextResponse` with HTML content type.

**Edge cases:**
- Token mismatch → 401
- Already published → 409 `{ error: 'Already published' }`
- Google Docs read failure → 500 with error message
- Git push failure → 500 with error message (the route is idempotent up to the git push)

**Important: This route runs in a GitHub Actions / Vercel environment where the working directory may be read-only.** Writing files and running git won't work in Vercel's serverless functions. 

**Revised approach:** Instead of writing files directly in the API route, use the **GitHub API** (REST) to commit the files:
1. Use `fetch` to call `https://api.github.com/repos/Growth-Mindset-Parenting/gmp-website/contents/content/letters.js` (GET to get current SHA + content)
2. Similarly for `blog-queue.json`
3. PUT both files via GitHub Contents API
4. Use a GitHub Personal Access Token (env var: `GITHUB_PAT`) with `contents: write` permission

**New env var needed:** `GITHUB_PAT` — a fine-grained PAT for the `Growth-Mindset-Parenting/gmp-website` repo with contents write permission.

**Commit message:** `feat: add /api/publish-post route for one-click blog publishing`

---

## Task 5: Instructions Tab in Newsletter Google Doc

**Not a code change** — uses Google Docs MCP to write content to the Instructions tab of the newsletter Google Doc.

**Doc:** `1WNFlx8kGrIhfUfQa4jc_t7lg6yo2v0n_073Ve44gASI`  
**Tab ID:** `t.h4dg0a4tsta2` (the "Instructions" tab, confirmed empty, 0 chars)

Write clear instructions for Sean on how to format new newsletter tabs so the auto-sync works.

**Content to write:**

```
How to add a new newsletter

Tab name: use the date only — month.day, no leading zeros.
Examples: 6.27, 7.4, 8.1, 12.25

First line must be the skill tag:
Skill: [Skill Name]

Valid skill names (pick one):
  Emotional Literacy
  Resilience
  Reflection
  Relationship
  Autonomy
  Adaptation

Write your newsletter below the skill line. The sync reads everything
until it hits a line starting with "Note 1:" or "Notes//" — so put
your notes section after one of those markers.

What to omit:
- Don't sign with "-Sean" — the sync strips it, but cleaner to leave it out
- Don't include the "Notes" section in the main body — use "Note 1: ..." to mark where notes start
- Don't add a date heading at the top — the tab name is the date

The sync runs every Saturday at 10am Central. If your newsletter is in
the doc by then, it will go live automatically. If you write after 10am
on Saturday, it will go live the following Saturday.
```

Use `mcp__google-docs__replaceDocumentWithMarkdown` or `mcp__google-docs__appendText` to write to the Instructions tab.

**No commit needed** — this is a Google Docs write, not a code change.

---

## Progress Ledger

Located at `.superpowers/sdd/progress.md` (auto-ignored by git).

Check this file before starting — tasks listed as complete should not be re-dispatched.
