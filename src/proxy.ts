import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_URL } from './config/config';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const slug = pathname.replace(/^\/+/, '');

  if(!slug){
    return NextResponse.next();
  }

  try{
    const apiUrl = `${API_URL}redirect/${slug}`;

    const res = await fetch(apiUrl, {
      cache: 'no-store',
    });
    
    if (res.ok) {
      const json = await res.json();

      if (json?.success && json?.data?.new_url) {
        const newUrl = json.data.new_url as string;

        const redirectUrl = new URL(`/${newUrl.replace(/^\/+/, '')}`, request.url);

        if (redirectUrl.pathname !== pathname) {
          return NextResponse.redirect(redirectUrl, 301);
        }
      }
    }

  } catch (err) {
    console.error('Redirect API error:', err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};