import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Verify token (using JWT or another method)
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    // Check for admin role if needed
    if (user.role !== 'Admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'], // Apply this middleware to all admin routes
};
