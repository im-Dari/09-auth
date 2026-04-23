'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';
/* import type { Note } from '@/types/note'; */

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewProps) {
  const router = useRouter();
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    staleTime: 1000 * 60 * 5,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal open={true} onClose={handleClose} title="Loading...">
        <p>Loading note preview...</p>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal open={true} onClose={handleClose} title="Error">
        <p>Could not load note preview.</p>
      </Modal>
    );
  }

  return (
    <Modal open={true} onClose={handleClose} title={note.title}>
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ margin: '0 0 1rem', color: '#3b82f6', fontWeight: '600' }}>
          {note.tag}
        </p>
      </div>

      <article style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        {note.content}
      </article>

      <footer style={{ color: '#888', fontSize: '0.9rem' }}>
        {note.createdAt}
      </footer>
    </Modal>
  );
}
