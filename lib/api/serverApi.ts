import axios from "axios";
import { User } from "@/types/user";
import { Note } from "@/types/note";

const baseURL =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000") + "/api";

export const serverRequest = (cookies: string | undefined) =>
  axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(cookies ? { cookie: cookies } : {}),
    },
  });

export const serverCheckSession = async (cookies?: string) => {
  const client = serverRequest(cookies);
  const res = await client.get("/auth/session");
  return res.data as User | null;
};

export const serverGetMe = async (cookies?: string) => {
  const client = serverRequest(cookies);
  const res = await client.get("/users/me");
  return res.data as User;
};

export const serverFetchNoteById = async (id: string, cookies?: string) => {
  const client = serverRequest(cookies);
  const res = await client.get(`/notes/${id}`);
  return res.data as Note;
};

export const serverFetchNotes = async (
  params?: { search?: string; page?: number; tag?: string },
  cookies?: string
) => {
  const client = serverRequest(cookies);
  const res = await client.get("/notes", { params });
  return res.data as Note[];
};
