import { api } from "./api";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";

type FetchNotesParams = {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
};

export async function register(email: string, password: string): Promise<User> {
  const res = await api.post("/auth/register", { email, password });
  return res.data as User;
}

export async function login(email: string, password: string): Promise<User> {
  const res = await api.post("/auth/login", { email, password });
  return res.data as User;
}

export async function logout(): Promise<{ success: boolean }> {
  const res = await api.post("/auth/logout");
  return res.data;
}

export async function checkSession(): Promise<boolean> {
  const res = await api.get("/auth/session");
  return Boolean(res.data && (res.data.success ?? true));
}

export async function getMe(): Promise<User> {
  const res = await api.get("/users/me");
  return res.data as User;
}

export async function updateMe(data: Partial<User>): Promise<User> {
  const res = await api.patch("/users/me", data);
  return res.data as User;
}

export async function getNotes(
  params?: FetchNotesParams
): Promise<{ items: Note[]; total?: number }> {
  const res = await api.get("/notes", { params });
  return res.data;
}

export async function getNoteById(id: string): Promise<Note> {
  const res = await api.get(`/notes/${id}`);
  return res.data as Note;
}

export async function createNote(payload: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
  const res = await api.post("/notes", payload);
  return res.data as Note;
}

export async function deleteNote(id: string): Promise<{ success: boolean }> {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}

export const fetchNotes = (params?: FetchNotesParams) => getNotes(params);
export const fetchNoteById = (id: string) => getNoteById(id);
