import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BASE_URL } from './config/config';

export function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname;

  // Redirect /department/:slug/home -> /department/:slug
  const match = pathname.match(/^\/department\/([^/]+)\/home$/);

  if(match){
    const slug = match[1];

    return NextResponse.redirect(
      new URL(`${BASE_URL}department/${slug}`, request.url)
    )
  }
  
  const requestHeaders = new Headers(request.headers);  
  requestHeaders.set('x-pathname', pathname)

  const response = NextResponse.next({
    request:{
      headers:requestHeaders
    }
  })
  return response;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};