import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await api.post("/auth/login", body);

    const cookieStore = cookies();
    res.headers["set-cookie"]?.forEach((c: string) => cookieStore.set(c));

    return NextResponse.json(res.data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.response?.data?.message || err.message },
      { status: 400 }
    );
  }
}
