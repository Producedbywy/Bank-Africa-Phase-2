import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,  // ✅ Allow access if valid token exists
    },
    pages: {
      signIn: "/login",  // ✅ Custom login page
    },
  }
);

// ✅ Fully cleaned matcher for Phase 1 (protects everything except public routes)
export const config = {
  matcher: [
    "/",  // protect root
    "/wallet/:path*",
    "/account/:path*",
    "/mobile/:path*",
    "/convert/:path*",
    "/cards/:path*",
    "/profile/:path*",
    "/settings/:path*",

    // ✅ Protect API routes (but allow NextAuth itself)
    "/api/(account|transactions|mobile|currency|cards)/:path*"
  ],
};
