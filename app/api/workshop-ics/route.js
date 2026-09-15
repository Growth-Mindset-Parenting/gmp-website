import { buildIcs } from '../../../lib/workshop-calendar';

// Apple Calendar / .ics file for the Autopilot workshop. With ?key= (the
// registrant's EasyWebinar key) the event includes their personal join link.
// Per-person content, so never prerender or cache it.
export const dynamic = 'force-dynamic';

export function GET(request) {
  const key = new URL(request.url).searchParams.get('key');
  return new Response(buildIcs(key), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="growth-mindset-workshop.ics"',
      'Cache-Control': 'private, no-store',
    },
  });
}
