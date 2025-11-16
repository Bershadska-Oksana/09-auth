import { NextRequest, NextResponse } from "next/server";
import { serverCheckSession } from "./lib/api/serverApi";

const PRIVATE_ROUTES = ["/profile/:path*", "/notes/:path*"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  let user = null;
  try {
    user = await serverCheckSession(req.cookies);
  } catch (err) {
    console.error("Middleware session check failed:", err);
  }

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    url.pathname.startsWith(route)
  );
  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    url.pathname.startsWith(route)
  );

  if (isPrivateRoute && !user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...PRIVATE_ROUTES, ...AUTH_ROUTES],
};
