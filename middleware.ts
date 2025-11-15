import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/sign-in",
  "/sign-up",
  "/_next",
  "/favicon.ico",
  "/api",
];

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p));
}

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
    const apiUrl = new URL(
      "/api/auth/session",
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
    );
    const sessionRes = await fetch(apiUrl.href, {
      method: "GET",
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
      credentials: "include",
    });

    const isAuthenticated =
      sessionRes.status === 200 && (await sessionRes.text()) !== "";

    if (
      !isAuthenticated &&
      (pathname.startsWith("/profile") ||
        pathname.startsWith("/notes") ||
        pathname.startsWith("/(private routes)"))
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
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    }
  } catch (err) {}

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
