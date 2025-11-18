import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serverRequest } from "@/lib/api/serverApi";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && refreshToken) {
    const newTokens = await serverRequest("/auth/session");
    if (newTokens?.accessToken) {
      const res = NextResponse.next();
      res.cookies.set("accessToken", newTokens.accessToken);
      res.cookies.set("refreshToken", newTokens.refreshToken);
      return res;
    }
  }

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(private routes)/:path*"],
};
