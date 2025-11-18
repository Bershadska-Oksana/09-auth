import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await api.post("/auth/register", body);

    const setCookieHeader = res.headers["set-cookie"];
    const cookieStore = cookies();

    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];
      for (const cookieStr of cookiesArray) {
        const parsed = parse(cookieStr);
        const options: Record<string, any> = {};
        if (parsed.Expires) options.expires = new Date(parsed.Expires);
        if (parsed.Path) options.path = parsed.Path;
        if (parsed["Max-Age"]) options.maxAge = Number(parsed["Max-Age"]);

        const [key] = cookieStr.split("=");
        const cookieName = key?.trim();

        for (const [k, v] of Object.entries(parsed)) {
          if (!["Expires", "Path", "Max-Age"].includes(k)) {
            cookieStore.set(k, v as string, options);
          }
        }
      }
    }

    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}
