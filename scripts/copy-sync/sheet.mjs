/**
 * sheet.mjs — Google Sheets access for the website copy source-of-truth sheet.
 *
 * Auth: reuses the local google-docs-mcp OAuth credentials. Nothing secret is
 * stored in this repo — the token is read from disk at runtime.
 *   Override the location with GOOGLE_OAUTH_TOKEN_PATH if needed.
 *
 * Sheet layout (since 2026-09-18): one tab per page, plus a "Pages" index.
 *   Page tabs:        A = Page   B = Section   C = Element Type   D = Live Copy   E = Requested Changes
 *   Pages (gid 0):    A = Page (links to its tab)   B = Web address   C = Type
 *
 * The Pages tab is the list of pages this tool knows about and where each one
 * lives on the site. A new page = a new tab + a new row in Pages.
 *
 * Pages are identified by column A, never by tab title: Katie renames tabs in
 * the Sheets UI, and a hardcoded title turns every script into an "Unable to
 * parse range" error. Titles are resolved at runtime from the tab list. Tabs
 * whose title starts with BACKUP or ARCHIVE are ignored.
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

export const SPREADSHEET_ID = '1HYHfu-zDxNxlWraH999cw_6sSl0m_I9BJWyDv2i8qQg';
export const PAGES_GID = 0; // the "Pages" index tab

const IGNORED_TAB = /^\s*(backup|archive)/i;

const TOKEN_PATH =
  process.env.GOOGLE_OAUTH_TOKEN_PATH ||
  join(homedir(), '.config', 'google-docs-mcp', 'token.json');

function authorize() {
  let creds;
  try {
    creds = JSON.parse(readFileSync(TOKEN_PATH, 'utf8'));
  } catch (err) {
    throw new Error(
      `Could not read Google OAuth credentials at ${TOKEN_PATH}. ` +
        `Set GOOGLE_OAUTH_TOKEN_PATH to a JSON file with client_id, client_secret, refresh_token. ` +
        `(${err.message})`
    );
  }
  const { client_id, client_secret, refresh_token } = creds;
  if (!client_id || !client_secret || !refresh_token) {
    throw new Error(`${TOKEN_PATH} is missing client_id, client_secret, or refresh_token.`);
  }
  const client = new google.auth.OAuth2(client_id, client_secret);
  client.setCredentials({ refresh_token });
  return client;
}

export function sheetsClient() {
  return google.sheets({ version: 'v4', auth: authorize() });
}

/** A1-notation prefix for a tab, quoted so a title with spaces or dashes parses. */
export const tabRef = (title) => `'${title.replace(/'/g, "''")}'`;

/** Every tab: { gid, title, index }. */
export async function listTabs() {
  const res = await sheetsClient().spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
    fields: 'sheets.properties(sheetId,title,index)',
  });
  return (res.data.sheets || []).map((s) => ({
    gid: s.properties.sheetId,
    title: s.properties.title,
    index: s.properties.index,
  }));
}

/** The tabs that hold page copy: everything except Pages, backups and archives. */
export async function pageTabs() {
  return (await listTabs())
    .filter((t) => t.gid !== PAGES_GID && !IGNORED_TAB.test(t.title))
    .sort((a, b) => a.index - b.index);
}

/**
 * The Pages index: [{ page, path }] in sheet order. `path` is the site path
 * ("/freebies/capable/read/"), taken from the Web address column.
 */
export async function readPages() {
  const pagesTab = (await listTabs()).find((t) => t.gid === PAGES_GID);
  if (!pagesTab) throw new Error(`No Pages tab (gid ${PAGES_GID}) in spreadsheet ${SPREADSHEET_ID}`);
  const res = await sheetsClient().spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${tabRef(pagesTab.title)}!A2:B200`,
    valueRenderOption: 'FORMATTED_VALUE',
  });
  const pages = [];
  for (const [page = '', address = ''] of res.data.values || []) {
    const m = String(address).match(/growthmindsetparenting\.com(\/[^\s]*)/);
    if (!page.trim() || !m) continue; // the how-to note and blank rows
    pages.push({ page: page.trim(), path: m[1] });
  }
  return pages;
}

/**
 * Reads the full copy table across every page tab.
 * Returns rows as { tab, gid, ref, row, page, section, element, live, requested }.
 * `row` is the actual spreadsheet row number within its tab (header excluded);
 * `ref` is the quoted tab prefix for writing back: `${r.ref}!D${r.row}`.
 */
export async function readRows() {
  const tabs = await pageTabs();
  if (!tabs.length) return [];
  const res = await sheetsClient().spreadsheets.values.batchGet({
    spreadsheetId: SPREADSHEET_ID,
    ranges: tabs.map((t) => `${tabRef(t.title)}!A1:E2000`),
    valueRenderOption: 'FORMATTED_VALUE',
  });
  const rows = [];
  res.data.valueRanges.forEach((vr, t) => {
    const tab = tabs[t];
    const values = vr.values || [];
    for (let i = 1; i < values.length; i++) {
      const [page = '', section = '', element = '', live = '', requested = ''] = values[i] || [];
      rows.push({
        tab: tab.title,
        gid: tab.gid,
        ref: tabRef(tab.title),
        row: i + 1,
        page: String(page).trim(),
        section: String(section).trim(),
        element: String(element).trim(),
        live: String(live),
        requested: String(requested),
      });
    }
  });
  return rows;
}

/** Short label for a row in logs: "Home!12". */
export const rowLabel = (r) => `${r.tab}!${r.row}`;

/** True for rows that are section spacers rather than copy. */
export function isBlankRow(r) {
  return !r.page && !r.section && !r.element && !r.live && !r.requested;
}

/**
 * Freebie signup pages ("Freebie – Capable – Signup") run an A/B test and are
 * driven from content/freebies.js. The freebie itself ("… – Read") is an
 * ordinary page.
 */
export function isFreebieSignupPage(page) {
  return /^freebie\b.*\bsignup$/i.test(page.trim());
}

export function isFreebieRow(r) {
  return isFreebieSignupPage(r.page);
}

/**
 * Writes individual cells. updates = [{ range: `${r.ref}!D12`, value: 'text' }]
 * Uses RAW so copy is never reinterpreted as a formula, date, or number.
 */
export async function writeCells(updates) {
  if (!updates.length) return 0;
  const sheets = sheetsClient();
  const CHUNK = 200;
  let written = 0;
  for (let i = 0; i < updates.length; i += CHUNK) {
    const batch = updates.slice(i, i + CHUNK);
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        valueInputOption: 'RAW',
        data: batch.map((u) => ({ range: u.range, values: [[u.value]] })),
      },
    });
    written += batch.length;
  }
  return written;
}

/**
 * Deletes whole rows from one tab by 1-indexed row number. Rows are removed
 * bottom-up internally so the caller's numbers stay valid regardless of order.
 * Structural — the dated backup copy of the sheet is the recovery path.
 */
export async function deleteRows(gid, rowNumbers) {
  const rows = [...new Set(rowNumbers)].sort((a, b) => b - a);
  if (!rows.length) return 0;
  const sheets = sheetsClient();
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      requests: rows.map((r) => ({
        deleteDimension: {
          range: { sheetId: gid, dimension: 'ROWS', startIndex: r - 1, endIndex: r },
        },
      })),
    },
  });
  return rows.length;
}
