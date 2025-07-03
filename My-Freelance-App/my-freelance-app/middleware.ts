// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const protectedPaths = ['/dashboard', '/profile'];
  const currentPath = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );

  if (isProtected && !token) {
    console.log('🚫 No token found — redirecting to login');

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('message', 'unauthorized');
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
