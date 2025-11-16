import axios, { isAxiosError } from "axios";
import { cookies, type RequestCookies } from "next/headers";

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

const serverClient = (cookieStore?: RequestCookies) => {
  const cookieHeader = cookieStore
    ? cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ")
    : "";

  return axios.create({
    baseURL: apiBase,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });
};

/* ================================
   USER: /users/me
================================ */
export async function serverGetMe() {
  try {
    const cookieStore = cookies();
    const client = serverClient(cookieStore);
    const res = await client.get("/users/me");
    return res.data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 401) return null;
    console.error("serverGetMe error:", err);
    return null;
  }
}

/* ================================
   NOTES
================================ */
export async function serverGetNotes() {
  try {
    const cookieStore = cookies();
    const client = serverClient(cookieStore);
    const res = await client.get("/notes");
    return res.data;
  } catch (err) {
    console.error("serverGetNotes error:", err);
    return null;
  }
}

export async function serverGetNoteById(id: string) {
  try {
    const cookieStore = cookies();
    const client = serverClient(cookieStore);
    const res = await client.get(`/notes/${id}`);
    return res.data;
  } catch (err) {
    console.error("serverGetNoteById error:", err);
    return null;
  }
}

/* ================================
   SESSION CHECK (для middleware)
================================ */
export async function serverCheckSession(cookieStore: RequestCookies) {
  try {
    const client = serverClient(cookieStore);
    const res = await client.get("/auth/refresh");
    return res.data;
  } catch (err) {
    return null;
  }
}
