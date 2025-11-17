"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";

export default function NoteDetails({ id }: { id: string }) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Note not found.</p>;

  return (
    <article>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
    </article>
  );
}
