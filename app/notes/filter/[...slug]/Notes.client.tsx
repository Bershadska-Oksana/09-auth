"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, PER_PAGE } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import EmptyListMessage from "@/components/EmptyListMessage/EmptyListMessage";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import css from "./NotesPage.module.css";

interface NotesClientProps {
  tag?: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
    setCurrentPage(1);
  }, 400);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setSearchQuery(v);
      debounced(v.trim());
    },
    [debounced]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [tag]);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["notes", tag ?? "all", debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, tag, currentPage, PER_PAGE),
    keepPreviousData: true,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} defaultValue={searchQuery} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        {/* use Next.js Link for client navigation */}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        !isFetching && !isError && <EmptyListMessage />
      )}
    </div>
  );
};

export default NotesClient;
