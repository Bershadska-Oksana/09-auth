import React from "react";
import { serverGetNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";

type Props = { params: { slug?: string[] } };

export default async function FilteredNotesPage({ params }: Props) {
  const slugParts = params?.slug ?? [];
  const tag = slugParts[0] ?? "all";

  const notes = await serverGetNotes(tag === "all" ? undefined : { tag });

  return (
    <section>
      <h1>Notes — {tag}</h1>

      <NotesClient initialNotes={notes} tag={tag === "all" ? undefined : tag} />
    </section>
  );
}
