"use client";

import React from "react";
import css from "./NoteDetails.module.css";
import { useNoteStore } from "@/lib/store/noteStore";

interface NoteDetailsProps {
  noteId: string;
}

const NoteDetails = ({ noteId }: NoteDetailsProps) => {
  const { notes } = useNoteStore();
  const note = notes.find((n) => n.id === noteId);

  if (!note) return <p>Note not found</p>;

  return (
    <div className={css.noteDetails}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
    </div>
  );
};

export default NoteDetails;
