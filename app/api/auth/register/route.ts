export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await api.post("/auth/register", body);

    const cookieStore = cookies();
    res.headers["set-cookie"]?.forEach((c: string) => cookieStore.set(c));

    return NextResponse.json(res.data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.response?.data?.message || "Registration failed" },
      { status: err?.response?.status || 400 }
    );
  }
}
