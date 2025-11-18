import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const perPage = Number(searchParams.get("perPage") || 12);
    let tag = searchParams.get("tag") || "";
    if (tag === "All") tag = "";

    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await api.get("/notes", {
      params: { search: searchParams.get("search") || "", page, perPage, tag },
      headers: { Cookie: cookieHeader },
    });
    return NextResponse.json(res.data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.response?.data?.message || err.message },
      { status: 400 }
    );
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
    return NextResponse.json(res.data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.response?.data?.message || err.message },
      { status: 400 }
    );
  }
}
