import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isLoginRoute = request.nextUrl.pathname === '/admin/login';
    const hasApiKey = request.cookies.has('nova_admin_api_key');

    // Protect Admin Routes: If accessing admin (except login) and no key, redirect to login
    if (isAdminRoute && !isLoginRoute && !hasApiKey) {
        const loginUrl = new URL('/admin/login', request.url);
        // Optional: Add ?returnUrl=... if you want deep linking support later
        return NextResponse.redirect(loginUrl);
    }

    // Redirect Logged-In Users: If accessing login and HAS key, redirect to dashboard
    if (isLoginRoute && hasApiKey) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Only run middleware on /admin/* paths
    matcher: ['/admin/:path*'],
};
