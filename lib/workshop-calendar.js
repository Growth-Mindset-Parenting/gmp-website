// Calendar links and the personal join link for the Autopilot workshop.
// Shared by the thank-you page (buttons) and /api/workshop-ics/ (Apple .ics).
import { WORKSHOP } from '../data/autopilot-workshop';

const KEY_RE = /^[a-f0-9]{32}$/;

// EasyWebinar's registrant key, as it arrives in the thank-you URL.
export function validKey(key) {
  return typeof key === 'string' && KEY_RE.test(key) ? key : null;
}

// Personal join link from a valid key; otherwise EasyWebinar's short link,
// but only if it really points at EasyWebinar.
export function joinLink(key, shortLink) {
  const k = validKey(key);
  if (k) return WORKSHOP.event.joinLinkBase + k;
  try {
    const u = new URL(shortLink);
    if (u.protocol === 'https:' && u.hostname === 'app.easywebinar.com') return u.toString();
  } catch {
    // not a URL
  }
  return null;
}

const compact = (iso) => iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '');

function details(link) {
  const { calendarDescription } = WORKSHOP.event;
  return link ? `Your link to join: ${link}\n\n${calendarDescription}` : calendarDescription;
}

export function googleCalendarUrl(link) {
  const { startUtc, endUtc, calendarTitle } = WORKSHOP.event;
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: calendarTitle,
    dates: `${compact(startUtc)}/${compact(endUtc)}`,
    details: details(link),
  });
  if (link) p.set('location', link);
  return `https://calendar.google.com/calendar/render?${p}`;
}

export function outlookCalendarUrl(link) {
  const { startUtc, endUtc, calendarTitle } = WORKSHOP.event;
  const p = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: calendarTitle,
    startdt: startUtc,
    enddt: endUtc,
    body: details(link),
  });
  if (link) p.set('location', link);
  return `https://outlook.live.com/calendar/0/deeplink/compose?${p}`;
}

export function icsUrl(key) {
  const k = validKey(key);
  return k ? `/api/workshop-ics/?key=${k}` : '/api/workshop-ics/';
}

// RFC 5545 text escaping and 75-octet line folding.
const esc = (t) => t.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

const bytes = (t) => new TextEncoder().encode(t).length;

function fold(line) {
  const out = [];
  let rest = line;
  while (bytes(rest) > 75) {
    let cut = 75;
    while (bytes(rest.slice(0, cut)) > 75) cut -= 1;
    out.push(rest.slice(0, cut));
    rest = ` ${rest.slice(cut)}`;
  }
  out.push(rest);
  return out.join('\r\n');
}

export function buildIcs(key) {
  const { startUtc, endUtc, calendarTitle } = WORKSHOP.event;
  const link = joinLink(key, null);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Growth Mindset Parenting//Autopilot Workshop//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:autopilot-workshop-20261007@growthmindsetparenting.com',
    `DTSTAMP:${compact(new Date().toISOString())}`,
    `DTSTART:${compact(startUtc)}`,
    `DTEND:${compact(endUtc)}`,
    `SUMMARY:${esc(calendarTitle)}`,
    `DESCRIPTION:${esc(details(link))}`,
    ...(link ? [`LOCATION:${esc(link)}`, `URL:${link}`] : []),
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Autopilot workshop starts in 30 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return `${lines.map(fold).join('\r\n')}\r\n`;
}
