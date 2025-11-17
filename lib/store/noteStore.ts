import { create } from "zustand";

interface Draft {
  title: string;
  content: string;
  tag: string;
}

interface NoteStore {
  draft: Draft;
  setDraft: (d: Partial<Draft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  draft: { title: "", content: "", tag: "Todo" },
  setDraft: (d) => set((s) => ({ draft: { ...s.draft, ...d } })),
  clearDraft: () => set({ draft: { title: "", content: "", tag: "Todo" } }),
}));
