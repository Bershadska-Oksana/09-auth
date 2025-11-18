import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    const res = await api.post(
      "/auth/logout",
      {},
      { headers: { Cookie: cookieHeader } }
    );

    res.headers["set-cookie"]?.forEach((c: string) => cookieStore.set(c));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.response?.data?.message || err.message },
      { status: 400 }
    );
  }
}
