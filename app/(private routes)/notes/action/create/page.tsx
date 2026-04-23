import { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create note | NoteHub',
  description:
    'Create a new note in NoteHub with a simple and efficient note creation page. Add your thoughts, tasks, and ideas with ease.',
  openGraph: {
    title: 'Create note | NoteHub',
    description:
      'Create a new note in NoteHub with a simple and efficient note creation page. Add your thoughts, tasks, and ideas with ease.',
    url: 'https://notehub.example.com/notes/action/create',
    type: 'website',
    images: [
      {
        url: 'https://notehub-api.goit.study',
        width: 1200,
        height: 630,
        alt: 'NoteHub Create Note Page',
      },
    ],
  },
};

export default function Page() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
