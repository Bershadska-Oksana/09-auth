import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await api.post("/auth/login", body);

    const setCookieHeader = res.headers["set-cookie"];
    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      const response = NextResponse.json(res.data, { status: res.status });
      for (const c of cookiesArray) {
        response.headers.append("set-cookie", c);
      }
      return response;
    }

    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}
