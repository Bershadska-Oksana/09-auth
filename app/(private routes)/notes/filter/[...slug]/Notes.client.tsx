"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export default function NotesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState<string | undefined>(undefined);

  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery(
    ["notes", { page, search, tag }],
    () => getNotes({ page, search, tag }),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes.</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} />
        <Link href="/notes/action/create">Create note</Link>
      </div>

      {notes?.items?.length ? (
        <>
          <NoteList notes={notes.items} />
          <Pagination
            page={page}
            total={notes.total ?? 0}
            onChange={(p) => setPage(p)}
          />
        </>
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}
