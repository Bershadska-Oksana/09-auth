import { api } from "./api";
import { cookies, type RequestCookies } from "next/headers";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";
import { isAxiosError } from "axios";

function cookieHeaderFromStore(cookieStore?: RequestCookies) {
  if (!cookieStore) return "";
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

export const serverCheckSession = async () => {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieHeaderFromStore(cookieStore);
    const res = await api.get("/auth/session", {
      headers: { Cookie: cookieHeader },
    });
    return res;
  } catch (err) {
    return null;
  }
};

export const serverGetMe = async (): Promise<User | null> => {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieHeaderFromStore(cookieStore);
    const res = await api.get("/users/me", {
      headers: { Cookie: cookieHeader },
    });
    return res.data as User;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 401) return null;
    console.error("serverGetMe error:", err);
    return null;
  }
};

export const serverGetNotes = async (params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}) => {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieHeaderFromStore(cookieStore);
    const res = await api.get("/notes", {
      params,
      headers: { Cookie: cookieHeader },
    });
    return res.data as { items: Note[]; total?: number };
  } catch (err) {
    console.error("serverGetNotes error:", err);
    return { items: [], total: 0 };
  }
};

export const serverGetNoteById = async (id: string) => {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieHeaderFromStore(cookieStore);
    const res = await api.get(`/notes/${id}`, {
      headers: { Cookie: cookieHeader },
    });
    return res.data as Note;
  } catch (err) {
    console.error("serverGetNoteById error:", err);
    return null;
  }
};
