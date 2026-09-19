import { NextResponse } from 'next/server';
import {
  ATTRIBUTION_COOKIE,
  ATTRIBUTION_MAX_AGE,
  nextAttribution,
  parseAttribution,
} from './lib/attribution';

// Freebie A/B test: sticky 50/50 design assignment on /freebies/*.
function assignFreebieVariant(request) {
  const existing = request.cookies.get('freebie-variant')?.value;
  if (existing === 'worksheet' || existing === 'kitchen-table') return null;

  // First visit: assign 50/50, and make the assignment visible to
  // THIS request's server render, not just future requests.
  const assigned = Math.random() < 0.5 ? 'worksheet' : 'kitchen-table';
  request.cookies.set('freebie-variant', assigned);
  return assigned;
}

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;
  const variant = pathname.startsWith('/freebies/') ? assignFreebieVariant(request) : null;
  const response = variant ? NextResponse.next({ request }) : NextResponse.next();

  if (variant) {
    response.cookies.set('freebie-variant', variant, {
      maxAge: 60 * 60 * 24 * 30, // 30 days — sticky across the test window
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
  }

  // Link tracking (see lib/attribution.js). Never let it break the page.
  try {
    // Background prefetches (next/link loading a page before any click) are
    // not visits; letting them save tags overwrote readers' real source.
    // Not RSC alone: a real client-side navigation sends that too.
    const h = request.headers;
    const isPrefetch =
      h.get('next-router-prefetch') === '1' ||
      h.has('x-middleware-prefetch') ||
      /prefetch/i.test(h.get('purpose') || '') ||
      /prefetch/i.test(h.get('sec-purpose') || '');
    if (isPrefetch) return response;

    const next = nextAttribution({
      searchParams,
      referrer: request.headers.get('referer'),
      saved: parseAttribution(request.cookies.get(ATTRIBUTION_COOKIE)?.value),
      landing: pathname,
    });
    if (next) {
      const onOwnDomain = /(^|\.)growthmindsetparenting\.com$/i.test(request.nextUrl.hostname);
      response.cookies.set(ATTRIBUTION_COOKIE, JSON.stringify(next), {
        maxAge: ATTRIBUTION_MAX_AGE,
        httpOnly: false, // signup forms read it in the browser
        sameSite: 'lax',
        secure: onOwnDomain,
        path: '/',
        ...(onOwnDomain ? { domain: '.growthmindsetparenting.com' } : {}),
      });
    }
  } catch {
    // ignore
  }

  return response;
}

export const config = {
  // Pages only: skip API routes, Next internals, and files with an extension.
  matcher: ['/((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).*)'],
};
