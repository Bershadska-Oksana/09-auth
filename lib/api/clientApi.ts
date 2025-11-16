// lib/api/clientApi.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api",
  withCredentials: true,
});

/* NOTES */
export async function fetchNotes() {
  const { data } = await api.get("/notes");
  return data;
}

export async function fetchNoteById(id: string) {
  const { data } = await api.get(`/notes/${id}`);
  return data;
}

export async function createNote(payload: { title: string; content: string }) {
  const { data } = await api.post("/notes", payload);
  return data;
}
