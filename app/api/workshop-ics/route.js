import { buildIcs, sessionByKey } from '../../../lib/workshop-calendar';

// .ics for one workshop session: /api/workshop-ics/?s=sun or ?s=mon.
// The join links are the same for everyone, so every visitor gets the same
// file for a given session.
export function GET(request) {
  const session = sessionByKey(request.nextUrl.searchParams.get('s'));
  if (!session) return new Response('Unknown session', { status: 400 });
  return new Response(buildIcs(session), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="growth-mindset-workshop-${session.key}.ics"`,
    },
  });
}
