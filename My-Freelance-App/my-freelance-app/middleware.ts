// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // You can add logic here for protected routes
  console.log('Middleware executed');
  return NextResponse.next();
}

// Optional: define matcher for routes to apply middleware on
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // example protected paths
};
