import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serverCheckSession } from "./lib/api/serverApi";

const PRIVATE_ROUTES = ["/profile/:path*", "/notes/:path*"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export const config = {
  matcher: [...PRIVATE_ROUTES, ...AUTH_ROUTES],
};

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const sessionRes = await serverCheckSession();

  const isAuthRoute = AUTH_ROUTES.some((r) => {
    const base = r.replace("/:path*", "");
    return pathname.startsWith(base);
  });
  const isPrivateRoute = PRIVATE_ROUTES.some((r) => {
    const base = r.replace("/:path*", "");
    return pathname.startsWith(base);
  });

  const isAuthenticated = Boolean(sessionRes && sessionRes.status === 200);

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}
