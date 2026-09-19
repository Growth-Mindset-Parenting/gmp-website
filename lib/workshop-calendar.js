// Calendar links for the Autopilot workshop, built around each person's
// personal Zoom join link.
//
// The join link never travels in a URL: the modal hands it to the thank-you
// page through sessionStorage, which builds these links in the browser. With
// no link (someone opening /workshop/thank-you/ cold) the event is still
// correct, just without a join link inside it.
import { WORKSHOP } from '../data/autopilot-workshop';

// Where the signup modal leaves the personal Zoom join link for the
// thank-you page. Lives here so /workshop/ doesn't have to import the
// thank-you component just to read the key.
export const JOIN_LINK_KEY = 'apws-join-link';

// Set once the thank-you page has counted a registration in GA4.
export const COUNTED_KEY = 'apws-registered';

// Only ever accept a real Zoom link, so a tampered value can't be planted in
// a calendar event.
export function validJoinLink(link) {
  try {
    const u = new URL(link);
    if (u.protocol !== 'https:') return null;
    if (u.hostname !== 'zoom.us' && !u.hostname.endsWith('.zoom.us')) return null;
    return u.toString();
  } catch {
    return null;
  }
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

export function buildIcs(joinLink) {
  const { startUtc, endUtc, calendarTitle } = WORKSHOP.event;
  const link = validJoinLink(joinLink);
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
