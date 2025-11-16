"use client";

import React from "react";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api/notes";

interface NotesProps {
  filter: string;
}

const Notes = ({ filter }: NotesProps) => {
  const { notes } = useNoteStore();
  const filteredNotes =
    filter === "all" ? notes : notes.filter((n) => n.tag === filter);

  return (
    <div>
      {filteredNotes.length === 0 ? (
        <p>No notes found</p>
      ) : (
        filteredNotes.map((note) => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notes;
