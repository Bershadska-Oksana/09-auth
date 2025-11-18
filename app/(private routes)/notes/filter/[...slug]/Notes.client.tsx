"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import { getNotes } from "@/lib/api/clientApi";
import { useDebounce } from "use-debounce";

interface Props {
  initialNotes?: any[];
  tag?: string;
}

export default function NotesClient({ initialNotes = [], tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const {
    data: notes = initialNotes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", { page, debouncedSearch, tag }],
    queryFn: () => getNotes({ page, search: debouncedSearch, tag }),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Error loading notes.</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} />
        <Link href="/notes/action/create">Create note</Link>
      </div>

      {notes.items?.length ? (
        <>
          <NoteList notes={notes.items} />
          <Pagination
            currentPage={page}
            totalPages={Math.ceil((notes.total || 0) / 10)}
            onPageChange={setPage}
          />
        </>
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
}
