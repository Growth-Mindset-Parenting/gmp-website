// Calendar links for the Autopilot workshop, one set per session.
//
// The Zoom join links are the same for everyone (registration is off), so
// every invite carries its session's link and dial-in details, and the
// Apple/.ics version is served by /api/workshop-ics/?s=<session key>.
import { WORKSHOP } from '../data/autopilot-workshop';

// Set by the signup modal just before it sends people to the thank-you page,
// so the thank-you page counts the registration in GA4 once — and a cold
// visit to the thank-you page counts nothing.
export const REGISTERED_KEY = 'apws-just-registered';

export function sessionByKey(key) {
  return WORKSHOP.sessions.find((s) => s.key === key) || null;
}

const compact = (iso) => iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '');

// Everything that goes in the body of the calendar event. All three calendar
// formats below share it, so the dial-in block only has to be written once.
function details(session) {
  const { description, dialInNumbers } = WORKSHOP.calendar;
  return [
    `Join on Zoom: ${session.joinUrl}`,
    description,
    [
      'Rather join by phone?',
      `One tap mobile: ${session.oneTapMobile.join(' or ')}`,
      '',
      'Or dial the number closest to you:',
      dialInNumbers.join(', '),
      '',
      `Meeting ID: ${session.meetingId}`,
      `Passcode: ${session.passcode}`,
    ].join('\n'),
  ].join('\n\n');
}

export function googleCalendarUrl(session) {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: WORKSHOP.calendar.title,
    dates: `${compact(session.startUtc)}/${compact(session.endUtc)}`,
    details: details(session),
    location: session.joinUrl,
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

export function outlookCalendarUrl(session) {
  const p = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: WORKSHOP.calendar.title,
    startdt: session.startUtc,
    enddt: session.endUtc,
    body: details(session),
    location: session.joinUrl,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${p}`;
}

export function icsUrl(session) {
  return `/api/workshop-ics/?s=${session.key}`;
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

export function buildIcs(session) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Growth Mindset Parenting//Autopilot Workshop//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    // One UID per session, so adding both doesn't replace one with the other.
    `UID:autopilot-workshop-${compact(session.startUtc)}@growthmindsetparenting.com`,
    `DTSTAMP:${compact(new Date().toISOString())}`,
    `DTSTART:${compact(session.startUtc)}`,
    `DTEND:${compact(session.endUtc)}`,
    `SUMMARY:${esc(WORKSHOP.calendar.title)}`,
    `DESCRIPTION:${esc(details(session))}`,
    `LOCATION:${esc(session.joinUrl)}`,
    `URL:${session.joinUrl}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:The workshop starts in 30 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return `${lines.map(fold).join('\r\n')}\r\n`;
}
