'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import NotesList from './NotesList';

import { useDebouncedCallback } from 'use-debounce';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
 
import css from '../../NotesPage.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const perPage = 12;

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search, tag],

    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search,
        ...(tag && tag !== 'all' ? { tag } : {}),
      }),

    placeholderData: () =>
      queryClient.getQueryData(['notes', page - 1, search, tag]) ?? {
        notes: [],
        totalPages: 1,
      },

    staleTime: 5000,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={(value) => handleSearch(value)} />

        {data && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Could not fetch the list of notes.</p>}

      {notes.length > 0 ? (
        <NotesList notes={notes} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}
    </div>
  );
}
