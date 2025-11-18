import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    const res = await api.get("/auth/session", {
      headers: { Cookie: cookieHeader },
    });

    return NextResponse.json(
      { success: true, user: res.data },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.response?.data?.message || err.message },
      { status: 401 }
    );
  }
}
