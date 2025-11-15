import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

export const register = async (email: string, password: string) => {
  const res = await api.post("/auth/register", { email, password });
  return res.data as User;
};

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data as User;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const checkSession = async () => {
  const res = await api.get("/auth/session");
  return res.data as User | null;
};

export const getMe = async () => {
  const res = await api.get("/users/me");
  return res.data as User;
};

export const updateMe = async (data: Partial<User>) => {
  const res = await api.patch("/users/me", data);
  return res.data as User;
};

// Notes
export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: string;
}) => {
  const res = await api.get("/notes", { params });
  return res.data as Note[];
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get(`/notes/${id}`);
  return res.data as Note;
};

export const createNote = async (payload: {
  title: string;
  content: string;
  tag: string;
}) => {
  const res = await api.post("/notes", payload);
  return res.data as Note;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};
