import { cookies } from "next/headers";

export async function serverRequest(path: string, options: RequestInit = {}) {
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(await res.text());

  return res.json();
}

export function serverGetMe() {
  return serverRequest("/users/me");
}

export function serverGetNotes(params?: any) {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  return serverRequest(`/notes${query}`);
}

export function serverGetNoteById(id: string) {
  return serverRequest(`/notes/${id}`);
}
