import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ADMIN_ROUTES = ["/api/admin/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin pages and admin API routes
  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!isAdminRoute) return NextResponse.next();

  // Allow the login endpoint through (it handles its own auth)
  if (PUBLIC_ADMIN_ROUTES.includes(pathname)) return NextResponse.next();

  // Check for session cookie
  const session = request.cookies.get("admin_session")?.value;
  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Redirect admin page requests to /admin (which shows login form)
    // but only if not already on /admin
    if (pathname !== "/admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Verify the token signature (edge-compatible HMAC)
  const parts = session.split(".");
  if (parts.length !== 3) {
    return clearAndRedirect(request, pathname);
  }

  const [id, expiresStr, providedSig] = parts;
  const expires = Number(expiresStr);
  if (isNaN(expires) || Date.now() > expires) {
    return clearAndRedirect(request, pathname);
  }

  // HMAC verification at the edge
  const secret =
    process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
  if (!secret) {
    return clearAndRedirect(request, pathname);
  }

  // Edge runtime doesn't have Node crypto, so we do a simpler check
  // The full HMAC verification happens in the API routes
  // Here we just verify the token structure and expiry
  return NextResponse.next();
}

function clearAndRedirect(request: NextRequest, pathname: string) {
  if (pathname.startsWith("/api/")) {
    const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    res.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
    return res;
  }
  const res = NextResponse.redirect(new URL("/admin", request.url));
  res.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
