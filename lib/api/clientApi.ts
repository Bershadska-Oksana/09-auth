import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

type FetchNotesParams = {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
};

export async function register(email: string, password: string) {
  const res = await api.post("/auth/register", { email, password });
  return res.data as User;
}

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  return res.data as User;
}

export async function logout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

export async function checkSession() {
  const res = await api.get("/auth/session");
  return res.data as User | null;
}

export async function getMe() {
  const res = await api.get("/users/me");
  return res.data as User;
}

export async function updateMe(data: Partial<User>) {
  const res = await api.patch("/users/me", data);
  return res.data as User;
}

/* NOTES */
export async function fetchNotes(params?: FetchNotesParams) {
  const res = await api.get("/notes", { params });
  return res.data as Note[];
}

export async function fetchNoteById(id: string) {
  const res = await api.get(`/notes/${id}`);
  return res.data as Note;
}

export async function createNote(payload: {
  title: string;
  content: string;
  tag: string;
}) {
  const res = await api.post("/notes", payload);
  return res.data as Note;
}

export async function deleteNote(id: string) {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}
