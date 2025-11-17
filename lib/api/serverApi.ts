import { api } from "./api";
import axios, { AxiosInstance, isAxiosError } from "axios";
import { cookies, type RequestCookies } from "next/headers";
import { User } from "@/types/user";
import { Note } from "@/types/note";

const serverRequest = (cookieHeader?: string): AxiosInstance => {
  return axios.create({
    baseURL:
      (process.env.NEXT_PUBLIC_API_BASE_URL ??
        process.env.NEXT_PUBLIC_API_URL ??
        "http://localhost:3000") + "/api",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });
};

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
    const client = serverRequest(cookieHeader);
    const res = await client.get("/auth/session");
    return res; // return full AxiosResponse when needed
  } catch (err) {
    return null;
  }
};

export const serverGetMe = async (): Promise<User | null> => {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieHeaderFromStore(cookieStore);
    const client = serverRequest(cookieHeader);
    const res = await client.get("/users/me");
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
    const client = serverRequest(cookieHeader);
    const res = await client.get("/notes", { params });
    return res.data as Note[];
  } catch (err) {
    console.error("serverGetNotes error:", err);
    return [];
  }
};

export const serverGetNoteById = async (id: string) => {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieHeaderFromStore(cookieStore);
    const client = serverRequest(cookieHeader);
    const res = await client.get(`/notes/${id}`);
    return res.data as Note;
  } catch (err) {
    console.error("serverGetNoteById error:", err);
    return null;
  }
};
