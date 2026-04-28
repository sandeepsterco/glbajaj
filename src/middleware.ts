import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('middleware running:', request.nextUrl.pathname); // ← add this
  
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

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