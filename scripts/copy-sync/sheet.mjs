/**
 * sheet.mjs — Google Sheets access for the website copy source-of-truth sheet.
 *
 * Auth: reuses the local google-docs-mcp OAuth credentials. Nothing secret is
 * stored in this repo — the token is read from disk at runtime.
 *   Override the location with GOOGLE_OAUTH_TOKEN_PATH if needed.
 *
 * Sheet contract (the tab with gid 0 — titled "SOT" as of 2026-08-27, but the
 * title is resolved at runtime so a rename in the Sheets UI cannot break this):
 *   A = Page   B = Section   C = Element Type   D = Live Copy   E = Requested Changes
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

export const SPREADSHEET_ID = '1HYHfu-zDxNxlWraH999cw_6sSl0m_I9BJWyDv2i8qQg';
export const SHEET_GID = 0; // numeric id of the source-of-truth tab

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

/**
 * The tab is addressed by gid, not by name — Katie renames tabs in the UI
 * (Sheet1 → SOT on 2026-08-27) and a hardcoded name turns every script into an
 * "Unable to parse range" error. Resolved once at import.
 */
async function resolveTabTitle() {
  const res = await sheetsClient().spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
    fields: 'sheets.properties(sheetId,title)',
  });
  const match = (res.data.sheets || []).find((s) => s.properties.sheetId === SHEET_GID);
  if (!match) throw new Error(`No tab with gid ${SHEET_GID} in spreadsheet ${SPREADSHEET_ID}`);
  return match.properties.title;
}

export const TAB_TITLE = await resolveTabTitle();

/** A1-notation prefix, quoted so a title containing spaces still parses. */
export const TAB = `'${TAB_TITLE.replace(/'/g, "''")}'`;

/**
 * Reads the full copy table.
 * Returns rows as { row, page, section, element, live, requested }, 1-indexed
 * by actual spreadsheet row number, with the header row excluded.
 */
export async function readRows() {
  const sheets = sheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${TAB}!A1:E2000`,
    valueRenderOption: 'FORMATTED_VALUE',
  });
  const values = res.data.values || [];
  const rows = [];
  for (let i = 1; i < values.length; i++) {
    const [page = '', section = '', element = '', live = '', requested = ''] = values[i] || [];
    rows.push({
      row: i + 1,
      page: String(page).trim(),
      section: String(section).trim(),
      element: String(element).trim(),
      live: String(live),
      requested: String(requested),
    });
  }
  return rows;
}

/** True for rows that are section spacers rather than copy. */
export function isBlankRow(r) {
  return !r.page && !r.section && !r.element && !r.live && !r.requested;
}

/** Freebie rows are the ones whose Page starts with "FREEBIE". */
export function isFreebieRow(r) {
  return r.page.toUpperCase().startsWith('FREEBIE');
}

/**
 * Writes individual cells. updates = [{ range: `${TAB}!D12`, value: 'text' }]
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
 * Deletes whole rows by 1-indexed spreadsheet row number. Rows are removed
 * bottom-up internally so the caller's numbers stay valid regardless of order.
 * Structural — the pre-cleanup backup tab is the recovery path.
 */
export async function deleteRows(rowNumbers, { gid = SHEET_GID } = {}) {
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
