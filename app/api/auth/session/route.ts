import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (accessToken) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (refreshToken) {
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");
      const res = await api.get("/auth/session", {
        headers: { Cookie: cookieHeader },
      });

      const setCookieHeader = res.headers["set-cookie"];
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
          for (const [k, v] of Object.entries(parsed)) {
            if (!["Expires", "Path", "Max-Age"].includes(k)) {
              cookieStore.set(k, v as string, options);
            }
          }
        }
      }

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ success: false }, { status: 200 });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}
