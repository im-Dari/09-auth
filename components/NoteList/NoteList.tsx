'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

export interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      toast.success('Note deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete note');
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteMutation.mutate(id);
    }
  };

  if (!notes || notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note: Note) => (
        <li key={note.id} className={css.card}>
          <div className={css.header}>
            <Link href={`/notes/${note.id}`}>
              <h2 className={css.title}>{note.title}</h2>
            </Link>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content.substring(0, 100)}...</p>
          <div className={css.footer}>
            <span className={css.date}>{note.createdAt}</span>
            <button
              onClick={() => handleDelete(note.id)}
              className={css.deleteButton}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
