import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    const isAdmin = token?.role === "admin";
    const isModerator = token?.role === "moderator";

    // If trying to access /dashboard but not admin or moderator
    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      !isAdmin &&
      !isModerator
    ) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    // Allow access
    return NextResponse.next();
  },
  {
    callbacks: {
      // Allow access to middleware if token exists
      authorized: ({ token }) => !!token,
    },
  }
);

// Apply middleware to all /dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
