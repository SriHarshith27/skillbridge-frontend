// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public routes that don't require authentication
const publicPaths = ['/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // This token is read from the browser's cookies
  const token = request.cookies.get('skillbridge-token')?.value;

  const isPublicPath = publicPaths.includes(pathname);

  // If the user is trying to access a protected route without a token,
  // redirect them to the login page.
  if (!token && !isPublicPath && pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is logged in and tries to access the login page,
  // redirect them to their dashboard.
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If none of the above, let the request continue.
  return NextResponse.next();
}

export const config = {
  // This matcher ensures the middleware runs on all paths
  // except for static files and internal Next.js assets.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};