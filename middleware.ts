import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serverCheckSession } from "./lib/api/serverApi";

const PRIVATE_ROUTES = ["/profile/:path*", "/notes/:path*"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    new RegExp(`^${route.replace(":path*", ".*")}$`).test(url.pathname)
  );
  const isAuthRoute = AUTH_ROUTES.includes(url.pathname);

  const user = await serverCheckSession(accessToken, refreshToken);

  if (isPrivateRoute && !user) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && user) {
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
