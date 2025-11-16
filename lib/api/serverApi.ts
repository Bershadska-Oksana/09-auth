import { api } from "./api";
import { User, Note } from "@/types/user";
import { cookies, type RequestCookies } from "next/headers";
import { isAxiosError } from "axios";

export const serverGetMe = async (cookieStore?: RequestCookies) => {
  try {
    const cookieHeader = cookieStore
      ? cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; ")
      : "";

    const res = await api.get("/users/me", {
      headers: { Cookie: cookieHeader },
    });

    return res.data as User;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(err.response?.data ?? err.message);
      return null;
    }
    console.error((err as Error).message);
    return null;
  }
};

export const serverGetNoteById = async (
  id: string,
  cookieStore?: RequestCookies
) => {
  try {
    const cookieHeader = cookieStore
      ? cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; ")
      : "";

    const res = await api.get(`/notes/${id}`, {
      headers: { Cookie: cookieHeader },
    });

    return res.data as Note;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(err.response?.data ?? err.message);
      return null;
    }
    console.error((err as Error).message);
    return null;
  }
};

export const serverGetNotes = async (cookieStore?: RequestCookies) => {
  try {
    const cookieHeader = cookieStore
      ? cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; ")
      : "";

    const res = await api.get("/notes", {
      headers: { Cookie: cookieHeader },
    });

    return res.data as Note[];
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(err.response?.data ?? err.message);
      return [];
    }
    console.error((err as Error).message);
    return [];
  }
};
