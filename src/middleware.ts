import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-this-in-production"
);

const publicPaths = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  const isPublicPath = publicPaths.includes(pathname);

  if (!token && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);

      if (pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      if (!isPublicPath) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.set("token", "", { maxAge: 0 });
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};