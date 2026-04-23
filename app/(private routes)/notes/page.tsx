import { Metadata } from 'next';
import NotesClient from './filter/[...slug]/Notes.client';
import css from './NotesPage.module.css';

export const metadata: Metadata = {
  title: 'My Notes | NoteHub',
  description: 'Manage and view your personal notes.',
};

export default function NotesPage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <NotesClient tag="all" />
      </div>
    </main>
  );
}