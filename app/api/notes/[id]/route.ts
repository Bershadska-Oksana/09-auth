import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

type Params = { id: string };

export async function GET(req: NextRequest, context: { params: Params }) {
  try {
    const { params } = context;
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await api.get(`/notes/${params.id}`, {
      headers: { Cookie: cookieHeader },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}

export async function DELETE(req: NextRequest, context: { params: Params }) {
  try {
    const { params } = context;
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await api.delete(`/notes/${params.id}`, {
      headers: { Cookie: cookieHeader },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}

export async function PATCH(req: NextRequest, context: { params: Params }) {
  try {
    const { params } = context;
    const body = await req.json();
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await api.patch(`/notes/${params.id}`, body, {
      headers: { Cookie: cookieHeader },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}
