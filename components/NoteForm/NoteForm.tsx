"use client";

import { useEffect, useState } from "react";
import css from "./NoteForm.module.css";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [localError, setLocalError] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    // initialize draft if needed (already handled by store)
  }, []);

  const mutation = useMutation({
    mutationFn: (noteData: { title: string; content: string; tag: string }) =>
      createNote(noteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      onClose?.();
      // optional: navigate to notes list
      // router.push("/notes/filter/all");
    },
    onError: () => {
      setLocalError("Failed to create note. Try again.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
    if (name === "title" && value.trim() !== "") setLocalError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim()) {
      setLocalError("Please enter a title");
      return;
    }
    mutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label className={css.label} htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={draft.title}
          onChange={handleChange}
          className={`${css.input} ${localError ? css.errorInput : ""}`}
        />
        {localError && <div className={css.errorMessage}>{localError}</div>}
      </div>

      <div className={css.formGroup}>
        <label className={css.label} htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={draft.content}
          onChange={handleChange}
          className={css.textarea}
          rows={8}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label} htmlFor="tag">
          Tag
        </label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => onClose?.()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
