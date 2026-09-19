import { buildIcs } from '../../../lib/workshop-calendar';

// Plain .ics for the workshop, with no personal join link in it.
//
// The thank-you page builds the personal version in the browser (so the link
// never travels through a URL) and only falls back to this route when it has
// no link to work with — a reload in a new tab, private browsing, or a hiccup
// registering with Zoom. Same file for everyone, so it can be cached.
export function GET() {
  return new Response(buildIcs(null), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="growth-mindset-workshop.ics"',
    },
  });
}
