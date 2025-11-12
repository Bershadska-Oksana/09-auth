import axios from "axios";
import { Note } from "@/types/note";

export const PER_PAGE = 12;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  search: string = "",
  tag?: string,
  page: number = 1,
  perPage: number = PER_PAGE
) => {
  const params: Record<string, any> = { search, page, perPage };
  if (tag) params.tag = tag;

  const { data } = await api.get<{ notes: Note[]; totalPages: number }>(
    "/notes",
    { params }
  );
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  noteData: Pick<Note, "title" | "content" | "tag">
) => {
  const { data } = await api.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
