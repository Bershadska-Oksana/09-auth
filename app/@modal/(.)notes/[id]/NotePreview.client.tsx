"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

interface Props {
  id: string;
  onClose: () => void;
}

export default function NotePreviewClient({ id, onClose }: Props) {
  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!note) return <div>Not found</div>;

  return (
    <Modal onClose={onClose}>
      <div className={css.preview}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    </Modal>
  );
}
