import { NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function GET(req: NextRequest) {
  try {
    const res = await api.get("/auth/session");
    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}
