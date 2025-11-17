import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

type Props = { params: { id: string } };

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const res = await api.get(`/notes/${params.id}`);
    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const res = await api.delete(`/notes/${params.id}`);
    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}

export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const body = await req.json();
    const res = await api.patch(`/notes/${params.id}`, body);
    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) return logErrorResponse(err);
    return logErrorResponse(err);
  }
}
