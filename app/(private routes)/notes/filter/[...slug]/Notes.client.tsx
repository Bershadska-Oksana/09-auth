"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

interface Props {
  initialNotes?: any[];
  tag?: string;
}

export default function NotesClient({ initialNotes = [], tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data: notes = initialNotes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", { page, search, tag }],
    queryFn: () => fetchNotes({ page, search, tag }),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Error loading notes.</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBox value={search} onChange={setSearch} />
        <Link href="/notes/action/create">Create note</Link>
      </div>
      <NoteList notes={notes} />
      <Pagination currentPage={page} totalPages={1} onPageChange={setPage} />
    </div>
  );
}
