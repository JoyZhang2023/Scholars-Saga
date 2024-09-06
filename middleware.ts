// This is middleware intended to protect routes and check user sessions
// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage

import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        console.log(request.nextUrl.pathname)
        console.log(request.nextauth.token)

        if (request.nextUrl.pathname.startsWith('/admin')
            && request.nextauth.token?.role !== 'Admin') {
            return NextResponse.rewrite(
                new URL("/home", request.url)
            )
        }
        
        if (request.nextUrl.pathname.startsWith('/counselor')
            && request.nextauth.token?.role !== 'Admin'
            && request.nextauth.token?.role !== 'Counselor') {
            return NextResponse.rewrite(
                new URL("/home", request.url)
            )
        }

        if (request.nextUrl.pathname.startsWith('/student')
            && request.nextauth.token?.role !== 'Admin'
            && request.nextauth.token?.role !== 'Student') {
            return NextResponse.rewrite(
                new URL("/home", request.url)
            )
        }

    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = { matcher: ['/admin/:path*','/counselor/:path*', '/student/:path*'] };