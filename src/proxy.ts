import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /department/[slug]/home → /department/[slug]
  const match = pathname.match(/^\/department\/([^/]+)\/home$/);
  if (match) {
    const slug = match[1];
    return NextResponse.redirect(new URL(`/department/${slug}`, request.url));
  }

  // ✅ DO NOT set x-pathname header — it causes dynamic rendering on every page
  // Use usePathname() in client components instead

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};