/**
 * GET /api/publish-post?id={topicId}&token={hmacToken}
 *
 * One-click publish route. Sean clicks this link from his notification email.
 * Verifies the HMAC token, reads the generated blog draft from Google Docs,
 * prepends the post to content/letters.js, marks the queue entry published,
 * and commits both files via the GitHub Contents API (Vercel filesystem is
 * read-only at runtime, so we cannot git-push from here).
 *
 * Env vars required:
 *   PUBLISH_SECRET              — shared secret used to sign publish tokens
 *   GOOGLE_SERVICE_ACCOUNT_KEY  — JSON string of service account credentials
 *   GITHUB_PAT                  — fine-grained PAT with contents:write on gmp-website
 */

import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { google } from 'googleapis';

const REPO = 'Growth-Mindset-Parenting/gmp-website';
const GITHUB_API = 'https://api.github.com';

// ── Helpers copied exactly from scripts/sync-newsletters.mjs ─────────────────

/** Pull plain text out of a Google Docs body content array. */
function extractText(content) {
  const lines = [];
  for (const el of content || []) {
    if (el.paragraph) {
      const text = (el.paragraph.elements || [])
        .map(e => e.textRun?.content ?? '')
        .join('')
        .replace(/\n$/, '');
      lines.push(text);
    }
  }
  return lines.join('\n');
}

/** Serialise a letter object to a JS object literal for insertion into letters.js. */
function letterToJsBlock(l) {
  const bodyLines = l.body.map(p => `    ${JSON.stringify(p)},`).join('\n');
  return `  {
    slug: '${l.slug}',
    title: ${JSON.stringify(l.title)},
    date: '${l.date}',
    type: '${l.type}',
    topic: ${JSON.stringify(l.topic)},
    tag: '${l.tag}',
    readTime: '${l.readTime}',
    excerpt: ${JSON.stringify(l.excerpt)},
    dek: ${JSON.stringify(l.dek)},
    img: null,
    featured: false,
    related: [],
    body: [
${bodyLines}
    ],
  }`;
}

// ── GitHub Contents API helpers ───────────────────────────────────────────────

