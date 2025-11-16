import { create } from "zustand";

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

interface NoteStore {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
}));
