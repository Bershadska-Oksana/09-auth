"use client";

import { useNoteStore } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

interface NoteFormProps {
  onClose?: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ onClose }) => {
  const { draft, resetDraft } = useNoteStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      resetDraft();
      router.back();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={draft.title}
        onChange={(e) => (draft.title = e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={draft.content}
        onChange={(e) => (draft.content = e.target.value)}
        placeholder="Content"
      />
      <input
        value={draft.tag}
        onChange={(e) => (draft.tag = e.target.value)}
        placeholder="Tag"
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
};
