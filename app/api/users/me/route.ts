import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    const res = await api.get("/users/me", {
      headers: {
        Cookie: `session=${session?.value || ""}`,
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    const res = await api.patch("/users/me", body, {
      headers: {
        Cookie: `session=${session?.value || ""}`,
      },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
