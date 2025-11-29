// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host');

  // Force https + www.trendz.ng
  if (!url.pathname.startsWith('/_next') && !url.pathname.startsWith('/api')) {
    if (!hostname?.startsWith('www.trendz.ng') || url.protocol === 'http:') {
      url.protocol = 'https';
      url.hostname = 'www.trendz.ng';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};