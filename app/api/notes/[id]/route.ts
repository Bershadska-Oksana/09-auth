import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    const res = await api.get(`/notes/${params.id}`, {
      headers: {
        Cookie: `session=${session?.value || ""}`,
      },
    });

    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    const res = await api.delete(`/notes/${params.id}`, {
      headers: {
        Cookie: `session=${session?.value || ""}`,
      },
    });

    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
