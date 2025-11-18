"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import { useDebouncedValue } from "use-debounce";

interface Note {
  id: string;
  title: string;
  content: string;
  tag?: string;
}

interface Props {
  initialNotes?: Note[];
  tag?: string;
}

export default function NotesClient({
  initialNotes = [],
  tag: initialTag,
}: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 400);
  const [tag, setTag] = useState<string | undefined>(initialTag);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, tag]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", { page, search: debouncedSearch, tag }],
    queryFn: () => getNotes({ page, search: debouncedSearch, tag }),
    keepPreviousData: true,
    initialData: { items: initialNotes, total: initialNotes.length },
  });

  const notes = data?.items ?? [];

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Error loading notes.</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBox value={search} onChange={setSearch} />
        <Link href="/notes/action/create">Create note</Link>
      </div>
      {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found.</p>}
      {notes.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.max(
            1,
            Math.ceil((data?.total ?? notes.length) / 12)
          )}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
