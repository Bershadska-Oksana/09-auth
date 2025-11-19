"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import { getNotes } from "@/lib/api/clientApi";

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const tag = undefined;

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", { page, search, tag }],
    queryFn: () => getNotes({ page, search, tag }),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Error loading notes.</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBox
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link href="/notes/action/create">Create note</Link>
      </div>

      {notes?.items?.length ? (
        <>
          <NoteList notes={notes.items} />
          <Pagination page={page} setPage={setPage} total={notes.total || 0} />
        </>
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
}
