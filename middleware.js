import { NextResponse } from 'next/server';

export function middleware(request) {
  const existing = request.cookies.get('freebie-variant')?.value;

  if (existing === 'worksheet' || existing === 'kitchen-table') {
    return NextResponse.next();
  }

  // First visit: assign 50/50, and make the assignment visible to
  // THIS request's server render, not just future requests.
  const assigned = Math.random() < 0.5 ? 'worksheet' : 'kitchen-table';
  request.cookies.set('freebie-variant', assigned);
  const response = NextResponse.next({ request });
  response.cookies.set('freebie-variant', assigned, {
    maxAge: 60 * 60 * 24 * 30, // 30 days — sticky across the test window
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
  return response;
}

export const config = {
  matcher: ['/freebies/:path*'],
};
