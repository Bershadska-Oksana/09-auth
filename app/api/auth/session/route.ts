import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/lib/api/api";

export async function GET() {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return NextResponse.json(null, { status: 200 });
    }

    const res = await api.get("/auth/session", {
      headers: {
        Cookie: `session=${session.value}`,
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