async function githubGetFile(path, githubPat) {
  const res = await fetch(`${GITHUB_API}/repos/${REPO}/contents/${path}`, {
    headers: {
      Authorization: `Bearer ${githubPat}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!res.ok) throw new Error(`GitHub GET ${path} failed: ${res.status}`);
  return res.json(); // { sha, content (base64), ... }
}

async function githubPutFile(path, content, sha, message, githubPat) {
  const res = await fetch(`${GITHUB_API}/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${githubPat}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      sha,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub PUT ${path} failed (${res.status}): ${errText}`);
  }
  return res.json();
}

// ── HTML response helper ──────────────────────────────────────────────────────

function htmlResponse(body, status = 200) {
  return new NextResponse(body, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

const HTML_401 = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Invalid Link</title>
<style>body{font-family:system-ui,sans-serif;max-width:480px;margin:80px auto;padding:0 24px;color:#1a1a1a}</style>
</head><body><h1>Invalid or expired publish link.</h1></body></html>`;

const HTML_404 = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Not Found</title>
<style>body{font-family:system-ui,sans-serif;max-width:480px;margin:80px auto;padding:0 24px;color:#1a1a1a}</style>
</head><body><h1>Post not found or not ready to publish.</h1></body></html>`;

const HTML_409 = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Already Published</title>
<style>body{font-family:system-ui,sans-serif;max-width:480px;margin:80px auto;padding:0 24px;color:#1a1a1a}</style>
</head><body><h1>This post has already been published.</h1></body></html>`;

function html500(message) {
  const escapedMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Error</title>
<style>body{font-family:system-ui,sans-serif;max-width:480px;margin:80px auto;padding:0 24px;color:#1a1a1a}</style>
</head><body><h1>Something went wrong: ${escapedMessage}</h1></body></html>`;
}

function htmlSuccess(title, slug, siteUrl) {
  const postUrl = `${siteUrl}/writing/${slug}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Post Published!</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 480px; margin: 80px auto; padding: 0 24px; color: #1a1a1a; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    p { color: #555; margin-bottom: 1.5rem; }
    a { color: #b45309; font-weight: 600; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Your post is live!</h1>
  <p>"${title}" has been published to the website.</p>
  <p><a href="${postUrl}">${postUrl} &rarr;</a></p>
  <p style="font-size:0.875rem;color:#888">Vercel will deploy the change in about 1 minute.</p>
</body>
</html>`;
}

// ── Script Log write-back ─────────────────────────────────────────────────────

const SCRIPT_LOG_SPREADSHEET_ID = '1kAAn0jLBqxy15raMg50tz43Fhmavv6af8idTSoYKMT8';
const SCRIPT_LOG_SHEET = 'Script Log';

/**
 * Find all rows in the Script Log where Theme #1 (col E), Theme #2 (col F),
 * or Theme #3 (col G) matches scriptLogTheme, then write the published URL
 * to column N for each matching row.
 */
async function writeUrlToScriptLog(scriptLogTheme, publishedUrl, auth) {
  const sheets = google.sheets({ version: 'v4', auth });

  // Read Theme columns (E, F, G) and Blog URL column (N) for all rows
  const readRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SCRIPT_LOG_SPREADSHEET_ID,
    range: `'${SCRIPT_LOG_SHEET}'!A:N`,
  });

  const rows = readRes.data.values || [];
  if (rows.length === 0) return;

  // Column indices (0-based): E=4, F=5, G=6, N=13
  const THEME1_COL = 4;
  const THEME2_COL = 5;
  const THEME3_COL = 6;
  const BLOG_COL = 13;

  // Find matching rows (1-indexed for Sheets API, row 1 is likely header)
  const updateData = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const t1 = (row[THEME1_COL] || '').trim();
    const t2 = (row[THEME2_COL] || '').trim();
    const t3 = (row[THEME3_COL] || '').trim();

    if (t1 === scriptLogTheme || t2 === scriptLogTheme || t3 === scriptLogTheme) {
      // Rows are 1-indexed in Sheets, and row 1 is header, so data starts at row 2
      const sheetRow = i + 1;
      updateData.push({
        range: `'${SCRIPT_LOG_SHEET}'!N${sheetRow}`,
        values: [[publishedUrl]],
      });
    }
  }

  if (updateData.length === 0) {
    console.log(`[publish-post] No Script Log rows found for theme "${scriptLogTheme}"`);
    return;
  }

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SCRIPT_LOG_SPREADSHEET_ID,
    requestBody: {
      valueInputOption: 'RAW',
      data: updateData,
    },
  });

  console.log(`[publish-post] Wrote blog URL to ${updateData.length} Script Log row(s) for theme "${scriptLogTheme}"`);
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(request) {
  try {
    // 1. Read query params
    const { searchParams } = request.nextUrl;
    const id = searchParams.get('id');
    const token = searchParams.get('token');

    if (!id || !token) {
      return htmlResponse(HTML_401, 401);
    }

    // 2. Verify HMAC using timingSafeEqual
    const publishSecret = process.env.PUBLISH_SECRET;
    if (!publishSecret) throw new Error('PUBLISH_SECRET env var is not set');

    const expectedHex = createHmac('sha256', publishSecret).update(id).digest('hex');

    // Both must be the same length for timingSafeEqual; expectedHex is always 64 chars.
    let tokenValid = false;
    if (token.length === expectedHex.length) {
      try {
        tokenValid = timingSafeEqual(
          Buffer.from(expectedHex, 'utf8'),
          Buffer.from(token, 'utf8')
        );
      } catch {
        tokenValid = false;
      }
    }

    if (!tokenValid) {
      return htmlResponse(HTML_401, 401);
    }

    // 3. Read blog-queue.json from filesystem
    const queuePath = join(process.cwd(), 'content', 'blog-queue.json');
    const queueData = JSON.parse(readFileSync(queuePath, 'utf8'));
    const entry = queueData.queue.find(e => String(e.id) === String(id));

    if (!entry || entry.status === 'pending') {
      return htmlResponse(HTML_404, 404);
    }
    if (entry.status === 'published') {
      return htmlResponse(HTML_409, 409);
    }
    if (entry.status !== 'generated') {
      return htmlResponse(HTML_404, 404);
    }

    // 4. Read blog draft tab from Google Docs
    const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!keyJson) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY env var is not set');

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(keyJson),
      scopes: [
        'https://www.googleapis.com/auth/documents.readonly',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });
    const docs = google.docs({ version: 'v1', auth });

    const draftDocId = entry.draftDocId;
    if (!draftDocId) throw new Error('No draftDocId found for this entry — was it generated?');

    const docRes = await docs.documents.get({ documentId: draftDocId });
    const tabContent = docRes.data.body?.content ?? [];
    const fullText = extractText(tabContent);

    // 5. Parse metadata block and body
    // Doc format: metadata lines, then ---, then body content
    const separatorIdx = fullText.indexOf('\n---\n');
    if (separatorIdx === -1) throw new Error('No --- separator found in doc. Make sure the draft has the metadata block followed by ---.');

    const metaBlock = fullText.slice(0, separatorIdx);
    const bodyText = fullText.slice(separatorIdx + 5); // skip '\n---\n'

    const getMeta = (key) => {
      const match = metaBlock.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
      return match ? match[1].trim() : null;
    };

    const today = new Date().toISOString().slice(0, 10);
    const rawDate = getMeta('DATE');
    const date = (rawDate && /^\d{4}-\d{2}-\d{2}$/.test(rawDate)) ? rawDate : today;
    const topic = getMeta('SKILL') || entry.topic;
    const rawReadTime = getMeta('READ TIME');
    const metaExcerpt = getMeta('EXCERPT');

    const paragraphs = bodyText
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    if (!paragraphs.length) throw new Error('No body content found after --- separator.');

    const wordCount = paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
    const calcMins = Math.max(5, Math.round(wordCount / 200));
    const readTime = rawReadTime || `${calcMins} min read`;
    const minsNum = parseInt(readTime) || calcMins;
    const excerpt = metaExcerpt || paragraphs[0].replace(/\*\*/g, '').slice(0, 160);

    const letterEntry = {
      slug: entry.slug,
      title: entry.title,
      date,
      type: 'blog',
      topic,
      tag: `Blog Post · ${minsNum} min read`,
      readTime,
      excerpt,
      dek: excerpt,
      img: null,
      featured: false,
      related: [],
      body: paragraphs,
    };

    // 6. Prepend to letters.js (same replace pattern as sync-newsletters.mjs)
    const lettersPath = join(process.cwd(), 'content', 'letters.js');
    const existingLetters = readFileSync(lettersPath, 'utf8');
    const newJsBlock = letterToJsBlock(letterEntry);
    const updatedLetters = existingLetters.replace(
      'export const LETTERS = [',
      `export const LETTERS = [\n${newJsBlock},`
    );

    // 7. Update blog-queue.json in memory
    entry.status = 'published';
    entry.publishedAt = new Date().toISOString();
    const updatedQueue = JSON.stringify(queueData, null, 2) + '\n';

    // 8. Commit both files via GitHub Contents API
    const githubPat = process.env.GITHUB_PAT;
    if (!githubPat) throw new Error('GITHUB_PAT env var is not set');

    // Fetch current SHAs in parallel
    const [lettersFileInfo, queueFileInfo] = await Promise.all([
      githubGetFile('content/letters.js', githubPat),
      githubGetFile('content/blog-queue.json', githubPat),
    ]);

    // PUT letters.js first, then blog-queue.json
    await githubPutFile(
      'content/letters.js',
      updatedLetters,
      lettersFileInfo.sha,
      `Publish blog post: ${entry.title}`,
      githubPat
    );

    await githubPutFile(
      'content/blog-queue.json',
      updatedQueue,
      queueFileInfo.sha,
      `Mark blog post published: ${entry.title}`,
      githubPat
    );

    // 9. Write published URL back to Script Log column N for matching scripts
    const siteUrl = process.env.SITE_URL ?? 'https://growthmindsetparenting.com';
    const publishedUrl = `${siteUrl}/writing/${entry.slug}`;
    if (entry.scriptLogTheme && process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      try {
        await writeUrlToScriptLog(entry.scriptLogTheme, publishedUrl, auth);
      } catch (sheetErr) {
        // Non-fatal — the post is live even if the sheet update fails
        console.warn('[publish-post] Script Log update failed:', sheetErr.message);
      }
    }

    // 10. Return HTML success page
    return htmlResponse(htmlSuccess(entry.title, entry.slug, siteUrl), 200);

  } catch (err) {
    console.error('[publish-post]', err);
    return htmlResponse(html500(err.message), 500);
  }
}
