import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serverCheckSession } from "./lib/api/serverApi";

const PRIVATE_ROUTES = ["/profile/:path*", "/notes/:path*"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  try {
    const sessionRes = await serverCheckSession();

    const isAuthenticated = Boolean(
      sessionRes && sessionRes.status === 200 && sessionRes.data
    );

    if (
      !isAuthenticated &&
      (pathname.startsWith("/profile") || pathname.startsWith("/notes"))
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }

    if (
      isAuthenticated &&
      (pathname === "/sign-in" || pathname === "/sign-up")
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } catch (err) {}

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
