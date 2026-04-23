'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import { deleteNote } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import css from './NotesList.module.css';

interface NotesListProps {
  notes: Note[];
}

export default function NotesList({ notes }: NotesListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success('Нотатку успішно видалено');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Не вдалося видалити нотатку');
      } else {
        toast.error('Сталася помилка при видаленні');
      }
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Ви впевнені, що хочете видалити цю нотатку?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <ul className={css.list}>
      {notes?.map((note: Note) => (
        <li key={note.id} className={css.card}>
          <span className={css.tag}>{note.tag}</span>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <button
            onClick={() => handleDelete(note.id)}
            className={css.deleteButton}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Видалення...' : 'Видалити'}
          </button>
        </li>
      ))}
    </ul>
  );
}