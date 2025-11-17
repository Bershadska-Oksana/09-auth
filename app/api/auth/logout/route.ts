import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
  try {
    const res = await api.post("/auth/logout");

    const setCookieHeader = res.headers["set-cookie"];
    const response = NextResponse.json({}, { status: res.status });
    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];
      for (const c of cookiesArray) {
        response.headers.append("set-cookie", c);
      }
    }

    return response;
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}
