import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const search = url.searchParams.get("search") ?? "";
    const page = Number(url.searchParams.get("page") ?? "1");
    const perPage = Number(url.searchParams.get("perPage") ?? "12");
    let tag = url.searchParams.get("tag") ?? "";
    if (tag === "All") tag = "";

    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await api.get("/notes", {
      params: { search, page, perPage, tag },
      headers: { Cookie: cookieHeader },
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
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await api.post("/notes", body, {
      headers: { Cookie: cookieHeader },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}
