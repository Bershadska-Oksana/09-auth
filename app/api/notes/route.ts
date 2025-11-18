import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    const res = await api.get("/notes", {
      params,
      headers: {
        Cookie: `session=${session?.value || ""}`,
      },
    });

    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    const res = await api.post("/notes", body, {
      headers: {
        Cookie: `session=${session?.value || ""}`,
      },
    });

    return NextResponse.json(res.data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 400 }
    );
  }
}
