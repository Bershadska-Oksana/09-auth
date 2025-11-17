// app/api/notes/route.ts
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") ?? undefined;
    const page = url.searchParams.get("page") ?? undefined;
    const perPage = url.searchParams.get("perPage") ?? undefined;
    const tag = url.searchParams.get("tag") ?? undefined;

    const res = await api.get("/notes", {
      params: {
        ...(search ? { search } : {}),
        ...(page ? { page: Number(page) } : {}),
        ...(perPage ? { perPage: Number(perPage) } : {}),
        ...(tag ? { tag } : {}),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await api.post("/notes", body);
    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}
