import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serverCheckSession } from "./lib/api/serverApi";

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/notes",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const sessionRes = await serverCheckSession();

  const isAuthRoute = ["/sign-in", "/sign-up"].some((r) =>
    pathname.startsWith(r)
  );
  const isPrivateRoute = [
    "/profile",
    "/profile/:path*",
    "/notes",
    "/notes/:path*",
  ].some((r) => pathname.startsWith(r.replace("/:path*", "")));

  const isAuthenticated = Boolean(sessionRes && sessionRes.status === 200);

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}
