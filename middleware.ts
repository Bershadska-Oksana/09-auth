import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serverCheckSession } from "./lib/api/serverApi";

const PRIVATE_ROUTES = ["/profile", "/notes"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export const config = {
  matcher: [...PRIVATE_ROUTES, ...AUTH_ROUTES],
};

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const sessionRes = await serverCheckSession();

  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isPrivateRoute = PRIVATE_ROUTES.some((r) => pathname.startsWith(r));

  const isAuthenticated = Boolean(sessionRes && sessionRes.status === 200);

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}
